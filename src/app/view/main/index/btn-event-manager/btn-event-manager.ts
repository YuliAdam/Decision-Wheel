import { LocalStoge } from "../ul-elements/li-elements/localstoge/localstoge";
import { UlElement } from "../ul-elements/ul-element";
import { ItemElements } from "../ul-elements/li-elements/item-elements";
import { IOption } from "../ul-elements/li-elements/item_view/item-children-view";
import { Router } from "../../../../router/router";

export class BtnEventManager {
  constructor(
    childArray: Array<HTMLElement | null>,
    ulComponent: UlElement,
    localStoge: LocalStoge,
    router: Router,
  ) {
    this.addEvents(childArray, ulComponent, localStoge, router);
  }

  private eventManager: {
    addBtn: (
      component: HTMLElement | null,
      ulComponent: UlElement,
      localStoge: LocalStoge,
      route: Router,
    ) => void;
    pasteBtn: (
      component: HTMLElement | null,
      ulComponent: UlElement,
      localStoge: LocalStoge,
      route: Router,
    ) => void;
    clearBtn: (
      component: HTMLElement | null,
      ulComponent: UlElement,
      localStoge: LocalStoge,
      route: Router,
    ) => void;
    saveBtn: (
      component: HTMLElement | null,
      ulComponent: UlElement,
      localStoge: LocalStoge,
      route: Router,
    ) => void;
    loadBtn: (
      component: HTMLElement | null,
      ulComponent: UlElement,
      localStoge: LocalStoge,
      route: Router,
    ) => void;
    startBtn: (
      component: HTMLElement | null,
      ulComponent: UlElement,
      localStoge: LocalStoge,
      route: Router,
    ) => void;
  } = {
    addBtn: this.addBtnEvent,
    pasteBtn: this.pasteListBtnEvent,
    clearBtn: this.clearBtnEvent,
    saveBtn: this.saveInFileEvent,
    loadBtn: this.loadFromFileEvent,
    startBtn: this.startBtnEvent,
  };

  private addEvents(
    childArray: Array<HTMLElement | null>,
    ulComponent: UlElement,
    localStoge: LocalStoge,
    router: Router,
  ) {
    const elementArray: (HTMLElement | null)[] = childArray.slice();
    if (childArray[3]) {
      const saveBtn = childArray[3].children[0];
      const loadBtn = childArray[3].children[1];
      if (saveBtn instanceof HTMLElement && loadBtn instanceof HTMLElement)
        elementArray.splice(3, 1, saveBtn, loadBtn);
    }
    elementArray.forEach((el, i) => {
      Object.values(this.eventManager)[i](el, ulComponent, localStoge, router);
    });
  }

  private addBtnEvent(
    component: HTMLElement | null,
    ulComponent: UlElement,
    localStoge: LocalStoge,
    router: Router,
  ) {
    if (component && router) {
      component.addEventListener("click", () => {
        const newItem: HTMLElement | null = new ItemElements(localStoge)
          .childArray[0];
        if (newItem && ulComponent.childArray[0]) {
          newItem.classList.add("opacity");
          ulComponent.childArray[0].append(newItem);
          setTimeout(() => newItem.classList.remove("opacity"), 250);
        }
      });
    }
  }
  private clearBtnEvent(
    component: HTMLElement | null,
    ulComponent: UlElement,
    localStoge: LocalStoge,
    router: Router,
  ) {
    if (component && router) {
      component.addEventListener("click", () => {
        localStoge.clear();
        if (ulComponent.childArray[0]) {
          ulComponent.childArray[0].classList.add("opacity");
          setTimeout(() => {
            if (ulComponent.childArray[0]) {
              ulComponent.childArray[0].replaceChildren();
              ulComponent.childArray[0].classList.remove("opacity");
            }
          }, 250);
        }
      });
    }
  }

  private pasteListBtnEvent(
    component: HTMLElement | null,
    ulComponent: UlElement,
    localStoge: LocalStoge,
    router: Router,
  ) {
    if (component && router && localStoge) {
      component.addEventListener("click", () => {
        const modal: ChildNode | null =
          ulComponent.childArray[0]?.previousSibling ?? null;
        if (modal instanceof HTMLElement) {
          document.body.classList.add("overflow-hidden");
          modal.classList.remove("display-none");
        }
      });
    }
  }

  private saveInFileEvent(
    component: HTMLElement | null,
    ulComponent: UlElement,
    localStoge: LocalStoge,
    router: Router,
  ) {
    const FILE_NAME: string = "option-list.json";
    if (component && router && localStoge && ulComponent) {
      component.addEventListener("click", () => {
        const a: HTMLAnchorElement = document.createElement("a");
        const text: string = localStoge.getLocalStogeTextFile();
        const file: Blob = new Blob([text], { type: "aplication/json" });
        a.href = URL.createObjectURL(file);
        a.download = FILE_NAME;
        a.click();
      });
    }
  }

  private loadFromFileEvent(
    component: HTMLElement | null,
    ulComponent: UlElement,
    localStoge: LocalStoge,
    router: Router,
  ) {
    if (component && router && component instanceof HTMLButtonElement) {
      component.addEventListener("click", () => {
        const form = document.createElement("form");
        form.method = "post";
        const input = document.createElement("input");
        form.append(input);
        input.type = "file";
        input.id = "files";
        input.formMethod = "post";
        input.addEventListener("change", (e) => {
          if (e.target instanceof HTMLInputElement && e.target.files) {
            BtnEventManager.readFile(
              e.target.files[0],
              ulComponent,
              localStoge,
            );
          }
        });
        input.click();
      });
    }
  }

  private static readFile(file: File, ul: UlElement, localStoge: LocalStoge) {
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = () =>
      BtnEventManager.createItemView(reader.result, ul, localStoge);
    reader.onerror = () => console.log(reader.error);
  }

  private static createItemView(
    str: string | ArrayBuffer | null,
    ul: UlElement,
    localStoge: LocalStoge,
  ) {
    if (str) {
      const strInObj: { list: IOption[]; lastId: number } = JSON.parse(
        str.toString(),
      );
      localStoge.writeInLocalStoge(strInObj.list);
      const items: HTMLElement[] = ItemElements.addItemElementView(
        strInObj.list.length,
        localStoge,
      );
      UlElement.replaceItems(ul.childArray[0], items);
    }
  }

  private startBtnEvent(
    el: HTMLElement | null,
    ulComponent: UlElement,
    localStoge: LocalStoge,
    router: Router,
  ) {
    if (el && ulComponent && localStoge) {
      el.addEventListener("click", () => {
        console.log("show");
        const list: IOption[] = localStoge.validateOption();
        if (list.length > 1) {
          router.navigate("decision-picker");
        } else {
          const dialog = el.children[0];
          if (dialog) {
            const dialog: Element = el.children[0];
            if (
              dialog instanceof HTMLDialogElement &&
              !dialog.classList.contains("open")
            ) {
              console.log("show1");
              dialog.showModal();
            }
          }
        }
      });
    }
  }
}
