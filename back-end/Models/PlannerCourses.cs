using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace backend.Models
{
    public class PlannerCourses
    {
        public List<List<string>> Year1Courses { get; set; }
        public List<List<string>> Year2Courses { get; set; }
        public List<List<string>> Year3Courses { get; set; }
        public List<List<string>> Year4Courses { get; set; }
        public List<List<string>> Year5Courses { get; set; }

    }
}
