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
    public class SpecialisationController : ControllerBase
    {
        [HttpGet("GetAllSpecialisations")]
        public ActionResult GetAllSpecialisations()
        {
            string file = "specialisations.json";
            string path = Directory.GetCurrentDirectory();
            string fileDir = Path.Combine(path, "../scraper/data");
            string filename = Path.Combine(fileDir, file);

            string specialisations = System.IO.File.ReadAllText(filename);

            return Ok(specialisations);
        }

        [Authorize(AuthenticationSchemes = "StaffAuthentication")]
        [Authorize(Policy = "StaffOnly")]
        [HttpPut("EditSpecialisation")]
        public ActionResult EditSpecialisation(string specialisationInput, int index)
        {
            ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
            if (ci == null)
            {
                return Unauthorized();
            }
            string file = "specialisations.json";
            string path = Directory.GetCurrentDirectory();
            string fileDir = Path.Combine(path, "../scraper/data");
            string filename = Path.Combine(fileDir, file);

            dynamic editedSpecialisation = JsonConvert.DeserializeObject(specialisationInput);
            string json = System.IO.File.ReadAllText(filename);

            dynamic specialisations = JsonConvert.DeserializeObject(json);
            specialisations[index] = editedSpecialisation;
            string serializedSpecialisations = JsonConvert.SerializeObject(specialisations, Formatting.Indented);
            System.IO.File.WriteAllText(filename, serializedSpecialisations);

            return Ok();
        }

        [Authorize(AuthenticationSchemes = "StaffAuthentication")]
        [Authorize(Policy = "StaffOnly")]
        [HttpPost("CreateSpecialisation")]
        public ActionResult CreateSpecialisation(string specialisationInput)
        {
            ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
            if (ci == null)
            {
                return Unauthorized();
            }
            string file = "specialisations.json";
            string path = Directory.GetCurrentDirectory();
            string fileDir = Path.Combine(path, "../scraper/data");
            string filename = Path.Combine(fileDir, file);

            dynamic newSpecialisation = JsonConvert.DeserializeObject(specialisationInput);
            string json = System.IO.File.ReadAllText(filename);

            dynamic specialisations = JsonConvert.DeserializeObject(json);
            specialisations.Add(newSpecialisation);
            string serializedSpecialisations = JsonConvert.SerializeObject(specialisations, Formatting.Indented);
            System.IO.File.WriteAllText(filename, serializedSpecialisations);

            return Ok();
        }
    }
}
