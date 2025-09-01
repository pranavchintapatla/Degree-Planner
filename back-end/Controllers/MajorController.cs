using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MajorController : ControllerBase
    {
        [HttpGet("GetAllMajors")]
        public ActionResult GetAllMajors()
        {
            string path = Directory.GetCurrentDirectory();
            string fileDir = Path.Combine(path, "../scraper/data");
            string filename = Path.Combine(fileDir, "majors.json");

            string majors = System.IO.File.ReadAllText(filename);

            return Ok(majors);
        }

        [Authorize(AuthenticationSchemes = "StaffAuthentication")]
        [Authorize(Policy = "StaffOnly")]
        [HttpPut("EditMajor")]
        public ActionResult EditMajor(string majorInput, int index)
        {
            string path = Directory.GetCurrentDirectory();
            string fileDir = Path.Combine(path, "../scraper/data");
            string filename = Path.Combine(fileDir, "majors.json");

            dynamic editedMajor = JsonConvert.DeserializeObject(majorInput);
            string json = System.IO.File.ReadAllText(filename);

            dynamic majors = JsonConvert.DeserializeObject(json);
            majors[index] = editedMajor;
            string serializedMajors = JsonConvert.SerializeObject(majors, Formatting.Indented);
            System.IO.File.WriteAllText(filename, serializedMajors);

            return Ok();
        }
        [Authorize(AuthenticationSchemes = "StaffAuthentication")]
        [Authorize(Policy = "StaffOnly")]
        [HttpPost("CreateMajor")]
        public ActionResult CreateMajor(string majorInput)
        {
            ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
            if (ci == null)
            {
                return Unauthorized();
            }
            string path = Directory.GetCurrentDirectory();
            string fileDir = Path.Combine(path, "../scraper/data");
            string filename = Path.Combine(fileDir, "majors.json");

            dynamic newMajor = JsonConvert.DeserializeObject(majorInput);
            string json = System.IO.File.ReadAllText(filename);

            dynamic majors = JsonConvert.DeserializeObject(json);
            majors.Add(newMajor);
            string serializedMajors = JsonConvert.SerializeObject(majors, Formatting.Indented);
            System.IO.File.WriteAllText(filename, serializedMajors);

            return Ok();
        }
    }
}
