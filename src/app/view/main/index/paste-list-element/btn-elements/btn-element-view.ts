import "./btn-paste-list.css";
import {
  BaseComponent,
  type BaseComponentParam,
} from "../../../../../../util/base-component";
import { ElementsChildren } from "../../../../../../util/elements-array-creator";
import { ButtonView } from "../../../../element-view/button-view";
import { LocalStoge } from "../../ul-elements/li-elements/localstoge/localstoge";
import { PasteListEventManager } from "./paste-list-event-manager/paste-list-event-manager";

const CssClasses: {
  cancelBtn: string[];
  confirmBtn: string[];
  pasteListWrap: string[];
} = {
  cancelBtn: ["paste-list_cancel"],
  confirmBtn: ["paste-list_confirm"],
  pasteListWrap: ["paste-list_wrapper"],
};

export class ButtonViewPasteList extends ElementsChildren {
  constructor(
    parentComponent: BaseComponent,
    textarea: HTMLElement | null,
    localstoge: LocalStoge,
  ) {
    super();
    this.appendElements(parentComponent, textarea, localstoge);
  }
  protected getElementsArr(): Array<HTMLElement | null> {
    return [];
  }

  private appendElements(
    parentComponent: BaseComponent,
    textarea: HTMLElement | null,
    localStoge: LocalStoge,
  ): void {
    const wrapperParam: BaseComponentParam = {
      classList: CssClasses.pasteListWrap,
    };
    const cancelBtnBaseParam: BaseComponentParam = {
      classList: CssClasses.cancelBtn,
      textContent: "Cancel",
    };
    const confirmBtnBaseParam: BaseComponentParam = {
      classList: CssClasses.confirmBtn,
      textContent: "Confirm",
    };
    const wrapEl: BaseComponent = new BaseComponent(wrapperParam);
    const cancelBtn: HTMLElement | null = new ButtonView(
      cancelBtnBaseParam,
    ).getHTMLElement();
    const confirmBtn: HTMLElement | null = new ButtonView(
      confirmBtnBaseParam,
    ).getHTMLElement();
    this.configView(
      parentComponent.getElement(),
      [cancelBtn, confirmBtn],
      textarea,
      localStoge,
    );
    if (cancelBtn && confirmBtn) {
      wrapEl.appendChildren([cancelBtn, confirmBtn]);
    }
    this.childArray.push(wrapEl.getElement());
  }

  private configView(
    parentEl: HTMLElement | null,
    btnElements: Array<HTMLElement | null>,
    textarea: HTMLElement | null,
    localStoge: LocalStoge,
  ): void {
    new PasteListEventManager(parentEl, btnElements, textarea, localStoge);
  }
}
