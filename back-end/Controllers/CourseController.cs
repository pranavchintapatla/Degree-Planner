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
    public class CourseController : ControllerBase
    {
        [HttpGet("GetAllCourses/{schedule}/{year}")]
        public ActionResult GetAllCourses(string schedule, string year)
        {
            string[] coursesYear = { "2020", "2021", "2022", "2023" };
            string[] schedules = {"arts", "business-and-economics", "creative-arts-and-industries", "education-and-social-work", "engineering", "geneds", "law", "medical-and-health-sciences", "science"};

            if (schedules.Contains(schedule) && coursesYear.Contains(year))
            {
                string file = schedule + "-" + year + ".json";
                string path = Directory.GetCurrentDirectory();
                string fileDir = Path.Combine(path, "../scraper/data");
                string filename = Path.Combine(fileDir, file);

                string courses = System.IO.File.ReadAllText(filename);

                return Ok(courses);
            }
            return NotFound();
        }

        [Authorize(AuthenticationSchemes = "StaffAuthentication")]
        [Authorize(Policy = "StaffOnly")]
        [HttpPut("EditCourse")]
        public ActionResult EditCourse(string schedule,string year, string courseInput, int index)
        {
            ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
            if (ci == null)
            {
                return Unauthorized();
            }
            string[] coursesYear = { "2020", "2021", "2022" };

            if (coursesYear.Contains(year))
            {
                string file = schedule + "-" + year + ".json";
                string path = Directory.GetCurrentDirectory();
                string fileDir = Path.Combine(path, "../scraper/data");
                string filename = Path.Combine(fileDir, file);

                dynamic editedCourse = JsonConvert.DeserializeObject(courseInput);
                string json = System.IO.File.ReadAllText(filename);

                dynamic courses = JsonConvert.DeserializeObject(json);
                courses[index] = editedCourse;
                string serializedCourses = JsonConvert.SerializeObject(courses, Formatting.Indented);
                System.IO.File.WriteAllText(filename, serializedCourses);

                return Ok();
            }
            return NotFound();
        }
        [Authorize(AuthenticationSchemes = "StaffAuthentication")]
        [Authorize(Policy = "StaffOnly")]
        [HttpPost("CreateCourse")]
        public ActionResult CreateCourse(string courseInput, string year, string schedule)
        {
            ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
            if (ci == null)
            {
                return Unauthorized();
            }
            string file = schedule + "-" + year + ".json";
            string path = Directory.GetCurrentDirectory();
            string fileDir = Path.Combine(path, "../scraper/data");
            string filename = Path.Combine(fileDir, file);

            dynamic newCourse = JsonConvert.DeserializeObject(courseInput);
            string json = System.IO.File.ReadAllText(filename);

            dynamic courses = JsonConvert.DeserializeObject(json);
            courses.Add(newCourse);
            string serializedCourses = JsonConvert.SerializeObject(courses, Formatting.Indented);
            System.IO.File.WriteAllText(filename, serializedCourses);

            return Ok();
        }
    }
}
