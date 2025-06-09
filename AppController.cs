using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using UL.Curriculum.WebSite.Classes.Account;
using UL.Curriculum.WebSite.Data.Curriculum;
using UL.Curriculum.WebSite.DTO.Account;
using UL.Curriculum.WebSite.DTO;
using UL.Curriculum.Shared.Services.Authentication;

namespace UL.Curriculum.WebSite.Controllers
{
    public class AppController : Controller
    {
        private readonly CurriculumService _curriculumService;
        private readonly UserDetailsDTO _userSettings;
        private readonly IAccountManagementService _accountManagementService;
        private readonly ILogger<AppController> _logger;
        private readonly int UserId = 0;

        public AppController(
            CurriculumService curriculumService,
            IApplicationUserAccessor userAccessor,
            IAccountManagementService accountManagementService,
            ILogger<AppController> logger
        )
        {
            _curriculumService = curriculumService;
            _userSettings = _curriculumService.GetUserSettings();
            _accountManagementService = accountManagementService;
            _logger = logger;

            if (userAccessor.ApplicationUser != null)
            {
                this.UserId = userAccessor.ApplicationUser.UserId;
            }
        }

        [Route("Account")]
        [Route("Clients")]
        [Route("Clients/Users")]
        [Route("Feedback")]
        [Route("PackageManager")]
        [Route("PackageManager/Build")]
        [Route("ServiceDesk")]
        [Route("Services")]
        [Route("Analytic")]
        [Route("VirtualAssistant")]
        [Route("VirtualAssistant/Build")]
        [Route("VirtualAssistant/Build/Filter")]
        [Route("Unauthorised")]
        public IActionResult AdminIndex()
        {
            return ReturnViewWithUserSettings();
        }

        /// <summary>
        /// Get current user details formatted for the unauthorised access page
        /// </summary>
        /// <returns>Current user details</returns>
        [HttpGet]
        public IActionResult GetUserDetailsForUnauthorisedAccess()
        {
            try
            {
                UserDetailsForUnauthorisedAccessDTO userDetails = _accountManagementService
                    .GetUserDetailsForUnauthorisedAccess(UserId);

                if (userDetails == null)
                {
                    userDetails = new UserDetailsForUnauthorisedAccessDTO();
                    userDetails.FullName = "Not signed in";
                    userDetails.RoleName = "Not signed in";
                }

                return Json(userDetails);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, message: null);
                return Problem();
            }
        }

        #region Private Functions

        private IActionResult ReturnViewWithUserSettings()
        {
            return View(viewDirectory, _userSettings);
        }

        const string viewDirectory = "~/Views/App/Index.cshtml";

        #endregion
    }
}
