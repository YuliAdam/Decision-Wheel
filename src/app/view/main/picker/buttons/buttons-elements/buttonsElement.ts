import "./btn-picker.css";

import {
  type AditionalParam,
  type BaseComponentParam,
} from "../../../../../../util/base-component";
import { ElementsChildren } from "../../../../../../util/elements-array-creator";
import { ButtonView } from "../../../../element-view/button-view";
import { ImgView } from "../../../../element-view/img-view";
import { TimerPickerView } from "./timer-view/timer-picker-view";
import { AudioView } from "../../audio/audio";
import { Router } from "../../../../../router/router";

const CssClasses: { back: string[]; volume: string[] } = {
  back: ["picker_back"],
  volume: ["picker_volume"],
};

const buttonsParams: { back: BaseComponentParam; volume: BaseComponentParam } =
  {
    back: { classList: CssClasses.back, textContent: "Back" },
    volume: { classList: CssClasses.volume },
  };

export class ButtonsPickerElements extends ElementsChildren {
  constructor(audio: AudioView, router: Router) {
    super();
    this.childArray = this.createChildren(audio, router);
  }

  protected getElementsArr(): Array<HTMLElement | null> {
    return [];
  }

  private createChildren(audio: AudioView, router: Router) {
    const backBtn: HTMLElement | null = new ButtonView(
      buttonsParams.back,
    ).getHTMLElement();
    const volumeBtn: HTMLElement | null = new ButtonView(
      buttonsParams.volume,
    ).getHTMLElement();
    const volumeOnImg: HTMLElement | null = this.createVolumeOnImg();
    const volumeOffImg: HTMLElement | null = this.createVolumeOffImg();
    if (volumeOnImg && volumeOffImg && volumeBtn) {
      volumeBtn.append(volumeOnImg, volumeOffImg);
      ButtonsPickerElements.volumeCallback(
        volumeBtn,
        volumeOnImg,
        volumeOffImg,
        audio,
      );
      if (backBtn) {
        ButtonsPickerElements.backCallback(router, backBtn);
      }
    }
    const timer: HTMLElement | null = new TimerPickerView().getHTMLElement();
    return [backBtn, volumeBtn, timer];
  }

  private createVolumeOnImg(): HTMLElement | null {
    const volumeImgBaseParam: BaseComponentParam = {
      classList: ["volume_img"],
    };
    const volumeImgAditionalParam: AditionalParam = {
      src: "volume-on.svg",
      alt: "volume on",
    };
    return new ImgView(
      volumeImgBaseParam,
      volumeImgAditionalParam,
    ).getHTMLElement();
  }

  private createVolumeOffImg(): HTMLElement | null {
    const volumeImgBaseParam: BaseComponentParam = {
      classList: ["volume_img", "display-none"],
    };
    const volumeImgAditionalParam: AditionalParam = {
      src: "volume-off.svg",
      alt: "volume off",
    };
    return new ImgView(
      volumeImgBaseParam,
      volumeImgAditionalParam,
    ).getHTMLElement();
  }

  private static volumeCallback(
    element: HTMLElement,
    on: HTMLElement,
    off: HTMLElement,
    audio: AudioView,
  ) {
    element.addEventListener("click", () => {
      if (on.classList.contains("display-none")) {
        audio.onVolume();
        on.classList.add("opacity");
        off.classList.add("opacity");
        setTimeout(() => {
          off.classList.add("display-none");
          on.classList.remove("display-none");
          on.classList.remove("opacity");
          off.classList.remove("opacity");
        }, 250);
      } else {
        audio.offVolume();
        on.classList.add("opacity");
        off.classList.add("opacity");
        setTimeout(() => {
          on.classList.add("display-none");
          off.classList.remove("display-none");
          on.classList.remove("opacity");
          off.classList.remove("opacity");
        }, 250);
      }
    });
  }

  private static backCallback(router: Router, backBtn: HTMLElement) {
    backBtn.addEventListener("click", () => router.navigate("app"));
  }
}
