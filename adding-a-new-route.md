##Introduction

There are a few simple steps involved when adding a new route/page/path to the app.

##Process 

1. In Solution Explorer, navigate to **ts > constants > pages > routes**. 

    Add your new route to the **spaRoutes** object.
    
    For the object key, remove forward slashes from the route and convert it to camelCase.

    For example, the route /MyNewRoute/IsAwesome would become:

   `myNewRouteIsAwesome: "/MyNewRoute/IsAwesome"`

2. Now we can start to configure the route. Navigate to **ts > constants > pages > pages**.

3. Create a **new instance of IPage** and using dot notation beneath the instantiation add the required properties as found on the class. 

    - Page **icons** can be found at **ts > constants > icons > icons*

   -  If the route you are creating is a **child of another route** use the property **parentRoute**, for example in the route /MyNewRoute/IsAwesome, record the parent's route on the IPage object:
      ```
      const myNewRouteIsAwesome = new IPage();
      myNewRouteIsAwesome.parentRoute = routes.myNewRoute;
      ```
    - If your page component expects **props** then these can be added here using the **partialProps** property:
      ```
      myNewRouteIsAwesome.partialProps.partialProps = {myPropName: myPropValue}
   - The class will programatically take anything that is stored as a query in your url and add it to the props as "queryString". So if you are using **url queries** they shouldn't be collected within the component but instead **your page component should have a queryString prop**.

 4. Now navigate to **Controllers > AppController** and add your route to the existing method: 
    ```
     [Route("PackageManager/Build")]
     [Route("ServiceDesk")]
     [Route("MyNewRoute/IsAwesome")]
     public IActionResult AdminIndex()
     {
         return ReturnViewWithUserSettings();
     } 

 5. Next go to **Controllers > AppAuthorisationController** creating a new Post method named the same as your spaRoute from route key, in task 1 above, but in Pascal case. Setup who has authorisation to view this page.
    ```
    [ULAuthorize(
        RoleTypes.SuperUser, 
        RoleTypes.Admin
    )]
    [HttpPost]
    public ActionResult MyNewRouteIsAwesome()
    {
        return Ok();
    }

6. Now all you have to do is setup the **navigation to your new route**. When the user interacts with the app to navigate to your new route it should call the url helper function **Helper.url.changeSPARoute()** found at _ts > helpers > helperFunctions_. 

   The first parameter should be the route and the second parameter should be any query you want to add to the url (this will then be passed to your page component as props called queryString).
   ```
   Helper.url.changeSPARoute(routes.myNewRouteIsAwesome, "query1=2&query2=3");
   ```
