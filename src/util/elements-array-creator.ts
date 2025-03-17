export abstract class ElementsChildren {
  public childArray: Array<HTMLElement | null>;
  constructor() {
    this.childArray = this.getElementsArr();
  }

  protected abstract getElementsArr(): Array<HTMLElement | null>;
}
