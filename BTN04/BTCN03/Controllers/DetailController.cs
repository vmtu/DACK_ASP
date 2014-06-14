using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BTCN03.Models;
namespace BTCN03.Controllers
{
    public class DetailController : Controller
    {
        //
        // GET: /Detail/

        public ActionResult Index()
        {
            HomeModels a = new HomeModels();
            string id = Request.QueryString["id"];
            ViewData["item"] = a.findItemById(id);
            ViewData["comment"] = a.getComment(id);
            return View();
        }

    }
}
