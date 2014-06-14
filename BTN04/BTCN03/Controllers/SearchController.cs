using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BTCN03.Models;
namespace BTCN03.Controllers
{
    public class SearchController : Controller
    {
        //
        // GET: /Search/
        private Search homeModel;
        public ActionResult Index()
        {
            string currentPage = "0";
            if (Request.QueryString["Page"] != null)
                currentPage = Request.QueryString["Page"];
            string keywork = Request.QueryString["search_query"];
            homeModel = new Search(keywork);
            ViewData["searchResult"] = homeModel.getSearchResult(currentPage);
            ViewData["totalPage"] = homeModel.totalPage();
            return View();
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Index(FormCollection collection)
        {
            homeModel = new Search();
            ViewData["searchResult"] = homeModel.getAdvancedSearchResult(collection);
            return this.View();
        }

    }
}
