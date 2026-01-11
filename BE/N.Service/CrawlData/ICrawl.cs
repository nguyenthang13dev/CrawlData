using N.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Service.CrawlData
{
    public interface ICrawl
    {
        Task CrawlDetail(string url, string title, string titleSubject, SubjectNXB? IdSub);
        void CrawlLesson(string url, SubjectNXB? IdSub);
        Task CrawlWeb();
    }
}
