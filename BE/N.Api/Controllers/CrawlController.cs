using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using N.Service.CrawlData;

namespace N.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrawlController : ControllerBase
    {
        private readonly ICrawl _crawl;

        public CrawlController(ICrawl crawl)
        {
            _crawl = crawl;
        }


        [HttpGet("")]
        public IActionResult CrawlWeb()
        {
            _crawl.CrawlWeb();
            return Ok("Crawling initiated.");
        }

    }
}
