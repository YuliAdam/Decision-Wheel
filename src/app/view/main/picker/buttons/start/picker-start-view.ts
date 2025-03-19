import "./picker-start.css";
import { BaseComponentParam } from "../../../../../../util/base-component";
import { ButtonView } from "../../../../element-view/button-view";
import { AudioView } from "../../audio/audio";
import { WheelPickerView } from "../../picker-wheel/picker-wheel";

const CssClasses: { start: string[] } = {
  start: ["picker_start"],
};

export class StratPickerView extends ButtonView {
  constructor(
    audio: AudioView,
    wheel: WheelPickerView,
    block: HTMLElement | null,
  ) {
    const startPicherBaseParam: BaseComponentParam = {
      classList: CssClasses.start,
      textContent: "Start",
    };
    super(startPicherBaseParam);
    this.configComponent(audio, wheel, block);
  }

  private configComponent(
    audio: AudioView,
    wheel: WheelPickerView,
    block: HTMLElement | null,
  ) {
    const startEl = this.viewComponent.getElement();
    if (startEl && block) {
      this.startWheelEvent(audio, startEl, wheel);
    }
  }

  private startWheelEvent(
    audio: AudioView,
    startEl: HTMLElement,
    wheel: WheelPickerView,
  ) {
    startEl.addEventListener("click", () => {
      if (wheel.time > 4) {
        const overDiv: Element | null = startEl.nextElementSibling;
        if (overDiv) {
          overDiv.classList.remove("display-none");
          wheel.spin(audio, overDiv);
          audio.playAudio();
        }
      }
    });
  }
}
