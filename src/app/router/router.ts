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
      this.navigate(path);
    });
    window.addEventListener("popstate", this.browserChangeHundler.bind(this));
    window.addEventListener("hashchange", this.browserChangeHundler.bind(this));
  }

  public navigate(url: string) {
    const route = this.routes.find((item) => item.path === url);
    if (!route) {
      this.redirectToNotFound();
      return;
    } else {
      route.callBack();
    }
  }

  private redirectToNotFound(): void {
    const routNotFound = this.routes.find(
      (item) => item.path === Pages.NOT_FOUND,
    );
    if (routNotFound) {
      this.navigate(routNotFound.path);
    }
  }

  private browserChangeHundler(): void {
    const path = this.getCurrentPath();
    this.navigate(path);
  }
  private getCurrentPath(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    } else {
      return window.location.pathname.slice(1);
    }
  }
}
