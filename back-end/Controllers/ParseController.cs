using IronPython.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;
using IronPython.Runtime;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParseController : ControllerBase
    {
        [HttpGet("parseCourseRequirement")]
        public ActionResult<PythonList> parseCourseRequirement(string requirement)
        {
            //create file path
            string path = Directory.GetCurrentDirectory();
            string planDir = Path.Combine(path, "PythonScript");
            string fileName = Path.Combine(planDir, "parse_requirements" + ".py");

            //create iron python engine
            var engine = Python.CreateEngine();
            var source = engine.CreateScriptSourceFromFile(fileName);
            var compiledSource = source.Compile();
            var scope = engine.CreateScope();

            List<string> list = new List<string>();
            list.Add(requirement);
            
            //add variable to command line
            Python.GetSysModule(engine).SetVariable("argv", list);

            compiledSource.Execute(scope);

            PythonList result = scope.GetVariable("new_req");

            return Ok(result);

        }   




    }


}
