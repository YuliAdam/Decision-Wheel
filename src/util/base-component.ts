export interface BaseComponentParam {
  tag?: string;
  classList?: string[];
  textContent?: string;
  callback?: Function;
}
export interface AditionalParam {
  href?: string;
  src?: string;
  alt?: string;
  placeholder?: string;
}

export class BaseComponent {
  protected component: HTMLElement | null;

  constructor(param: BaseComponentParam, aditionalParam: AditionalParam = {}) {
    this.component = null;
    this.createComponent(param, aditionalParam);
  }

  public getElement(): HTMLElement | null {
    return this.component;
  }

  public appendChildren(children: HTMLElement[]): void {
    children.forEach((child) => {
      if (this.component) {
        this.component.append(child);
      }
    });
  }

  public appendChildComponents(childComponents: BaseComponent[]): void {
    childComponents.forEach((childComponent) => {
      const el = childComponent.getElement();
      if (this.component && el) {
        this.component.append(el);
      }
    });
  }

  protected createComponent(
    param: BaseComponentParam,
    aditionalParam: AditionalParam,
  ): void {
    this.component = document.createElement(param.tag ?? "div");
    if (param.classList) {
      this.setCSSClasses(param.classList);
    }
    if (param.textContent) {
      this.setTextContent(param.textContent);
    }
    if (param.callback) {
      this.setCallback(param.callback);
    }
    if (aditionalParam.href) {
      this.setHref(aditionalParam.href);
    }
    if (aditionalParam.src) {
      this.setImgSrc(aditionalParam.src, aditionalParam.alt);
    }
    if (aditionalParam.placeholder) {
      this.setInputPlaceholder(aditionalParam.placeholder);
    }
  }

  protected setCSSClasses(classList: string[]): void {
    classList.forEach((str: string) => {
      if (this.component && str) {
        this.component.classList.add(str);
      }
    });
  }

  protected setTextContent(textContent: string): void {
    if (this.component) {
      this.component.textContent = textContent;
    }
  }

  protected setCallback(callback: Function): void {
    if (this.component) {
      this.component.addEventListener("click", (event) => callback(event));
    }
  }
  private setHref(href: string): void {
    if (this.component) {
      this.component.setAttribute("href", href);
    }
  }
  private setImgSrc(src: string, alt: string = "img"): void {
    if (this.component) {
      this.component.setAttribute("src", src);
      this.component.setAttribute("alt", alt);
    }
  }
  private setInputPlaceholder(placeholder: string): void {
    if (this.component) {
      this.component.setAttribute("placeholder", placeholder);
    }
  }
  public setAttribute(attributeName: string, attributeValue: string) {
    if (this.component) {
      this.component.setAttribute(attributeName, attributeValue);
    }
  }
  public addComponentEventListener(
    eventName: string,
    callback: (ev: Event) => void,
  ): void {
    if (this.component) {
      this.component.addEventListener(eventName, (e) => {
        callback(e);
      });
    }
  }

  public removeComponent(): void {
    if (this.component) {
      this.component.remove();
    }
  }
  public getParentComponent(): HTMLElement | null {
    if (this.component) {
      return this.component.parentElement;
    }
    return null;
  }
}
