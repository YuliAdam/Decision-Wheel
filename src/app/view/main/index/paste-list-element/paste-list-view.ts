import "./paste-list-index.css";
import { View } from "../../../view";
import {
  BaseComponent,
  type BaseComponentParam,
} from "../../../../../util/base-component";
import { LocalStoge } from "../ul-elements/li-elements/localstoge/localstoge";
import { ButtonViewPasteList } from "./btn-elements/btn-element-view";
import { TextArea } from "./textarea-element/textarea-view";

const CssClasses: {
  overflow: string[];
  pasteList: string[];
} = {
  overflow: ["index_overflow"],
  pasteList: ["index_paste-list"],
};

export class PasteListView extends View {
  constructor(localStoge: LocalStoge) {
    const overflowDiv: BaseComponentParam = {
      classList: CssClasses.overflow,
    };
    super(overflowDiv);
    this.configView(localStoge);
  }

  protected configView(localStoge: LocalStoge): void {
    const pasteList = new BaseComponent({ classList: CssClasses.pasteList });
    this.appendChilren(pasteList, localStoge);
    this.viewComponent.appendChildComponents([pasteList]);
  }

  private appendChilren(component: BaseComponent, localStoge: LocalStoge) {
    const textarea: HTMLElement | null =
      new TextArea().viewComponent.getElement();
    const componentEl: HTMLElement | null = component.getElement();
    const btnComponent: HTMLElement | null = new ButtonViewPasteList(
      this.viewComponent,
      textarea,
      localStoge,
    ).childArray[0];
    if (componentEl && textarea && btnComponent) {
      componentEl.append(textarea, btnComponent);
    }
  }
}
