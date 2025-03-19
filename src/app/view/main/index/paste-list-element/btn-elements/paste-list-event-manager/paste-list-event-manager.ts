import { ItemElements } from "../../../ul-elements/li-elements/item-elements";
import { IOption } from "../../../ul-elements/li-elements/item_view/item-children-view";
import { LocalStoge } from "../../../ul-elements/li-elements/localstoge/localstoge";
import { UlElement } from "../../../ul-elements/ul-element";

export class PasteListEventManager {
  private eventManager: {
    cancel: (
      parentEl: HTMLElement | null,
      el: HTMLElement,
      localStoge: LocalStoge,
    ) => void;
    confirm: (
      parentEl: HTMLElement | null,
      el: HTMLElement,
      textarea: HTMLElement | null,
      localStoge: LocalStoge,
    ) => void;
  } = {
    cancel: this.cancelBtnEvent,
    confirm: this.confirmBtnEvent,
  };

  constructor(
    parentEl: HTMLElement | null,
    btnElements: Array<HTMLElement | null>,
    textarea: HTMLElement | null,
    localStoge: LocalStoge,
  ) {
    this.addEvents(parentEl, btnElements, textarea, localStoge);
  }

  private addEvents(
    parentEl: HTMLElement | null,
    btnElements: Array<HTMLElement | null>,
    textarea: HTMLElement | null,
    localStoge: LocalStoge,
  ) {
    if (btnElements[0] && btnElements[1]) {
      this.eventManager.cancel(parentEl, btnElements[0], localStoge);
      this.eventManager.confirm(parentEl, btnElements[1], textarea, localStoge);
    }
    if (parentEl) {
      this.overClickEvent(parentEl, textarea, localStoge);
    }
  }

  private overClickEvent(
    element: HTMLElement,
    textarea: HTMLElement | null,
    localStoge: LocalStoge,
  ) {
    element.addEventListener("click", (e) => {
      if (e.target !== textarea) {
        PasteListEventManager.cancelPasteList(element, localStoge);
      }
    });
  }

  private cancelBtnEvent(
    parentEl: HTMLElement | null,
    cancelBtn: HTMLElement,
    localStoge: LocalStoge,
  ) {
    cancelBtn.addEventListener("click", () => {
      PasteListEventManager.cancelPasteList(parentEl, localStoge);
    });
  }

  private static cancelPasteList(
    parentEl: HTMLElement | null,
    localStoge: LocalStoge,
  ) {
    if (parentEl && localStoge) {
      parentEl.remove();
      document.body.classList.remove("overflow-hidden");
    }
  }

  private confirmBtnEvent(
    parentEl: HTMLElement | null,
    confirmBtn: HTMLElement,
    textarea: HTMLElement | null,
    localStoge: LocalStoge,
  ) {
    confirmBtn.addEventListener("click", () => {
      if (textarea instanceof HTMLTextAreaElement) {
        const newArr: IOption[] =
          PasteListEventManager.validateTextarea(textarea);
        if (newArr.length !== 0) {
          localStoge.writeInLocalStoge(newArr);
          if (parentEl) {
            const ul: Node | null = parentEl.nextSibling;
            if (ul instanceof HTMLElement) {
              const itemElements: Array<HTMLElement> =
                ItemElements.addItemElementView(newArr.length, localStoge);
              UlElement.replaceItems(ul, itemElements);
            }
          }
        }
      }
      if (parentEl) {
        parentEl.classList.add("display-none");
        document.body.classList.remove("overflow-hidden");
      }
      PasteListEventManager.cancelPasteList(parentEl, localStoge);
    });
  }

  private static validateTextarea(textarea: HTMLTextAreaElement): IOption[] {
    const lineArr: string[] = textarea.value.split("\n");
    const newArr: Array<IOption> = [];
    let idCounter = 0;
    lineArr.filter((str) => {
      const index: number = str.lastIndexOf(",");
      if (index !== -1) {
        const widthStr: string = str.substring(index + 1).trim();
        if (typeof +widthStr === "number" || widthStr === "") {
          const titleStr: string = str.substring(0, index).trim();
          idCounter++;
          newArr.push({
            id: idCounter,
            option: titleStr,
            weight: widthStr,
          });
          return true;
        }
      }
      return false;
    });
    return newArr;
  }
}
