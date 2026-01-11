using HtmlAgilityPack;
using N.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace N.Service.CrawlData
{


    

    public static class BoxQuestionParser
    {
        // domain để chuẩn hoá ảnh / link nếu cần
        public static List<DetailLession> ParseBoxQuestion(HtmlNode boxNode, Guid? LessionId ,string domain = null)
        {
            if (boxNode == null) return null;

            // remove noisy elements inside this box
            CleanNode(boxNode);
            
            var result = new List<DetailLession>();
            var Id = boxNode.GetAttributeValue("id", "").Trim();

            var indexBox = int.TryParse(Id.Substring(Id.LastIndexOf("-") + 1), out int vl) ? vl : 1;

            // Title: p with id question-title-idx-* or first strong inside p
            var TitleIndex = boxNode.SelectSingleNode(".//p[contains(@id, question-title-idx-)]");
            var index = 0;
            // Duyệt tất cả các node con theo thứ tự
            var nodes = boxNode.SelectNodes(".//p|.//div|.//table|.//img");
            if (nodes == null)
                return result;

            foreach (var node in nodes)
            {
                var block = new DetailLession
                {
                    IndexBox = indexBox,
                    Index = index++,
                    Content = node.InnerText?.Trim(),
                    IsHeader = false,
                    LinkImage = null,
                    BlockType = "other",
                    Lession = LessionId
                };


                block.IsHeader = IsStrong(node);

                // Xác định BlockType và các thuộc tính khác
                // Nếu node là ảnh
                if (node.Name == "img")
                {
                    block.LinkImage = node.GetAttributeValue("src", null);
                    block.Content = null;
                    block.BlockType = "image";
                }
                // Nếu node là bảng
                else if (node.Name == "table")
                {
                    block.BlockType = "table";
                    block.Content = node.InnerText
                        .Replace("\n", " ")
                        .Replace("\t", " ")
                        .Trim();
                }
                // Nếu node là thẻ p có strong chứa "Phương pháp giải:"
                else if (node.Name == "p" && node.InnerText.Contains("Phương pháp giải:"))
                {
                    block.IsHeader = true;
                    block.Content = "Phương pháp giải";
                    block.BlockType = "method";
                    // Lấy nội dung phương pháp giải (có thể là node tiếp theo hoặc nằm trong span)
                    // Ở đây chúng ta lấy toàn bộ text của node này, sau đó có thể xử lý tách riêng phần "Phương pháp giải:" ra
                    // Nhưng tạm thời giữ nguyên
                }
                // Nếu node là thẻ p có strong chứa "Cách 1" hoặc "Cách 2"
                else if (node.Name == "p" && node.SelectSingleNode(".//strong[starts-with(text(), 'Cách ')]") != null)
                {
                    block.IsHeader = true;
                    block.Content = node.SelectSingleNode(".//strong").InnerText.Trim();
                    block.BlockType = "solution";
                    // Xóa thẻ strong khỏi Text để chỉ lấy nội dung giải
                    var strongNode = node.SelectSingleNode(".//strong");
                    if (strongNode != null)
                    {
                        block.Content = node.InnerText.Replace(strongNode.OuterHtml, "").Trim();
                    }
                }
                // Nếu node là thẻ div có class chứa "explanation-title2" (tab tiêu đề)
                else if (node.HasClass("explanation-title2"))
                {
                    block.IsHeader = true;
                    block.Content = node.InnerText.Trim();
                    block.BlockType = "solution"; // coi đây là tiêu đề của một cách giải
                }
                // Nếu node là thẻ div chứa nội dung giải (trong tab ẩn)
                else if (node.HasClass("explanation-content2"))
                {
                    block.BlockType = "solution";
                    // Có thể có nhiều đoạn trong này, chúng ta có thể tách ra thành các block con? 
                    // Nhưng ở đây chúng ta giữ nguyên cả khối
                }

                // Thêm block vào kết quả nếu có nội dung hoặc ảnh
                if (!string.IsNullOrWhiteSpace(block.Content) || block.LinkImage != null)
                    result.Add(block);
            };

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
        private static bool IsStrong(HtmlNode node)
        {
            if (node == null) return false;
            return node.ChildNodes.Any(x => x.Name == "strong");
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
