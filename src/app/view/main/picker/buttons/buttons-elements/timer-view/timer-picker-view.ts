import './timer-picker.css'
import {
  AditionalParam,
  BaseComponent,
  BaseComponentParam,
} from "../../../../../../../util/base-component";
import { ImgView } from "../../../../../element-view/img-view";
import { InputView } from "../../../../../element-view/input-view";
import { View } from "../../../../../view";

const CssClasses: {
  timerWrapper: string[];
  timerImg: string[];
  timerInput: string[];
} = {
  timerWrapper: ["picker_timer-wrapper"],
  timerImg: ["timer_img"],
  timerInput: ["timer_input"],
};
const INIT_TIMER: number = 15;

export class TimerPickerView extends View {
  constructor() {
    const timerWrapper: BaseComponentParam = {
      classList: CssClasses.timerWrapper,
    };
    super(timerWrapper);
    this.configView();
  }

  protected configView(): void {
    const timerElements: Array<BaseComponent> = this.createElements();
    this.viewComponent.appendChildComponents(timerElements);
  }

  private createElements(): Array<BaseComponent> {
    const timerImgBaseParam: BaseComponentParam = {
      classList: CssClasses.timerImg,
    };
    const timerImgAditionalParam: AditionalParam = {
      src: "timer.svg",
      alt: "timer",
    };
    const timerImg = new ImgView(timerImgBaseParam, timerImgAditionalParam);

    const timerInputBaseParam: BaseComponentParam = {
      classList: CssClasses.timerInput,
    };
    const timerInputAditionalParam: AditionalParam = {
      placeholder: "Time",
    };
    const timerInput = new InputView(
      timerInputBaseParam,
      timerInputAditionalParam,
    );
    timerInput.setValue(`${INIT_TIMER}`);
    return [timerImg.viewComponent, timerInput.viewComponent];
  }
}
