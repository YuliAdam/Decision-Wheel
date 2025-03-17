import "./textarea-paste-list.css";
import {
  type AditionalParam,
  type BaseComponentParam,
} from "../../../../../../util/base-component";
import { View } from "../../../../view";

const CssClasses: { pasteListInput: string[] } = {
  pasteListInput: ["paste-list_text"],
};

export class TextArea extends View {
  constructor() {
    const baseParamInput: BaseComponentParam = {
      tag: "textarea",
      classList: CssClasses.pasteListInput,
    };
    const aditionalParam: AditionalParam = {
      placeholder: `Paste a list of new options in the format:

                            title, 1                                  =>      Title: title | Weight: 1
                            title     ,   2                          =>      Title: title | Weight: 2
                            title,title continue, 3    =>      Title: title | Weight: 3`,
    };
    super(baseParamInput, aditionalParam);
   
  }
}
