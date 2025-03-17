import "./item-children.css";
import {
  type AditionalParam,
  BaseComponent,
  type BaseComponentParam,
} from "../../../../../../../util/base-component";
import { ElementsChildren } from "../../../../../../../util/elements-array-creator";
import { InputView } from "../../../../../element-view/input-view";
import { ButtonView } from "../../../../../element-view/button-view";
import { ItemEventManager } from "./item-event-manager/item-event-manager";
import { LocalStoge } from "../localstoge/localstoge";

export interface IOption {
  id: number;
  option: string;
  weight: string;
}

const CssClasses: {
  item_id: string[];
  id_text: string[];
  item_title: string[];
  item_weight: string[];
  item_delete: string[];
} = {
  item_id: ["item_id"],
  id_text: ["id_text"],
  item_title: ["item_title"],
  item_weight: ["item_weight"],
  item_delete: ["item_delete"],
};

export class ItemChildrenView extends ElementsChildren {
  constructor(option: IOption, localStoge: LocalStoge) {
    super();
    this.createView(option, localStoge);
  }

  protected getElementsArr(): Array<HTMLElement> {
    return [];
  }

  protected createView(option: IOption, localStoge: LocalStoge): void {
    const idInputParam: BaseComponentParam = {
      classList: CssClasses.item_id,
    };
    const idInputView: BaseComponent = new BaseComponent(idInputParam);
    const pId: BaseComponentParam = {
      tag: "p",
      textContent: `#${option.id}`,
      classList: CssClasses.id_text,
    };
    idInputView.appendChildComponents([new BaseComponent(pId)]);
    const inputTitleParam: BaseComponentParam = {
      classList: CssClasses.item_title,
    };
    const inputTitleAditionalParam: AditionalParam = {
      placeholder: "Title",
    };
    const inputTitle: InputView = new InputView(
      inputTitleParam,
      inputTitleAditionalParam,
    );
    inputTitle.setValue(option.option);
    const inputWeightParam: BaseComponentParam = {
      classList: CssClasses.item_weight,
    };
    const inputWeightAditionalParam: AditionalParam = {
      placeholder: "Weight",
    };
    const inputWeight: InputView = new InputView(
      inputWeightParam,
      inputWeightAditionalParam,
    );
    inputWeight.setValue(option.weight);
    const deleteBtnParam: BaseComponentParam = {
      classList: CssClasses.item_delete,
      textContent: "Delete",
    };
    const deleteBtn: ButtonView = new ButtonView(deleteBtnParam);

    const elementNav: {
      id: BaseComponent;
      title: BaseComponent;
      weight: BaseComponent;
      delete: BaseComponent;
    } = {
      id: idInputView,
      title: inputTitle.viewComponent,
      weight: inputWeight.viewComponent,
      delete: deleteBtn.viewComponent,
    };

    const childViewArray: Array<HTMLElement | null> = [
      idInputView.getElement(),
      inputTitle.getHTMLElement(),
      inputWeight.getHTMLElement(),
      deleteBtn.getHTMLElement(),
    ];
    this.configComponents(elementNav, localStoge);
    childViewArray.forEach((el) => {
      this.childArray.push(el);
    });
  }

  private configComponents(
    elementNav: {
      id: BaseComponent;
      title: BaseComponent;
      weight: BaseComponent;
      delete: BaseComponent;
    },
    localStoge: LocalStoge,
  ) {
    new ItemEventManager(elementNav, localStoge);
  }
}
