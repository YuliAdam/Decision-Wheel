import "./main-dialog.css";
import {
  BaseComponent,
  BaseComponentParam,
} from "../../../../../util/base-component";
import { View } from "../../../view";
import { ButtonView } from "../../../element-view/button-view";

const CssClasses: { mainDialog: string[]; text: string[]; close: string[] } = {
  mainDialog: ["main_dialog"],
  text: ["dialog_text"],
  close: ["dialog_close"],
};

export class DialogView extends View {
  constructor() {
    const dialogParams: BaseComponentParam = {
      tag: "dialog",
      classList: CssClasses.mainDialog,
    };
    super(dialogParams);
    this.createDialog();
  }

  private createDialog() {
    const textParams: BaseComponentParam = {
      tag: "p",
      classList: CssClasses.text,
      textContent: "Less two option. Add other option, please.",
    };
    const textEl: BaseComponent = new BaseComponent(textParams);
    const btnParams: BaseComponentParam = {
      classList: CssClasses.close,
      textContent: "Close",
    };
    const btnEl: ButtonView = new ButtonView(btnParams);
    DialogView.closeDialog(btnEl.viewComponent);
    this.viewComponent.appendChildComponents([textEl, btnEl.viewComponent]);
  }

  private static closeDialog(el: BaseComponent): void {
    if (el.getElement()) {
      el.getElement()?.addEventListener("click", () => {
        const dialog: HTMLElement | null = el.getParentComponent();
        if (dialog && dialog instanceof HTMLDialogElement) {
          dialog.classList.add("open");
          dialog.close();
          setTimeout(() => {
            dialog.classList.remove("open");
          }, 100);
        }
      });
    }
  }
}
