import React, { ComponentType, Dispatch, SetStateAction, useEffect } from "react";
import { FC, useState } from "react";
import { AppStore } from "../../core-components/components/app/app-store";
import { IPage, IProps } from "../../constants/pages/iapppage";
import { routes } from "../../constants/pages/routes";
import { IF } from "../../core-components/atomic/if/if";
import { Helper } from "../../helpers/helperFunctions";

interface RouterServiceProps {
    appStore?: AppStore;
}

interface RouteProps {
    RouteComponent: ComponentType;
    routeProps: IProps;
}

const getRoute = (): string => window.location.pathname;

const getRouteKey = (): string => {
    return getRoute();
}

const authoriseRoute = async (routeKey: string): Promise<boolean> => {
    const endpoint = routeKey.split("/").join("");
    const result = await fetch(`/AppAuthorisation/${endpoint}`,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
            redirect: "manual"
        }
    );
    if (result.ok) return true;

    // Redirect to unauthorised page with page name as URL paramter
    const pageFromRoute: IPage = IPage.getPage(getRoute());
    const resourceName: string = pageFromRoute.title;

    // Add resource name to unauthorised page partial props
    const page: IPage = IPage.getPage(routes.unauthorised);
    page.partialProps = { resourceName: resourceName };

    Helper.url.changeSPARoute(routes.unauthorised);
}

const setULLogoStyle = (isAdmin: boolean) => {
    const compactClass = "compact";
    const ULLogo = document.querySelector(".logo-top-left");
    if (isAdmin) ULLogo.classList.add(compactClass);
    else ULLogo.classList.remove(compactClass);
}

const setAdminPageTitles = (isAdmin: boolean, title: string, iconClass: string) => {
    const isVisibleClass = "isVisible";
    const titleElement = document.querySelector(".border-page-title");
    const titleTextElement = document.querySelector(".border-page-title-text");
    const iconElement = document.getElementById("page-title-icon")
    if (isAdmin) {
        iconElement.className = iconClass;
        titleTextElement.innerHTML = title;
        titleElement.classList.add(isVisibleClass);
    }
    else {
        titleElement.classList.remove(isVisibleClass);
        iconElement.className = "";
        titleTextElement.innerHTML = null;
    }
 }

const setPageControls = (routeKey: string, appStore: AppStore, appPage: IPage) => {
    const isAdmin = appPage?.isAdmin;
    const pageTitle = appPage?.title;
    const pageIcon = appPage?.icon;
    //appStore.setIsAdmin(routeData.isAdmin);
    //appStore.setIsInitialiseOnly(routeData.isInitialiseOnly);
    //appStore.setPageTitle(routeData.title);
    setULLogoStyle(isAdmin);
    setAdminPageTitles(isAdmin, pageTitle, pageIcon);

    document.title = pageTitle + " - United Curriculum";
}

const checkRouteExists = (routeKey: string): void => {
    const routeExists = Object.values(routes).includes(routeKey);
    if (!routeExists) throw new Error("Router Error - Invalid Route")
}

const setProps = (
    appPage: IPage,
    setRouteProps: Dispatch<SetStateAction<IProps>>
) => {
    appPage?.setPropsWithQuery(setRouteProps);
}

const handleRouteChange = async (
    setRouteKey: Dispatch<SetStateAction<string>>,
    appStore: AppStore,
    setRouteProps: Dispatch<SetStateAction<IProps>>
) => {
    const routeKey: string = getRouteKey();
    const appPage = IPage.getPage(routeKey);
    checkRouteExists(routeKey);
    const isAuthorised = await authoriseRoute(routeKey);
    if (isAuthorised) {
        setRouteKey(routeKey);
        setPageControls(routeKey, appStore, appPage);
        setProps(appPage, setRouteProps);
    }
}

const addRouteChangeListener = (handleRouteChange): void => {
    window.addEventListener("popstate", () => {
        handleRouteChange()
    });
    window.addEventListener(
        "pushstate", () => {
            handleRouteChange()
        }
    );
}

const Route: FC<RouteProps> = ({ RouteComponent, routeProps }) => {

    return (
        <>
            <IF condition={!!RouteComponent}>
                <RouteComponent {...routeProps} />
            </IF>
        </>
    )
}

export const RouterService: FC<RouterServiceProps> = ({ appStore }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [routeKey, setRouteKey] = useState<string>("");
    const [routeProps, setRouteProps] = useState<IProps>();

    useEffect(() => {
        handleRouteChange(setRouteKey, appStore, setRouteProps);
        addRouteChangeListener(() => handleRouteChange(setRouteKey, appStore, setRouteProps));
    }, [])

    useEffect(() => {
        if (!!routeKey && routeProps) setIsLoading(false);
    }, [routeKey, routeProps])

    return (
        <IF condition={!isLoading}>
            <Route
                RouteComponent={IPage.getPage(routeKey)?.component}
                routeProps={routeProps}
            />
        </IF>
    );
}

