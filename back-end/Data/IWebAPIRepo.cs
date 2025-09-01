using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data
{
    public interface IWebAPIRepo
    {
        public bool StudentValidLogin(string username, string password);
        public Students StudentRegister(Students student);
        public Staff StaffRegister(Staff staff);
        public bool StaffValidLogin(string username, string password);
    }
}
