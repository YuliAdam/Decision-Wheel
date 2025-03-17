import { IOption } from "../item_view/item-children-view";

const localStogeObj: { lastId: string; list: string } = {
  lastId: "lastId",
  list: "list",
};

export class LocalStoge {
  constructor() {}

  public redactOption(id: number, param: { title?: string; weight?: string }) {
    const oldOptionListArr: Array<IOption> = this.getLocalStogeList();
    oldOptionListArr.map((opt) => {
      if (opt.id === id) {
        if (param.weight) {
          opt.weight = param.weight;
        }
        if (param.title) {
          opt.option = param.title;
        }
      }
    });
    window.localStorage.setItem(
      localStogeObj.list,
      JSON.stringify(oldOptionListArr),
    );
  }

  public writeInLocalStoge(optionListArr: Array<IOption>) {
    window.localStorage.setItem(
      localStogeObj.list,
      JSON.stringify(optionListArr),
    );
    this.writeLastId(optionListArr[optionListArr.length - 1].id);
  }

  public writeNewOption() {
    let lastId: number = this.getLocalStogeLastId();
    const option: IOption = {
      id: lastId + 1,
      option: "",
      weight: "",
    };
    this.writeLastId(lastId + 1);
    const oldOptionListArr: Array<IOption> = this.getLocalStogeList();
    oldOptionListArr.push(option);
    window.localStorage.setItem(
      localStogeObj.list,
      JSON.stringify(oldOptionListArr),
    );
  }

  private writeLastId(id: number) {
    window.localStorage.setItem(localStogeObj.lastId, `${id}`);
  }

  public getLocalStogeList(): Array<IOption> {
    const listStr: string | null = window.localStorage.getItem(
      localStogeObj.list,
    );
    return listStr ? JSON.parse(listStr) : [];
  }

  public getLocalStogeLastId(): number {
    const lastId = window.localStorage.getItem(localStogeObj.lastId);
    return lastId ? parseInt(lastId) : 0;
  }

  public clear() {
    window.localStorage.clear();
  }

  public deleteOptionFromList(id: number) {
    const list: Array<IOption> = this.getLocalStogeList();
    const newList: Array<IOption> = list.filter((option) => option.id !== id);
    window.localStorage.setItem(localStogeObj.list, JSON.stringify(newList));
  }

  public getLocalStogeTextFile(): string {
    return `{"list": ${JSON.stringify(this.getLocalStogeList())}, "lastId": ${JSON.stringify(this.getLocalStogeLastId())}}`;
  }
}
