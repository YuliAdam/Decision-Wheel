import { BaseComponent } from "../../util/base-component";
import type {
  AditionalParam,
  BaseComponentParam,
} from "../../util/base-component";

export abstract class View {
  public viewComponent: BaseComponent;
  constructor(params: BaseComponentParam, aditionalParam: AditionalParam = {}) {
    this.viewComponent = this.createView(params, aditionalParam);
  }

  public getHTMLElement(): HTMLElement | null {
    return this.viewComponent.getElement();
  }

  protected createView(
    params: BaseComponentParam,
    aditionalParam: AditionalParam,
  ): BaseComponent {
    const viewParam: BaseComponentParam = {
      tag: params.tag,
      classList: params.classList,
      textContent: params.textContent,
      callback: params.callback,
    };
    const aditionalViewParam: AditionalParam = {
      href: aditionalParam.href,
      src: aditionalParam.src,
      alt: aditionalParam.alt,
      placeholder: aditionalParam.placeholder,
    };

    const view: BaseComponent = new BaseComponent(
      viewParam,
      aditionalViewParam,
    );
    return view;
  }
}
