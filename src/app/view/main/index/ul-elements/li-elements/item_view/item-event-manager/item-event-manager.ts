import { BaseComponent } from "../../../../../../../../util/base-component";
import { LocalStoge } from "../../localstoge/localstoge";

interface IItemElements {
  id: BaseComponent;
  title: BaseComponent;
  weight: BaseComponent;
  delete: BaseComponent;
}

export class ItemEventManager {
  private eventManager: {
    id: [];
    title: Array<
      (
        component: BaseComponent,
        localStoge: LocalStoge,
        itemElements: IItemElements,
      ) => void
    >;
    weight: Array<
      (
        component: BaseComponent,
        localStoge: LocalStoge,
        itemElements: IItemElements,
      ) => void
    >;
    delete: Array<
      (
        component: BaseComponent,
        localStoge: LocalStoge,
        itemElements: IItemElements,
      ) => void
    >;
  } = {
    id: [],
    title: [this.keyupInputTitle],
    weight: [this.keydownInputWeight],
    delete: [this.deleteBtnEvent],
  };

  constructor(itemElements: IItemElements, localStoge: LocalStoge) {
    this.addEventListener(itemElements, localStoge);
  }

  private addEventListener(elementNav: IItemElements, localStoge: LocalStoge) {
    Object.values(elementNav).forEach((component, index) => {
      Object.values(this.eventManager)[index].forEach((f) =>
        f(component, localStoge, elementNav),
      );
    });
  }

  private keydownInputWeight(
    component: BaseComponent,
    localStoge: LocalStoge,
    itemElements: IItemElements,
  ): void {
    const numArr: string[] = [
      "Backspace",
      "F1",
      "Shift",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    component.addComponentEventListener("keydown", (e) => {
      if (e instanceof KeyboardEvent) {
        if (!numArr.includes(e.key)) {
          e.preventDefault();
        } else if (![numArr[0], numArr[1], numArr[2]].includes(e.key)) {
          const inputElement: HTMLElement | null = component.getElement();
          if (inputElement && inputElement instanceof HTMLInputElement) {
            const newWeigth: string = inputElement.value + e.key;
            const itemId: number | null = ItemEventManager.getId(itemElements);
            if (itemId) {
              localStoge.redactOption(itemId, { weight: newWeigth });
            }
          }
        }
      }
    });
  }

  private deleteBtnEvent(
    component: BaseComponent,
    localStoge: LocalStoge,
    itemElements: IItemElements,
  ): void {
    const waitTime = 250;
    component.addComponentEventListener("click", () => {
      const itemId: number | null = ItemEventManager.getId(itemElements);
      if (itemId) {
        localStoge.deleteOptionFromList(itemId);
      }
      const itemWrap: HTMLElement | null = component.getParentComponent();
      let item: HTMLElement | null = null;
      if (itemWrap) {
        item = itemWrap.parentElement;
      }
      if (item) {
        item.classList.add("opacity");
        setTimeout(() => item.remove(), waitTime);
      }
    });
  }

  private keyupInputTitle(
    component: BaseComponent,
    localStoge: LocalStoge,
    itemElements: IItemElements,
  ): void {
    component.addComponentEventListener("keyup", (e) => {
      if (e instanceof KeyboardEvent) {
        const inputElement: EventTarget | null = e.target;
        if (inputElement && inputElement instanceof HTMLInputElement) {
          const newTitle: string = inputElement.value;
          const itemId: number | null = ItemEventManager.getId(itemElements);
          if (itemId) {
            localStoge.redactOption(itemId, { title: newTitle });
          }
        }
      }
    });
  }

  private static getId(itemElements: IItemElements): number | null {
    const componentId: HTMLElement | null = itemElements.id.getElement();
    if (componentId) {
      const textId: string | null = componentId.children[0].textContent;
      if (textId) {
        return parseInt(textId.substring(1));
      }
    }
    return null;
  }
}
