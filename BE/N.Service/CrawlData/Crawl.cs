using HtmlAgilityPack;
using N.Model.Entities;
using N.Service.CourseService;
using N.Service.DetailLessionService;
using N.Service.LessionService;
using N.Service.SubjectNXBService;
using N.Service.SubjectService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace N.Service.CrawlData
{
    public class Crawl : ICrawl
    {
        private readonly ICourseService _courseService;
        private readonly ILessionService _lessionService;
        private readonly IDetailLessionService _detailLessionService;
        private readonly ISubjectService _subjectService;
        private readonly ISubjectNXBService _subjectNXBService;

        public Crawl(ICourseService courseService, ILessionService lessionService, IDetailLessionService detailLessionService, ISubjectService subjectService, ISubjectNXBService subjectNXBService)
        {
            _courseService = courseService;
            _lessionService = lessionService;
            this._detailLessionService = detailLessionService;
            this._subjectService = subjectService;
            this._subjectNXBService = subjectNXBService;
        }

        public static string Domain = "https://loigiaihay.com";

        public static string GetTitleLession(string lession_title)
        {
            var title = lession_title.Substring((lession_title.LastIndexOf(".") == -1 ? lession_title.LastIndexOf(":") : lession_title.LastIndexOf(".")) + 1).Trim();
            return title;
        }


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

        public async Task CrawlDetail(string url, string title, string titleSubject, SubjectNXB? IdSub)
        {
            var web = new HtmlWeb();
            var doc = web.Load(Domain + url);


            var listBox = doc.DocumentNode.SelectNodes("//div[contains(@class, 'box-question')]");
            var list = new List<DetailLession>();

            if (listBox is null)
                return;


            var course = new Course
            {
                Title = titleSubject,
                CodeSubJect = "",
                Subject = IdSub.Name,
                Grade = 12,
                Index = 1,
                IdSub = IdSub.Id,
                Href = url
            };
            var isChecked = await _courseService.CheckCourseTitle(titleSubject);

            if (!isChecked)
            {
                await _courseService.CreateAsync(course);
            }
            else
            {
                course = await _courseService.GetCourseTitle(titleSubject);
            }
            bool isCheckedLession = await _lessionService.CheckLession(titleSubject);

            var lession = new Lession
            {
                CourseId = course.Id,
                Title = title,
                Grade = 1,
                Href = url
            };
            if (!isCheckedLession)
            {
                await _lessionService.CreateAsync(lession);
            }

            foreach (var node in listBox)
            {
                list.AddRange(BoxQuestionParser.ParseBoxQuestion(node,  lession.Id, Domain));
            }

            if (list.Any())
            {
                try
                {
                    await _detailLessionService.CreateAsync(list);
                    Task.Delay(100);
                }
                catch (Exception ex)
                {
                    throw;
                }
            }



        }



        public void CrawlLesson(string url, SubjectNXB? IdSub)
        {
            var web = new HtmlWeb();
            var doc = web.Load(Domain + url);

            // tiêu đề bài học
            var nodesSubject = doc.DocumentNode.SelectNodes("//div[contains(@class, 'subject-item no-bg pm0')]");

            if (nodesSubject != null)
            {
                var listTup = new List<Tuple<string, string, string>>();

                foreach (var node in nodesSubject)
                {
                    var titleNode = node.SelectSingleNode(".//h2//a//strong");

                    var titleSubject = titleNode.InnerText.Trim();

                    var divSubject = node
                                  .SelectSingleNode(".//div[contains(@class,'event-articles-wrap-2-cols')]")
                                  ?.SelectNodes(".//ul//li//a");

                    if (divSubject == null)
                        continue;

                    listTup.AddRange(divSubject.Select(t => new Tuple<string, string, string>(t.GetAttributeValue("href", string.Empty), GetTitleLession(t.SelectSingleNode(".//span").InnerText.Trim()), GetTitleLession(titleSubject))).ToList());
                    
                }

                foreach (var item in listTup)
                {
                    try
                    {
                        CrawlDetail(item.Item1, item.Item2, item.Item3, IdSub);
                    }
                    catch (Exception ex)
                    {

                        throw;
                    }
                }

                //Parallel.ForEach(listTup, item =>
                //{
                //    try
                //    {
                //        CrawlDetail(item.Item1, item.Item2, item.Item3);
                //    }
                //    catch (Exception ex)
                //    {

                //        throw;
                //    }
                //});




            }

        }

        public async Task CrawlWeb()
        {
            var web = new HtmlWeb();
            var doc = web.Load("https://loigiaihay.com/lop-12.html");
            var nodes = doc.DocumentNode.SelectNodes("//div[contains(@class, 'subject-item')]");

            if (nodes != null)
            {
                List<SubjectNXB> ListHref = new();
                foreach (var node in nodes)
                {
                    var titleNode = node.SelectSingleNode(".//h2");
                    var titleSubject = titleNode.InnerText.Trim();
                    var listSubjectItems = node.SelectNodes(".//div//ul//li//a");


                    var Subject =  _subjectService.SubjectCheck(titleSubject);

                    if (Subject == null)
                    {
                        Subject = new Subject
                        {
                            Code = titleSubject,
                            SubjectName = titleSubject
                        };

                         _subjectService.Create(Subject);
                    }

                    var listSujectNXH = listSubjectItems.Select(t => new SubjectNXB
                    {
                        Href = t.GetAttributeValue("href", string.Empty),
                        Name = t.InnerText.Trim(),
                        Subject = Subject.Id,
                    }).ToList();

                    if (listSujectNXH.Any())
                    {
                        _subjectNXBService.CreateAsync(listSujectNXH);
                    }


                    ListHref.AddRange(listSujectNXH);

                }


                foreach (var src in ListHref)
                {
                    try
                    {
                        CrawlLesson(src.Href, src);
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }


                //Parallel.ForEach(ListHref, src =>
                //{
                //    CrawlLesson(src);
                //});
            }
        }
    }
}
