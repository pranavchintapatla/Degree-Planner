using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlannerController : ControllerBase
    {
        [HttpGet("GetStudentPlanner/{id}")]
        public ActionResult GetStudentPlanner(string id)
        {
            string path = Directory.GetCurrentDirectory();
            string planDir = Path.Combine(path, "StudentPlans");
            string fileName = Path.Combine(planDir, id + ".json");
            string respHeader = "";

            if (System.IO.File.Exists(fileName))
            {
                respHeader = "application/json";
            }
            return PhysicalFile(fileName, respHeader);
        }
        [HttpGet("CheckStudentPlannerExists/{id}")]
        public Boolean CheckStudentPlannerExists(string id)
        {
            string path = Directory.GetCurrentDirectory();
            string planDir = Path.Combine(path, "StudentPlans");
            string fileName = Path.Combine(planDir, id + ".json");

            if (System.IO.File.Exists(fileName))
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        [HttpPost("CreateStudentPlanner")]
        public ActionResult CreateStudentPlanner(DegreePlan plan)
        {
            JObject obj = (JObject)JObject.FromObject(plan);
            string path = Directory.GetCurrentDirectory();
            string planDir = Path.Combine(path, "StudentPlans");
            string fileName = Path.Combine(planDir, plan.Id + ".json");
            System.IO.File.WriteAllText(fileName, obj.ToString());
            return Ok();
        }

        [HttpPut("UpdateStudentPlanner")]
        public ActionResult UpdateStudentPlanner(string jsonString, string id)
        {
            //Get planner file
            string path = Directory.GetCurrentDirectory();
            string planDir = Path.Combine(path, "StudentPlans");
            string fileName = Path.Combine(planDir, id + ".json");

            dynamic editedPlanner = JsonConvert.DeserializeObject(jsonString);
            string serializedPlanner = JsonConvert.SerializeObject(editedPlanner, Formatting.Indented);

            System.IO.File.WriteAllText(fileName, serializedPlanner);

            return Ok();
        }
    }
}
