##SPA Diagram
![image](https://github.com/user-attachments/assets/8179affb-6add-4e06-a6e2-c652f515acab)

##App Controller and App View
The app controller simply manages all the routes that are currently in the SPA returning the app view.

##App.tsx
This is the top level component for the SPA. Currently it sets up the App store, creates a context for the app services and renders the Popup component and the Router service component.

### Services

As the name suggests these provide a functional service to the rest of the app, usually receiving config data and acting accordingly.

Two examples:

1. _Popup Service_ - accessed anywhere throughout the app like 

    ```
    const popupService = usePopupService()
    const popupServiceConfig: IPopupServiceConfig = {
        Component: FetchMessages,
        componentProps: fetchMessagesProps,
    }

    if (showGenericError || showAuthenticationError) popupService.showPopup(popupServiceConfig);
    else popupService.hidePopup();

2. _Router Service_ - this service is different in that it runs automatically under certain circumstances and is mounted directly by app.tsx - it doesn't require calling in the same way as the Popup Service. It still consumes config data but these configs are predefined in an IPageCollection and accessed programmatically.

##Router Service
The router service listens for changes in the url path and taking the new pathname as a key it selects the IPage config from the IPageCollection. This provides the router with  the data it needs to make a route change with the following process:

1. Verify route exists
2. Authorises the user's access to the route via AppAuthorisationController
3. Set page controls e.g. isAdmin, page Title and icon
4. Construct props to be passed to the page component - this comes together from any partial props object on the IPage object and anything in the url query.
5. Determine whether this is a transition between child and parent routes or whether it is from outside the SPA or between separate 'pages' within it. If it is a parent/child transition then we leave the page component in place and the router simply updates the props passed to it so it can handle what is being rendered internally. Otherwise the component from the IPage object is rendered.
