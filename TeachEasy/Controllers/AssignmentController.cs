﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TeachEasy.Controllers
{
    public class AssignmentController : Controller
    {
        // GET: Assignment
        public ActionResult Index()
        {
            ViewBag.ShowSideBar = true;
            return View();
        }
    }
}