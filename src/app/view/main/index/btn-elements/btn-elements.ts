import "./btn-index.css";
import {
  BaseComponent,
  type BaseComponentParam,
} from "../../../../../util/base-component";
import { ElementsChildren } from "../../../../../util/elements-array-creator";
import { ButtonView } from "../../../element-view/button-view";
import { UlElement } from "../ul-elements/ul-element";
import { BtnEventManager } from "../btn-event-manager/btn-event-manager";
import { LocalStoge } from "../ul-elements/li-elements/localstoge/localstoge";
import { Router } from "../../../../router/router";
import { DialogView } from "../main-dialog/main-dialog";

const CssClasses: { indexBtn: string[]; btn_wrap: string[] } = {
  indexBtn: ["index_btn"],
  btn_wrap: ["btn_wrap"],
};

const buttonsParams: {
  addBtnParams: BaseComponentParam;
  pasteBtnParams: BaseComponentParam;
  clearBtnParams: BaseComponentParam;
  saveBtnParams: BaseComponentParam;
  loadBtnParams: BaseComponentParam;
  startBtnParams: BaseComponentParam;
} = {
  addBtnParams: {
    classList: CssClasses.indexBtn,
    textContent: "Add Option",
    callback: () => {},
  },
  pasteBtnParams: {
    classList: CssClasses.indexBtn,
    textContent: "Paste List",
    callback: () => {},
  },
  clearBtnParams: {
    classList: CssClasses.indexBtn,
    textContent: "Clear List",
    callback: () => {},
  },
  saveBtnParams: {
    classList: CssClasses.indexBtn,
    textContent: "Save list to file",
    callback: () => {},
  },
  loadBtnParams: {
    classList: CssClasses.indexBtn,
    textContent: "Load list from file",
    callback: () => {},
  },
  startBtnParams: {
    classList: CssClasses.indexBtn,
    textContent: "Start",
    callback: () => {},
  },
};

export class BtnIndexElements extends ElementsChildren {
  constructor(ulComponent: UlElement, localStoge: LocalStoge, router: Router) {
    super();
    this.configComponents(this.childArray, ulComponent, localStoge, router);
  }

  protected getElementsArr(): Array<HTMLElement | null> {
    return this.createView();
  }

  protected createView(): Array<HTMLElement | null> {
    const addBtnEl: HTMLElement | null = new ButtonView(
      buttonsParams.addBtnParams,
    ).getHTMLElement();
    const pasteBtnEl: HTMLElement | null = new ButtonView(
      buttonsParams.pasteBtnParams,
    ).getHTMLElement();
    const clearBtnEl: HTMLElement | null = new ButtonView(
      buttonsParams.clearBtnParams,
    ).getHTMLElement();
    const saveBtnEl: HTMLElement | null = new ButtonView(
      buttonsParams.saveBtnParams,
    ).getHTMLElement();
    const loadBtnEl: HTMLElement | null = new ButtonView(
      buttonsParams.loadBtnParams,
    ).getHTMLElement();
    let wrapBtnEl: HTMLElement | null = null;
    if (saveBtnEl && loadBtnEl) {
      wrapBtnEl = this.wrapTwoBtn(saveBtnEl, loadBtnEl);
    }
    const startBtnEl: HTMLElement | null = new ButtonView(
      buttonsParams.startBtnParams,
    ).getHTMLElement();
    const dialogEl: HTMLElement | null = new DialogView().getHTMLElement();
    if (startBtnEl && dialogEl) {
      startBtnEl.append(dialogEl);
    }
    return [addBtnEl, pasteBtnEl, clearBtnEl, wrapBtnEl, startBtnEl];
  }

  private wrapTwoBtn(btn1: HTMLElement, btn2: HTMLElement): HTMLElement | null {
    const wrapDiv = new BaseComponent({ classList: CssClasses.btn_wrap });
    wrapDiv.appendChildren([btn1, btn2]);
    return wrapDiv.getElement();
  }

  private configComponents(
    childArray: Array<HTMLElement | null>,
    ulComponent: UlElement,
    localStoge: LocalStoge,
    router: Router,
  ) {
    new BtnEventManager(childArray, ulComponent, localStoge, router);
  }
}
