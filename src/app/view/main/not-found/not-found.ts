import "./not-found.css";
import {
  BaseComponent,
  BaseComponentParam,
} from "../../../../util/base-component";
import { ButtonView } from "../../element-view/button-view";
import { View } from "../../view";
import { Router } from "../../../router/router";

const CssClasses: { notFound: string[]; text: string[]; back: string[] } = {
  notFound: ["main_not-found"],
  text: ["not-found_text"],
  back: ["not-found_back"],
};

const TEXT_NOT_FOUND = "PAGE NOT FOUND";

export class NotFoundView extends View {
  constructor(router: Router) {
    const notFoundParam: BaseComponentParam = {
      classList: CssClasses.notFound,
    };
    super(notFoundParam);
    this.configComponent(router);
  }

  private configComponent(router: Router) {
    this.createText();
    this.createBackBtn(router);
  }

  private createText() {
    const textParam: BaseComponentParam = {
      classList: CssClasses.text,
      textContent: TEXT_NOT_FOUND,
    };
    const text: HTMLElement | null = new BaseComponent(textParam).getElement();
    const notFoundText: HTMLElement | null = this.viewComponent.getElement();
    if (text && notFoundText) {
      notFoundText.append(text);
    }
  }

  private createBackBtn(router: Router) {
    const backBtnParam: BaseComponentParam = {
      classList: CssClasses.back,
      textContent: "Back to main page",
    };
    const backBtn: HTMLElement | null = new ButtonView(
      backBtnParam,
    ).viewComponent.getElement();
    const notFoundEl: HTMLElement | null = this.viewComponent.getElement();
    if (notFoundEl && backBtn) {
      this.addEventBackMain(router, notFoundEl);
      notFoundEl.append(backBtn);
    }
  }

  private addEventBackMain(router: Router, el: HTMLElement) {
    el.addEventListener("click", () => router.navigate("app"));
  }
}
