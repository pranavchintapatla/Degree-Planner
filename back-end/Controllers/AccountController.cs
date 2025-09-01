using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IWebAPIRepo _repository;
        public AccountController(IWebAPIRepo repository)
        {
            _repository = repository;
        }
        [HttpPost("Register")]
        public ActionResult Register(UsersInputDto user)
        {
            if (user.IsStaff == true)
            {
                if (_repository.StaffValidLogin(user.Username, user.Password))
                {
                    return Ok("Username not available.");
                }
                else
                {
                    Staff s = new Staff { Username = user.Username, Password = user.Password };
                    _repository.StaffRegister(s);
                    return Ok("User successfully registered.");
                }
            }
            else
            {
                if (_repository.StudentValidLogin(user.Username, user.Password))
                {
                    return Ok("Username not available");
                }
                else
                {
                    Students s = new Students { Username = user.Username, Password = user.Password };
                    _repository.StudentRegister(s);
                    return Ok("User successfully registered.");
                }
            }
        }
        [HttpPost("Login")]
        public ActionResult Login(LoginInputDto loginInput)
        {
            if (_repository.StaffValidLogin(loginInput.Username, loginInput.Password))
            {
                return Ok("staff");
            }
            if (_repository.StudentValidLogin(loginInput.Username, loginInput.Password))
            {
                return Ok("student");
            }
            return Ok("Invalid user details.");
        }
    }
}
