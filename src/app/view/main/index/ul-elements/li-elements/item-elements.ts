import "./item-ul.css";
import { ElementsChildren } from "../../../../../../util/elements-array-creator";
import {
  BaseComponent,
  type BaseComponentParam,
} from "../../../../../../util/base-component";
import { IOption, ItemChildrenView } from "./item_view/item-children-view";
import { LocalStoge } from "./localstoge/localstoge";

const CssClasses: { ul_item: string[]; item_wrap: string[] } = {
  ul_item: ["ul_item"],
  item_wrap: ["item_wrap"],
};

export class ItemElements extends ElementsChildren {
  constructor(localStoge: LocalStoge) {
    super();
    this.configNewComponent(this.childArray, localStoge);
  }

  protected getElementsArr(): Array<HTMLElement | null> {
    return this.createView();
  }

  public createView(): Array<HTMLElement | null> {
    const itemParam: BaseComponentParam = {
      tag: "li",
      classList: CssClasses.ul_item,
    };
    const itemEl: HTMLElement | null = new BaseComponent(
      itemParam,
    ).getElement();
    return [itemEl];
  }

  public static addItemElementView(
    num: number,
    localStoge: LocalStoge,
  ): HTMLElement[] {
    const itemParam: BaseComponentParam = {
      tag: "li",
      classList: CssClasses.ul_item,
    };
    const optionList: IOption[] = localStoge.getLocalStogeList();
    const elArr: HTMLElement[] = [];
    for (let i = 0; i < num; i++) {
      const itemEl: HTMLElement | null = new BaseComponent(
        itemParam,
      ).getElement();
      if (itemEl) {
        this.configComponentsFromLocalStoge(itemEl, optionList[i], localStoge);
        elArr.push(itemEl);
      }
    }
    return elArr;
  }

  private static configComponentsFromLocalStoge(
    item: HTMLElement,
    option: IOption,
    localStoge: LocalStoge,
  ): void {
    const itemWrap: HTMLElement | null = new BaseComponent({
      classList: CssClasses.item_wrap,
    }).getElement();
    const itemChildren: Array<HTMLElement | null> = new ItemChildrenView(
      option,
      localStoge,
    ).childArray;
    if (item && itemWrap) {
      itemChildren.forEach((element) => {
        if (element) {
          itemWrap.append(element);
        }
      });
      item.append(itemWrap);
    }
  }

  private configNewComponent(
    array: Array<HTMLElement | null>,
    localStoge: LocalStoge,
  ) {
    localStoge.writeNewOption();
    const newOption: IOption = {
      id: localStoge.getLocalStogeLastId() ?? 1,
      option: "",
      weight: '',
    };
    const item: HTMLElement | null = array[0];
    const itemWrap: HTMLElement | null = new BaseComponent({
      classList: CssClasses.item_wrap,
    }).getElement();
    const itemChildren: Array<HTMLElement | null> = new ItemChildrenView(
      newOption,
      localStoge,
    ).childArray;
    if (itemWrap && item) {
      itemChildren.forEach((item) => {
        if (item) {
          itemWrap.append(item);
        }
      });
      item.append(itemWrap);
    }
  }
}
