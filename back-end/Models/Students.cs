using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Students
    {
        [Key]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
