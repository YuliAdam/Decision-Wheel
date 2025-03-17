import { BaseComponentParam } from "../../../../../util/base-component";
import { View } from "../../../view";

export class AudioView extends View {
  constructor() {
    const audioParam: BaseComponentParam = {
      tag: "audio",
    };
    super(audioParam);
    this.viewComponent.setAttribute("src", "mp3/mp3.mp3");
  }

  public playAudio() {
    const audio: HTMLElement | null = this.viewComponent.getElement();
    if (audio && audio instanceof HTMLAudioElement) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  public pauseAudio() {
    const audio: HTMLElement | null = this.viewComponent.getElement();
    if (audio && audio instanceof HTMLAudioElement) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  public onVolume() {
    const audio: HTMLElement | null = this.viewComponent.getElement();
    if (audio && audio instanceof HTMLAudioElement) {
      audio.volume = 1.0;
    }
  }

  public offVolume() {
    const audio: HTMLElement | null = this.viewComponent.getElement();
    if (audio && audio instanceof HTMLAudioElement) {
      audio.volume = 0.0;
    }
  }
}
