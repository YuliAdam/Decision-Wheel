import "./picker-main.css";
import {
  BaseComponent,
  type BaseComponentParam,
} from "../../../../util/base-component";
import { View } from "../../view";
import { LocalStoge } from "../index/ul-elements/li-elements/localstoge/localstoge";
import { ButtonPickerView } from "./buttons/button-view";
import { ResultPickerView } from "./picker-result/picker-result";
import { WheelPickerView } from "./picker-wheel/picker-wheel";
import { AudioView } from "./audio/audio";
import { Router } from "../../../router/router";
const CssClasses: { picker: string[] } = {
  picker: ["main_picker"],
};

export class PicherView extends View {
  private resultPickerView: BaseComponent;
  private buttonsChildView: BaseComponent;
  private wheelPickerView: BaseComponent;
  constructor(localStoge: LocalStoge, router: Router) {
    const pickerParam: BaseComponentParam = {
      classList: CssClasses.picker,
    };
    super(pickerParam);
    this.resultPickerView = new BaseComponent({});
    this.buttonsChildView = new BaseComponent({});
    this.wheelPickerView = new BaseComponent({});
    this.configComponent(localStoge, router);
  }

  private configComponent(localStoge: LocalStoge, router: Router) {
    const audio: AudioView = new AudioView();
    this.buttonsChildView = new ButtonPickerView(audio, router).viewComponent;
    this.resultPickerView = new ResultPickerView().viewComponent;
    this.wheelPickerView = new WheelPickerView(
      localStoge,
      this.resultPickerView,
    ).viewComponent;
    this.viewComponent.appendChildComponents([
      audio.viewComponent,
      this.buttonsChildView,
      this.resultPickerView,
      this.wheelPickerView,
    ]);
  }
}