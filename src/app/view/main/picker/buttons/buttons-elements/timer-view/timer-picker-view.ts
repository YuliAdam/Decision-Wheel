import "./timer-picker.css";
import {
  AditionalParam,
  BaseComponent,
  BaseComponentParam,
} from "../../../../../../../util/base-component";
import { ImgView } from "../../../../../element-view/img-view";
import { InputView } from "../../../../../element-view/input-view";
import { View } from "../../../../../view";
import { WheelPickerView } from "../../../picker-wheel/picker-wheel";

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
const MIN_TIMER: number = 5;

export class TimerPickerView extends View {
  constructor(wheel: WheelPickerView) {
    const timerWrapper: BaseComponentParam = {
      classList: CssClasses.timerWrapper,
    };
    super(timerWrapper);
    this.configView(wheel);
  }

  protected configView(wheel: WheelPickerView): void {
    const timerElements: Array<BaseComponent> = this.createElements(wheel);
    this.viewComponent.appendChildComponents(timerElements);
  }

  private createElements(wheel: WheelPickerView): Array<BaseComponent> {
    const timerImgBaseParam: BaseComponentParam = {
      classList: CssClasses.timerImg,
    };
    const timerImgAditionalParam: AditionalParam = {
      src: "timer.svg",
      alt: "timer",
    };
    const timerImg = new ImgView(timerImgBaseParam, timerImgAditionalParam);

    const timerFormBaseParam: BaseComponentParam = {
      tag: "form",
    };

    const timerFormInput = new BaseComponent(timerFormBaseParam);

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
    const timerInputEl = timerInput.getHTMLElement();
    if (timerInputEl) {
      timerFormInput.appendChildren([timerInputEl]);
    }
    timerInput.setValue(`${INIT_TIMER}`);
    this.addChangeTimeEvent(timerInput, wheel);
    return [timerImg.viewComponent, timerFormInput];
  }

  private addChangeTimeEvent(el: InputView, wheel: WheelPickerView) {
    const inputEl: HTMLElement | null = el.getHTMLElement();
    if (inputEl && inputEl instanceof HTMLInputElement) {
      inputEl.setAttribute("type", "number");
      inputEl.min = `${MIN_TIMER}`;
      inputEl.required = true;
      wheel.time = parseInt(inputEl.value);
      const form: Element | null = inputEl.parentElement;
      if (form && form instanceof HTMLFormElement) {
        this.addEventSubmitForm(form);
      }
      inputEl.addEventListener("keyup", () => {
        wheel.time = parseInt(inputEl.value);
      });
      inputEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });
    }
  }

  private addEventSubmitForm(form: HTMLFormElement) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}
