import "./main-view.css";
import {
  BaseComponent,
  type BaseComponentParam,
} from "../../../util/base-component";
import { View } from "../view";

const CssClasses: { main: string[]; main_wrapper: string[] } = {
  main: ["main"],
  main_wrapper: ["main_wrapper"],
};

export class MainView extends View {
  constructor() {
    const mainParam: BaseComponentParam = {
      tag: "main",
      classList: CssClasses.main,
    };
    super(mainParam);
  }

  public setContent(content: BaseComponent) {
    this.cleanMain();
    this.viewComponent.appendChildComponents([content]);
  }

  public cleanMain() {
    const mainEl: HTMLElement | null = this.viewComponent.getElement();
    if (mainEl) {
      while (mainEl.firstChild) {
        console.log(mainEl.firstChild);
        mainEl.firstChild.remove();
      }
      mainEl.innerHTML='';
    }
  }
}
