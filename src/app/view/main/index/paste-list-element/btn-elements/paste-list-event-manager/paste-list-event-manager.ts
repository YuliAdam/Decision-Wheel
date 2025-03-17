import { ItemElements } from "../../../ul-elements/li-elements/item-elements";
import { IOption } from "../../../ul-elements/li-elements/item_view/item-children-view";
import { LocalStoge } from "../../../ul-elements/li-elements/localstoge/localstoge";
import { UlElement } from "../../../ul-elements/ul-element";

export class PasteListEventManager {
  private eventManager: {
    cancel: (
      parentEl: HTMLElement | null,
      el: HTMLElement,
      textarea: HTMLElement | null,
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
    btnElements.forEach((el, i) => {
      if (el) {
        Object.values(this.eventManager)[i](parentEl, el, textarea, localStoge);
      }
    });
  }

  private cancelBtnEvent(
    parentEl: HTMLElement | null,
    cancelBtn: HTMLElement,
    textarea: HTMLElement | null,
    localStoge: LocalStoge,
  ) {
    cancelBtn.addEventListener("click", () => {
      if (parentEl && localStoge) {
        parentEl.classList.add("display-none");
        document.body.classList.remove("overflow-hidden");
      }
      PasteListEventManager.cancelTexareaValue(textarea);
    });
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
      PasteListEventManager.cancelTexareaValue(textarea);
    });
  }
  public static cancelTexareaValue(textarea: HTMLElement | null): void {
    if (textarea && textarea instanceof HTMLTextAreaElement) {
      textarea.value = "";
    }
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
