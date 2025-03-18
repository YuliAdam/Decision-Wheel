import "./img-footer.css";
import type {
  AditionalParam,
  BaseComponentParam,
} from "../../../../../util/base-component";
import { ElementsChildren } from "../../../../../util/elements-array-creator";
import { ImgView } from "../../../element-view/img-view";

const imgAditionalParams: { gitHub: AditionalParam; rsSchool: AditionalParam } =
  {
    gitHub: {
      src: "github-logo.svg",
      alt: "GitHub logo",
    },
    rsSchool: {
      src: "rsSchool-logo.svg",
      alt: "RSSchool logo",
    },
  };

const CssClasses: { gitHubImg: string[]; rsSchoolImg: string[] } = {
  gitHubImg: ["link_git-hub"],
  rsSchoolImg: ["link_rs-school"],
};

export class ImgElements extends ElementsChildren {
  constructor() {
    super();
  }

  protected getElementsArr(): Array<HTMLElement | null>{
    return this.createView()
  }

  protected createView(): Array<HTMLElement | null> {
    const imgParamGitHub: BaseComponentParam = {
      classList: CssClasses.gitHubImg,
    };
    const imgParamRsSchool: BaseComponentParam = {
      classList: CssClasses.rsSchoolImg,
    };
    const imgGitHubEl: HTMLElement | null = new ImgView(
      imgParamGitHub,
      imgAditionalParams.gitHub,
    ).getHTMLElement();
    const imgRsSchoolEl: HTMLElement | null = new ImgView(
      imgParamRsSchool,
      imgAditionalParams.rsSchool,
    ).getHTMLElement();
    return [imgGitHubEl, imgRsSchoolEl];
  }
}
