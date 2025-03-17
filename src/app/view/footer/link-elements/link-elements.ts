import "./link-footer.css";
import type { BaseComponentParam } from "../../../../util/base-component";
import { ElementsChildren } from "../../../../util/elements-array-creator";
import { LinkView } from "../../element-view/link-view";
import { ImgElements } from "./img-elements/img-elements";

const hrefParams: { gitHub: string; rsSchool: string } = {
  gitHub: "https://github.com/YuliAdam",
  rsSchool: "https://rs.school/courses/javascript-ru",
};

const CssClasses: { p: string[]; link: string[] } = {
  p: ["footer_title"],
  link: ["footer_link"],
};

export class LinkElements extends ElementsChildren {
  constructor() {
    super();
  }

  protected getElementsArr(): Array<HTMLElement | null> {
    return [
      this.createGitHubImgView(),
      this.createGitHubView(),
      this.createRsSchoolView(),
    ];
  }

  protected createGitHubImgView(): HTMLElement | null {
    const linkGitHubEl: HTMLElement | null = new LinkView(
      {},
      hrefParams.gitHub,
    ).getHTMLElement();
    const imgChildElement: HTMLElement | null = this.createImgChildArray()[0];
    if (linkGitHubEl && imgChildElement) {
      linkGitHubEl.append(imgChildElement);
    }
    return linkGitHubEl;
  }

  protected createGitHubView(): HTMLElement | null {
    const linkParamGitHub: BaseComponentParam = {
      classList: CssClasses.link.concat(CssClasses.p),
      textContent: "@YuliAdam",
    };
    const linkGitHubEl: HTMLElement | null = new LinkView(
      linkParamGitHub,
      hrefParams.gitHub,
    ).getHTMLElement();
    return linkGitHubEl;
  }

  protected createRsSchoolView(): HTMLElement | null {
    const linkRsSchoolEl: HTMLElement | null = new LinkView(
      {},
      hrefParams.rsSchool,
    ).getHTMLElement();
    const imgChildElement: HTMLElement | null = this.createImgChildArray()[1];
    if (linkRsSchoolEl && imgChildElement) {
      linkRsSchoolEl.append(imgChildElement);
    }
    return linkRsSchoolEl;
  }

  private createImgChildArray(): Array<HTMLElement | null> {
    const imgChildElements: Array<HTMLElement | null> = new ImgElements()
      .childArray;
    return imgChildElements;
  }
}
