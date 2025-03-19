import "./wrapper-picker.css";
import {
  BaseComponent,
  type BaseComponentParam,
} from "../../../../../util/base-component";
import { View } from "../../../view";
import { ButtonsPickerElements } from "./buttons-elements/buttonsElement";
import { StratPickerView } from "./start/picker-start-view";
import { AudioView } from "../audio/audio";
import { Router } from "../../../../router/router";
import { WheelPickerView } from "../picker-wheel/picker-wheel";

const CssClasses: {
  pickerWrapper: string[];
  btnWrapper: string[];
  block: string[];
} = {
  pickerWrapper: ["picker_wrapper"],
  btnWrapper: ["btn_wrapper"],
  block: ["block", "display-none"],
};

export class ButtonPickerView extends View {
  constructor(audio: AudioView, wheel: WheelPickerView, router: Router) {
    const btnpickerWrapperParam: BaseComponentParam = {
      classList: CssClasses.pickerWrapper,
    };
    super(btnpickerWrapperParam);
    this.configComponent(audio, wheel, router);
  }

  private configComponent(
    audio: AudioView,
    wheel: WheelPickerView,
    router: Router,
  ): void {
    const blockButtonWrapper: HTMLElement | null = new BaseComponent({
      classList: CssClasses.block,
    }).getElement();
    const btnWrapper: HTMLElement | null = new BaseComponent({
      classList: CssClasses.btnWrapper,
    }).getElement();
    const childArray: Array<HTMLElement | null> = new ButtonsPickerElements(
      audio,
      wheel,
      router,
    ).childArray;
    const startEl: HTMLElement | null = new StratPickerView(
      audio,
      wheel,
      blockButtonWrapper,
    ).viewComponent.getElement();
    if (btnWrapper && startEl && blockButtonWrapper) {
      childArray.forEach((el) => {
        if (el) {
          btnWrapper.append(el);
        }
      });
      this.viewComponent.appendChildren([
        btnWrapper,
        startEl,
        blockButtonWrapper,
      ]);
    }
  }
}
