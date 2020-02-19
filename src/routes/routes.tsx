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
    new Route('/chapter/test', "test"),
];

export default Routes;