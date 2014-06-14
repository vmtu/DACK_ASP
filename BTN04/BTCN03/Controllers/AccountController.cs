using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using BTCN04.Models;
using System.Threading.Tasks;
namespace BTCN03.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/
        public AccountController()
            : this(new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext())))
        {
        }
        public UserManager<ApplicationUser> UserManager { get; private set; }
        public AccountController(UserManager<ApplicationUser> userManager)
        {
            UserManager = userManager;
        }
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Register(FormCollection collection)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser() { UserName = collection["loginName"] };
                var result = await UserManager.CreateAsync(user, collection["loginPass"]);
                if (result.Succeeded)
                {
                    //Success
                }
                else
                {
                    //False
                }
            }

            // If we got this far, something failed, redisplay form
            return View();
        }
    }
}
