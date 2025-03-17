import "./index-main.css";
import { View } from "../../view";
import { LocalStoge } from "./ul-elements/li-elements/localstoge/localstoge";
import { PasteListView } from "./paste-list-element/paste-list-view";
import { UlElement } from "./ul-elements/ul-element";
import { BtnIndexElements } from "./btn-elements/btn-elements";
import { Router } from "../../../router/router";

const CssClasses: { index: string[] } = {
  index: ["main_index"],
};

export class IndexView extends View {
  constructor(localStoge: LocalStoge, router: Router) {
    const indexParam = { classList: CssClasses.index };
    super(indexParam);
    this.configComponent(localStoge, router);
  }

  private configComponent(localStoge: LocalStoge, router: Router): void {
    const pasteListEl: HTMLElement | null = new PasteListView(
      localStoge,
    ).getHTMLElement();
    if (pasteListEl) {
      this.viewComponent.appendChildren([pasteListEl]);
    }
    const childUl: UlElement = new UlElement(localStoge);
    childUl.childArray.forEach((el) => {
      if (el) {
        this.viewComponent.appendChildren([el]);
      }
    });
    const childrenBtns: Array<HTMLElement | null> = new BtnIndexElements(
      childUl,
      localStoge,
      router,
    ).childArray;
    childrenBtns.forEach((el) => {
      if (el) {
        this.viewComponent.appendChildren([el]);
      }
    });
  }
}
