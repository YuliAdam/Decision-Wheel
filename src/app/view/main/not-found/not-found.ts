import { BaseComponentParam } from "../../../../util/base-component";
import { View } from "../../view";

const CssClasses: { notFound: string[] } = {
  notFound: ["main_not-found"],
};

const TEXT_NOT_FOUND = "PAGE NOT FOUND";

export class NotFoundView extends View {
  constructor() {
    const notFoundParam: BaseComponentParam = {
      classList: CssClasses.notFound,
      textContent: TEXT_NOT_FOUND,
    };
    super(notFoundParam);
  }
}
