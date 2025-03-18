export interface IRoutes {
  path: string;
  callBack: () => void;
}

export const Pages: { MAIN: string; PICKER: string; NOT_FOUND: string } = {
  MAIN: "app",
  PICKER: "decision-picker",
  NOT_FOUND: "not-found",
};

export class Router {
  private routes;

  constructor(routes: IRoutes[]) {
    this.routes = routes;

    document.addEventListener("DOMContentLoaded", () => {
      const path = this.getCurrentPath();
      this.navigate(path, false);
    });

    window.addEventListener("popstate", this.browserChangeHundler.bind(this));
  }

  public navigate(url: string, addToHistory: boolean = true) {
    if (url === "") {
      url = Pages.MAIN;
    }
    const route = this.routes.find((item) => item.path === url);
    if (!route) {
      this.redirectToNotFound();
    } else {
      route.callBack();
      if (addToHistory) {
        window.history.pushState({}, "", `#${url}`);
      }
    }
  }

  private redirectToNotFound(): void {
    const routeNotFound = this.routes.find(
      (item) => item.path === Pages.NOT_FOUND,
    );
    if (routeNotFound) {
      this.navigate(routeNotFound.path);
    }
  }

  private browserChangeHundler(): void {
    const path = this.getCurrentPath();
    this.navigate(path, false);
  }

  private getCurrentPath(): string {
    return window.location.pathname.slice(1) || Pages.MAIN;
  }
}
