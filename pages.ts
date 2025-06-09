import { routes } from "./routes";
import { IPage } from "./iapppage";
import { icons } from "../icons/icons";
import { AccountDisplay } from "../../pages/account/account";
import { ClientActions, ClientManagementView } from "../../pages/client-management/client-management-view";
import { FeedbackTable } from "../../pages/feedback/Feedback";
import { PackageManagerView, PackagePageActions } from "../../pages/package-manager/package-manager-view";
import { ServiceDesk } from "../../pages/service-desk/service-desk";
import { ServiceManagementView } from "../../pages/service-management/service-management-view";
import { VirtualAssistantActions, VirtualAssistantView } from "../../pages/virtual-assistant/virtual-assistant-view";
import { CurriculumAnalytic } from "../../pages/analytic/curriculum-analytic";
import { UnauthorisedAccess } from "../../pages/authorisation/unauthorised-access";

export const createSPAPages = () => {
    const account = new IPage();
    account.title = "Manage Your Account";
    account.icon = icons.page.account;
    account.route = routes.account;
    account.component = AccountDisplay;
    account.isAdmin = false;

    const clients = new IPage();
    clients.title = "Manage Clients";
    clients.icon = icons.page.clients;
    clients.route = routes.clients;
    clients.component = ClientManagementView;
    clients.partialProps = { action: ClientActions.default }

    const clientsUsers = new IPage();
    clientsUsers.title = "Users";
    clientsUsers.icon = icons.page.clients;
    clientsUsers.route = routes.clientsUsers;
    clientsUsers.component = ClientManagementView;
    clientsUsers.partialProps = { action: ClientActions.users };

    const feedback = new IPage();
    feedback.title = "User Feedback";
    feedback.icon = icons.page.feedback;
    feedback.route = routes.feedback;
    feedback.component = FeedbackTable;

    const packageManager = new IPage();
    packageManager.title = "Package Manager";
    packageManager.icon = icons.page.packageManager;
    packageManager.route = routes.packageManager;
    packageManager.component = PackageManagerView;
    packageManager.partialProps = { action: PackagePageActions.default };

    const packageManagerBuild = new IPage();
    packageManagerBuild.title = "Package Manager - Build Package";
    packageManagerBuild.icon = icons.page.packageManager;
    packageManagerBuild.route = routes.packageManagerBuild;
    packageManagerBuild.parentRoute = routes.packageManager;
    packageManagerBuild.component = PackageManagerView;
    packageManagerBuild.partialProps = { action: PackagePageActions.buildPackage };

    const serviceDesk = new IPage();
    serviceDesk.title = "Service Desk Tools";
    serviceDesk.icon = icons.page.serviceDesk;
    serviceDesk.route = routes.serviceDesk;
    serviceDesk.component = ServiceDesk;

    const serviceManagement = new IPage();
    serviceManagement.title = "Service Management";
    serviceManagement.icon = icons.page.serviceManagement;
    serviceManagement.route = routes.serviceManagement;
    serviceManagement.component = ServiceManagementView;

    const virtualAssistant = new IPage();
    virtualAssistant.title = "Virtual Assistant";
    virtualAssistant.icon = icons.page.virtualAssistant;
    virtualAssistant.route = routes.virtualAssistant;
    virtualAssistant.component = VirtualAssistantView;
    virtualAssistant.partialProps = { action: VirtualAssistantActions.Default };

    const virtualAssistantBuild = new IPage();
    virtualAssistantBuild.title = "Virtual Assistant - Build";
    virtualAssistantBuild.icon = icons.page.virtualAssistant;
    virtualAssistantBuild.route = routes.virtualAssistantBuild;
    virtualAssistantBuild.parentRoute = routes.virtualAssistant;
    virtualAssistantBuild.component = VirtualAssistantView;
    virtualAssistantBuild.partialProps = { action: VirtualAssistantActions.Build };

    const virtualAssistantFilter = new IPage();
    virtualAssistantFilter.title = "Virtual Assistant - Build - Filter";
    virtualAssistantFilter.icon = icons.page.virtualAssistant;
    virtualAssistantFilter.route = routes.virtualAssistantFilter;
    virtualAssistantFilter.parentRoute = routes.virtualAssistantBuild;
    virtualAssistantFilter.component = VirtualAssistantView;
    virtualAssistantFilter.partialProps = { action: VirtualAssistantActions.Filter };

    const analytics = new IPage();
    analytics.title = "Analytics";
    analytics.icon = icons.page.analytic;
    analytics.route = routes.analytic;
    analytics.component = CurriculumAnalytic;

    const unauthorised = new IPage();
    unauthorised.title = "Unauthorised Access";
    unauthorised.icon = icons.page.unauthorised;
    unauthorised.route = routes.unauthorised;
    unauthorised.component = UnauthorisedAccess;
}
