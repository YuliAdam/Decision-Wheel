import {
  type AditionalParam,
  type BaseComponentParam,
} from "../../../util/base-component";
import { View } from "../view";

export class InputView extends View {
  constructor(param: BaseComponentParam, aditionalParam: AditionalParam) {
    const inputParam: BaseComponentParam = {
      tag: "input",
      classList: param.classList,
      callback: (e: Event) => e.preventDefault(),
    };
    const inputAditionalParam: AditionalParam = {
      placeholder: aditionalParam.placeholder,
    };
    super(inputParam, inputAditionalParam);
  }
  protected configView(): void {}

  public getValue() {
    const inputEl = this.viewComponent.getElement();
    let value = "";
    if (
      this.viewComponent.getElement() &&
      inputEl instanceof HTMLInputElement
    ) {
      value = inputEl.value;
    }
    return value;
  }
  public setValue(value: string) {
    const inputEl = this.viewComponent.getElement();
    if (
      this.viewComponent.getElement() &&
      inputEl instanceof HTMLInputElement
    ) {
      inputEl.value = value;
    }
  }
}
