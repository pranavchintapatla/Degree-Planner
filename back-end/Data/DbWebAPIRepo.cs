using backend.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data
{
    public class DbWebAPIRepo : IWebAPIRepo
    {
        private readonly ProjectDbContext _dbContext;
        public DbWebAPIRepo(ProjectDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public bool StudentValidLogin(string username, string password)
        {
            Students student = _dbContext.Students.FirstOrDefault(e => e.Username == username && e.Password == password);
            if (student == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        public bool StaffValidLogin(string username, string password)
        {
            Staff staff = _dbContext.Staff.FirstOrDefault(e => e.Username == username && e.Password == password);
            if (staff == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        public Students StudentRegister(Students student)
        {
            EntityEntry<Students> e = _dbContext.Students.Add(student);
            Students s = e.Entity;
            _dbContext.SaveChanges();
            return s;
        }
        public Staff StaffRegister(Staff staff)
        {
            EntityEntry<Staff> e = _dbContext.Staff.Add(staff);
            Staff s = e.Entity;
            _dbContext.SaveChanges();
            return s;
        }
    }
}
