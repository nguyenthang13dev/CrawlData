using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace N.Service.CrawlData
{
    public class Crawl
    {

        public static string Domain = "https://loigiaihay.com";


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

        public static void CrawlDetail(string url, string title)
        {
            var web = new HtmlWeb();
            var doc = web.Load(Domain + url);


            var listBox = doc.DocumentNode.SelectNodes("//div[contains(@class, 'box-question')]");
            var list = new List<ParsedBoxQuestion>();

            if (listBox is null)
                return;

            foreach (var node in listBox)
            {
                list.Add(BoxQuestionParser.ParseBoxQuestion(node, Domain));
            }

            
        }



        public static void CrawlLesson(string url)
        {
            var web = new HtmlWeb();
            var doc = web.Load(Domain + url);

            // tiêu đề bài học
            var nodesSubject = doc.DocumentNode.SelectNodes("//div[contains(@class, 'subject-item no-bg pm0')]");

            if (nodesSubject != null)
            {
                var listTup = new List<Tuple<string, string>>();

                foreach (var node in nodesSubject)
                {
                    var titleNode = node.SelectSingleNode(".//h2//a//strong");

                    var titleSubject = titleNode.InnerText.Trim();

                    var divSubject = node
                                  .SelectSingleNode(".//div[contains(@class,'event-articles-wrap-2-cols')]")
                                  ?.SelectNodes(".//ul//li//a");

                    if (divSubject == null)
                        continue;

                    listTup.AddRange(divSubject.Select(t => new Tuple<string, string>(t.GetAttributeValue("href", string.Empty), t.SelectSingleNode(".//span").InnerText.Trim())).ToList());
                    
                }

                foreach (var item in listTup)
                {
                    try
                    {
                        var href = item.Item1;
                        var title = item.Item2;
                        CrawlDetail(href, title);
                    }
                    catch (Exception ex)
                    {

                        throw;
                    }
                }



               
            }

        }

        public static void CrawlWeb()
        {
            var web = new HtmlWeb();
            var doc = web.Load("https://loigiaihay.com/lop-12.html");
            var nodes = doc.DocumentNode.SelectNodes("//div[contains(@class, 'subject-item')]");

            if (nodes != null)
            {
                List<string> ListHref = new();
                foreach (var node in nodes)
                {
                    var titleNode = node.SelectSingleNode(".//h2");
                    var titleSubject = titleNode.InnerText.Trim();
                    var listSubjectItems = node.SelectNodes(".//div//ul//li//a");

                    var ListHrefCrawl = listSubjectItems.Select(t => t.GetAttributeValue("href", string.Empty)).ToList();

                    if (titleSubject.ToUpper().Equals("MÔN NGỮ VĂN"))
                    {
                        ListHref.AddRange(ListHrefCrawl);
                    }

                }


                foreach (var src in ListHref)
                {
                    try
                    {
                        CrawlLesson(src);
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }
               
            }
        }
    }
}
