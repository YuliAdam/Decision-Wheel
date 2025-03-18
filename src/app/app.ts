import { FooterView } from "./view/footer/footer-view";
import { HeaderView } from "./view/header/header-view";
import { MainView } from "./view/main/main-view";
import { LocalStoge } from "./view/main/index/ul-elements/li-elements/localstoge/localstoge";
import { IndexView } from "./view/main/index/index-view";
import { PicherView } from "./view/main/picker/picker-view";
import { Pages, Router, type IRoutes } from "./router/router";
import { NotFoundView } from "./view/main/not-found/not-found";

export class App {
  private main: MainView | null;
  private index: IndexView | null;
  private router: Router;
  private localStoge: LocalStoge;
  constructor() {
    this.main = null;
    this.index = null;
    this.localStoge = new LocalStoge();
    this.router = new Router(this.createRoutes());
    this.createView(this.localStoge, this.router);
  }
  private createView(localStoge: LocalStoge, router: Router): void {
    const headerView: HTMLElement | null = new HeaderView().getHTMLElement();
    this.index = new IndexView(localStoge, router);
    this.main = new MainView();
    const footerView: HTMLElement | null = new FooterView().getHTMLElement();
    if(this.main.getHTMLElement()){
      App.appendElements([headerView, this.main.getHTMLElement(), footerView]);
    }
  }

  private static appendElements(el: Array<HTMLElement | null>): void {
    el.forEach((e) => {
      if (e instanceof Node) {
        console.log(e)
        document.body.append(e);
      }
    });
  }

  private createRoutes(): IRoutes[] {
    return [
      {
        path: Pages.MAIN,
        callBack: () => {
          if (this.main && this.index) {
            this.main.setContent(this.index.viewComponent);
          }
        },
      },
      {
        path: Pages.PICKER,
        callBack: () => {
          console.log('picker')
          if (this.main) {
            this.main.setContent(new PicherView(this.localStoge, this.router).viewComponent);
          }
         
        },
      },
      {
        path: "",
        callBack: () => {
          if (this.main && this.index) {
            this.main.setContent(this.index.viewComponent);
          }
        },
      },
      {
        path: Pages.NOT_FOUND,
        callBack: () => {
          if (this.main && this.index) {
            this.main.setContent(new NotFoundView().viewComponent);
          }
        },
      },
    ];
  }
}
