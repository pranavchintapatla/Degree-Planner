using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BScReqController : ControllerBase
    {
       [HttpGet("GetBScReq")]
        public ActionResult GetBScReq()
        {
            string file = "ScienceRequirements.json";
            string path = Directory.GetCurrentDirectory();
            string fileDir = Path.Combine(path, "../scraper/data");
            string filename = Path.Combine(fileDir, file);

            string bscReq = System.IO.File.ReadAllText(filename);

            return Ok(bscReq);
        }
    }
}
