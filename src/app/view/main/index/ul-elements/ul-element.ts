import "./ul-index.css";
import { ElementsChildren } from "../../../../../util/elements-array-creator";
import {
  BaseComponent,
  type BaseComponentParam,
} from "../../../../../util/base-component";
import { ItemElements } from "./li-elements/item-elements";
import { LocalStoge } from "./li-elements/localstoge/localstoge";

const CssClasses: { indexUl: string[] } = {
  indexUl: ["index_ul"],
};

export class UlElement extends ElementsChildren {
  constructor(localStoge: LocalStoge) {
    super();
    this.childArray = this.createView(localStoge);
  }

  protected getElementsArr(): Array<HTMLElement | null> {
    return [];
  }

  protected createView(localStoge: LocalStoge): Array<HTMLElement | null> {
    const ulParam: BaseComponentParam = {
      tag: "ul",
      classList: CssClasses.indexUl,
    };
    const ulEl: HTMLElement | null = new BaseComponent(ulParam).getElement();
    const numItem: number = localStoge.getLocalStogeList().length;
    if (numItem > 0) {
      const items: Array<HTMLElement> = this.addChildren(numItem, localStoge);
      items.forEach((item) => {
        if (ulEl) {
          ulEl.append(item);
        }
      });
    } else if (ulEl) {
      const item: HTMLElement | null = new ItemElements(localStoge)
        .childArray[0];
      if (item) {
        ulEl.append(item);
      }
    }
    return [ulEl];
  }

  public addChildren(num: number, localStoge: LocalStoge): Array<HTMLElement> {
    const items: Array<HTMLElement> = ItemElements.addItemElementView(
      num,
      localStoge,
    );
    return items;
  }

  public static replaceItems(ulElement: HTMLElement | null, itemElements: HTMLElement[]) {

    if (ulElement) {
      while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild);
      }
      itemElements.forEach((el) => {
        ulElement.appendChild(el);
      });
    }
  }
}
