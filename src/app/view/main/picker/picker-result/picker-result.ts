import './picker-result.css'
import { type BaseComponentParam } from "../../../../../util/base-component";
import { View } from "../../../view";

const CssClasses: { result: string[] } = {
  result: ["picker_result"],
};

export class ResultPickerView extends View {
  constructor() {
    const resultPickerParam: BaseComponentParam = {
      tag: "p",
      classList: CssClasses.result,
      textContent: "PRESS START BUTTON",
    };
    super(resultPickerParam);
  }
}
