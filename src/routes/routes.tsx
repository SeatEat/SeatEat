class Route {
    path: string;
    name: string;
    constructor(path: string, name: string) {
        this.path = path;
        this.name = name;
    }
}

const Routes = [
    new Route('/chapter/META', "META"),
    new Route('/chapter/iStallet', "iStället"),
    new Route('/chapter/test1', "test"),
    new Route('/chapter/test2', "test"),
    new Route('/chapter/test3', "test"),
    new Route('/chapter/test4', "test"),
    new Route('/chapter/test5', "test"),
    new Route('/chapter/test6', "test"),
    new Route('/chapter/test7', "test"),
    new Route('/chapter/test8', "test"),
   
    
];

export const defaultRoute = Routes[0];

export default Routes;