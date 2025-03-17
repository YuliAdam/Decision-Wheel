import "./footer-view.css";
import type { BaseComponentParam } from "../../../util/base-component";
import { BaseComponent } from "../../../util/base-component";
import { View } from "../view";
import { LinkElements } from "./link-elements/link-elements.ts";

const CssClasses: { footer: string[]; p: string[] } = {
  footer: ["footer"],
  p: ["footer_title"],
};

export class FooterView extends View {
  constructor() {
    const footerParam: BaseComponentParam = {
      tag: "footer",
      classList: CssClasses.footer,
    };
    super(footerParam);
    this.configView();
  }

  private static createChildrenElements(): Array<HTMLElement | null> {
    const h1Param: BaseComponentParam = {
      tag: "p",
      textContent: "/2025",
      classList: CssClasses.p,
    };
    const h1El: HTMLElement | null = new BaseComponent(h1Param).getElement();
    const childrenLinks: Array<HTMLElement | null> = new LinkElements()
      .childArray;
    childrenLinks.splice(2, 0, h1El);
    return childrenLinks;
  }

  protected configView(): void {
    const childrenEl: Array<HTMLElement | null> =
      FooterView.createChildrenElements();
    childrenEl.forEach((el) => {
      if (el) {
        this.viewComponent.appendChildren([el]);
      }
    });
  }
}
