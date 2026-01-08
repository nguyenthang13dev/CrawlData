using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using N.Service.CrawlData;

namespace N.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrawlController : ControllerBase
    {
        public CrawlController()
        {
        }


        [HttpGet("")]
        public IActionResult CrawlWeb()
        {
            Crawl.CrawlWeb();
            return Ok("Crawling initiated.");
        }

    }
}
