import type { BaseComponentParam } from "../../../util/base-component";
import { View } from "../view";

export class LinkView extends View {
  constructor(param: BaseComponentParam, href: string) {
    const linkParam: BaseComponentParam = {
      tag: "a",
      classList: param.classList,
      textContent: param.textContent,
      callback: param.callback,
    };
    super(linkParam, { href: href });
  }
  protected configView(): void {console.log('configurate')}
}
