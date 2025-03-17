import "./header-view.css";
import { BaseComponent } from "../../../util/base-component";
import type { BaseComponentParam } from "../../../util/base-component";
import { View } from "../view";

const CssClasses = {
  header: ["header"],
  h1: ["header_title"],
};

const TITLE_TEXT: string = "Decision Making Tool";

export class HeaderView extends View {
  constructor() {
    const headerParam: BaseComponentParam = {
      tag: "header",
      classList: CssClasses.header,
    };
    super(headerParam);
    this.configView();
  }

  protected configView(): void {
    const h1Param: BaseComponentParam = {
      tag: "h1",
      textContent: TITLE_TEXT,
      classList: CssClasses.h1,
    };
    this.viewComponent.appendChildComponents([new BaseComponent(h1Param)]);
  }
}
