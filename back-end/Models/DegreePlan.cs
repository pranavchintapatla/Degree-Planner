using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace backend.Models
{
    public class DegreePlan
    {
        [Required]
        public string Id { get; set; }
        public List<List<List<string>>> Courses  { get; set; }
        public string MajorType { get; set; }
        public List<string> Majors { get; set; }
        public int StartYear { get; set; }
        public int StartSemester    { get; set; }

        public List<string> Concessions { get; set; }


    }
}
