import "./picker-start.css";
import { BaseComponentParam } from "../../../../../../util/base-component";
import { ButtonView } from "../../../../element-view/button-view";
import { AudioView } from "../../audio/audio";

const CssClasses: { start: string[] } = {
  start: ["picker_start"],
};

export class StratPickerView extends ButtonView {
  constructor(audio: AudioView, block: HTMLElement | null) {
    const startPicherBaseParam: BaseComponentParam = {
      classList: CssClasses.start,
      textContent: "Start",
    };
    super(startPicherBaseParam);
    this.configComponent(audio, block);
  }

  private configComponent(audio: AudioView, block: HTMLElement | null) {
    const startEl = this.viewComponent.getElement();
    if (startEl && block) {
      startEl.addEventListener("click", () => {
        block.classList.remove("display-none");
        StratPickerView.audioEvent(audio);
      });
    }
  }

  private static audioEvent(audio: AudioView) {
    audio.playAudio();
  }
}
