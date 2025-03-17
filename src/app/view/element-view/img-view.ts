import type {
  AditionalParam,
  BaseComponentParam,
} from "../../../util/base-component";
import { View } from "../view";

export class ImgView extends View {
  constructor(param: BaseComponentParam, aditionalParam: AditionalParam) {
    const imgParam: BaseComponentParam = {
      tag: "img",
      classList: param.classList,
      callback: param.callback,
    };
    const imgAditionalParam: AditionalParam = {
      src: aditionalParam.src,
      alt: aditionalParam.alt,
    };
    super(imgParam, imgAditionalParam);
  }
  protected configView(): void {}
}
