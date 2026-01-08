using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace N.Service.CrawlData
{
    public class ParsedBoxQuestion
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public List<string> Paragraphs { get; set; } = new List<string>();
        public string MethodText { get; set; }         // "Phương pháp giải" plain text
        public string SolutionText { get; set; }       // "Lời giải chi tiết" plain text
        public List<ExplanationBlock> Explanations { get; set; } = new List<ExplanationBlock>();
        public List<string> TablesHtml { get; set; } = new List<string>();
        public List<string> ImageUrls { get; set; } = new List<string>();
        public List<(string href, string text)> Links { get; set; } = new List<(string, string)>();
    }

    public class ExplanationBlock
    {
        public string DataIdx { get; set; }
        public string Label { get; set; }  // e.g., "Cách 1", "Cách 2"
        public string Html { get; set; }
        public string Text { get; set; }
    }

    public static class BoxQuestionParser
    {
        // domain để chuẩn hoá ảnh / link nếu cần
        public static ParsedBoxQuestion ParseBoxQuestion(HtmlNode boxNode, string domain = null)
        {
            if (boxNode == null) return null;

            // remove noisy elements inside this box
            CleanNode(boxNode);
            
            var result = new ParsedBoxQuestion();
            result.Id = boxNode.GetAttributeValue("id", "").Trim();

            // Title: p with id question-title-idx-* or first strong inside p
            var titleNode = boxNode.SelectSingleNode(".//p[starts-with(@id,'question-title-idx') or contains(@id,'question-title')]");
            if (titleNode == null)
                titleNode = boxNode.SelectSingleNode(".//p[.//strong]") ?? boxNode.SelectSingleNode(".//p");
            result.Title = titleNode != null ? NormalizeText(titleNode.InnerText) : "";

            // Collect paragraphs (exclude those inside section-explanation-tab)
            var paraNodes = boxNode.SelectNodes(".//p[not(ancestor::div[contains(@class,'section-explanation-tab')])]");
            if (paraNodes != null)
            {
                foreach (var p in paraNodes)
                {
                    var txt = NormalizeText(p.InnerText);
                    if (!string.IsNullOrWhiteSpace(txt))
                    {
                        // avoid duplicating title if same node
                         if (titleNode == null || p != titleNode)
                            result.Paragraphs.Add(txt);
                    }
                }
            }

            // Extract Phương pháp giải (search for p containing phrase, then collect its following sibling text until next strong heading)
            var methodP = boxNode.SelectSingleNode(".//p[contains(., 'Phương pháp giải') or contains(translate(., 'PHƯƠNG PHÁP GIẢI','phương pháp giải'), 'phương pháp giải')]");
            if (methodP != null)
            {
                var sb = new List<string>();
                // include node text
                sb.Add(NormalizeText(methodP.InnerText));
                var n = methodP.NextSibling;
                while (n != null)
                {
                    if (n.NodeType == HtmlNodeType.Element && IsSectionHeading(n)) break;
                    if (n.NodeType == HtmlNodeType.Element)
                        sb.Add(NormalizeText(n.InnerText));
                    n = n.NextSibling;
                }
                result.MethodText = string.Join("\n", sb.Where(s => !string.IsNullOrWhiteSpace(s)));
            }

            // Extract Lời giải chi tiết similarly
            var solP = boxNode.SelectSingleNode(".//p[contains(., 'Lời giải chi tiết') or contains(translate(., 'LỜI GIẢI CHI TIẾT','lời giải chi tiết'), 'lời giải chi tiết')]");
            if (solP != null)
            {
                var sb = new List<string>();
                sb.Add(NormalizeText(solP.InnerText));
                var n = solP.NextSibling;
                while (n != null)
                {
                    if (n.NodeType == HtmlNodeType.Element && ContainsBoxQuestionOrTitle(n)) break;
                    if (n.NodeType == HtmlNodeType.Element)
                        sb.Add(NormalizeText(n.InnerText));
                    n = n.NextSibling;
                }
                result.SolutionText = string.Join("\n", sb.Where(s => !string.IsNullOrWhiteSpace(s)));
            }

            // Extract explanation blocks in .section-explanation-tab
            var sectionTabs = boxNode.SelectNodes(".//div[contains(@class,'section-explanation-tab')]");
            if (sectionTabs != null)
            {
                foreach (var section in sectionTabs)
                {
                    // content nodes
                    var contentNodes = section.SelectNodes(".//div[contains(@class,'explanation-content') or contains(@class,'explanation-content2') or contains(@class,'explanation-content-idx')]");
                    if (contentNodes != null)
                    {
                        foreach (var c in contentNodes)
                        {
                            var eb = new ExplanationBlock
                            {
                                DataIdx = c.GetAttributeValue("data-idx", "").Trim(),
                                Label = c.GetAttributeValue("data-label", "").Trim(),
                                Html = c.InnerHtml.Trim(),
                                Text = NormalizeText(c.InnerText)
                            };

                            // if label empty try to pair with nearby title div
                            if (string.IsNullOrEmpty(eb.Label))
                            {
                                var idx = eb.DataIdx;
                                if (!string.IsNullOrEmpty(idx))
                                {
                                    var t = section.SelectSingleNode($".//div[@data-idx='{idx}' and contains(@class,'explanation-title2')]");
                                    if (t != null) eb.Label = NormalizeText(t.InnerText);
                                }
                            }

                            result.Explanations.Add(eb);
                        }
                    }

                    // also capture any explanation-content blocks outside the common class variants
                    var extra = section.SelectNodes(".//div[contains(@class,'explanation-content-')]");
                    if (extra != null)
                    {
                        foreach (var c in extra)
                        {
                            var txt = NormalizeText(c.InnerText);
                            if (!result.Explanations.Any(e => e.Text == txt))
                            {
                                result.Explanations.Add(new ExplanationBlock
                                {
                                    DataIdx = c.GetAttributeValue("data-idx", "").Trim(),
                                    Label = c.GetAttributeValue("data-label", "").Trim(),
                                    Html = c.InnerHtml.Trim(),
                                    Text = txt
                                });
                            }
                        }
                    }
                }
            }

            // Tables html
            var tables = boxNode.SelectNodes(".//table");
            if (tables != null)
                result.TablesHtml.AddRange(tables.Select(t => t.OuterHtml.Trim()));

            // Images
            var imgs = boxNode.SelectNodes(".//img");
            if (imgs != null)
            {
                foreach (var img in imgs)
                {
                    var src = GetImageSrc(img);
                    if (!string.IsNullOrEmpty(src))
                    {
                        if (!string.IsNullOrEmpty(domain))
                        {
                            if (src.StartsWith("//")) src = "https:" + src;
                            if (src.StartsWith("/")) src = domain.TrimEnd('/') + src;
                        }
                        if (!result.ImageUrls.Contains(src)) result.ImageUrls.Add(src);
                    }
                }
            }

            // Links
            var links = boxNode.SelectNodes(".//a[@href]");
            if (links != null)
            {
                foreach (var a in links)
                {
                    var href = a.GetAttributeValue("href", "").Trim();
                    var txt = NormalizeText(a.InnerText);
                    if (!string.IsNullOrEmpty(href))
                    {
                        if (!string.IsNullOrEmpty(domain) && href.StartsWith("/")) href = domain.TrimEnd('/') + href;
                        result.Links.Add((href, txt));
                    }
                }
            }

            return result;
        }

        // ---- helpers ----
        private static void CleanNode(HtmlNode node)
        {
            if (node == null) return;
            var removeX = new[] { ".//script", ".//style", ".//iframe", ".//ins", ".//div[contains(@class,'gliaplayer')]", ".//div[contains(@class,'ask-plugin')]" };
            foreach (var xp in removeX)
            {
                var nodes = node.SelectNodes(xp);
                if (nodes == null) continue;
                foreach (var n in nodes.ToList()) n.Remove();
            }
            RemoveEventAttributes(node); // keep same signature as required
        }

        private static bool IsSectionHeading(HtmlNode n)
        {
            // treat nodes containing "Lời giải chi tiết" or strong elements as heading boundaries
            if (n == null) return false;
            var text = (n.InnerText ?? "").Trim();
            if (string.IsNullOrEmpty(text)) return false;
            if (text.IndexOf("Lời giải chi tiết", StringComparison.OrdinalIgnoreCase) >= 0) return true;
            if (n.Name == "p" && n.SelectSingleNode(".//strong") != null) return true;
            return false;
        }

        private static bool ContainsBoxQuestionOrTitle(HtmlNode n)
        {
            if (n == null) return false;
            if (n.SelectSingleNode(".//p[contains(., 'Cách') or contains(., 'Phương pháp') or contains(., 'Trả lời')]") != null) return true;
            return false;
        }

        private static string NormalizeText(string s)
        {
            if (s == null) return "";
            var t = HtmlEntity.DeEntitize(s);
            t = Regex.Replace(t, @"\r\n|\n|\r", " ");
            t = Regex.Replace(t, @"\s+", " ").Trim();
            return t;
        }

        private static string GetImageSrc(HtmlNode img)
        {
            if (img == null) return null;
            return img.GetAttributeValue("data-src", null)
                   ?? img.GetAttributeValue("data-lazy", null)
                   ?? img.GetAttributeValue("data-original", null)
                   ?? img.GetAttributeValue("src", null);
        }

        // required snippet preserved exactly
        private static void RemoveEventAttributes(HtmlNode root)
        {
            var nodes = root.SelectNodes(".//*");
            if (nodes == null) return;
            foreach (var node in nodes)
            {
                var attrs = node.Attributes.Where(a => a.Name.StartsWith("on", StringComparison.OrdinalIgnoreCase)).ToList();
                foreach (var a in attrs) node.Attributes.Remove(a);
            }
        }
    }
}
