import type { BaseComponentParam } from "../../../util/base-component";
import { View } from "../view";

export class ButtonView extends View {
  constructor(param: BaseComponentParam) {
    const btnParam: BaseComponentParam = {
      tag: "button",
      classList: param.classList,
      textContent: param.textContent,
      callback: param.callback,
    };
    super(btnParam);
  }
  protected configView(): void {}
}
