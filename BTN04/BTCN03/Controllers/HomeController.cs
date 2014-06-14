using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BTCN03.Models;

namespace BTCN03.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Login/
        private HomeModels homeModel;
        public HomeController()
        {
            homeModel = new HomeModels();
        }
        public ActionResult Index()
        {
            string category = Request.QueryString["Category"];
            string currentPage = "0";
            if (Request.QueryString["Page"] != null)
                currentPage = Request.QueryString["Page"];
            if(category == null)
                ViewData["data"] = homeModel.getData(currentPage);
            else
                ViewData["data"] = homeModel.getDataFilter(category, currentPage);
            ViewData["totalPage"] = homeModel.totalPage(category);
            return View();
        }
        public ActionResult Comment()
        {
            string name = Request.QueryString["name"];
            string content = Request.QueryString["content"];
            string id = Request.QueryString["id"];
            homeModel.insertComment(id, name, content);
            return null;
        }
        public ActionResult InsertDataViaAjax()
        {
            string title = Request.QueryString["title"];
            string des = Request.QueryString["des"];
            string linkimg = Request.QueryString["linkimg"];
            string cost = Request.QueryString["cost"];
            string link = Request.QueryString["link"];
            string type = Request.QueryString["type"];
            string style = Request.QueryString["style"];
            string material = Request.QueryString["material"];
            string weight = Request.QueryString["weight"];
            string date = Request.QueryString["date"];
            string author = Request.QueryString["author"];
            string tag = Request.QueryString["tag"];
            homeModel.InsertData(title, des, linkimg, cost, link, type, style, material, weight, date, author, tag);
            return null;
        }
    }
}
