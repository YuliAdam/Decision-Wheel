import "./picker-wheel.css";
import WHEEL_PARAMS from "./picker-wheel-property.json";
import {
  BaseComponent,
  BaseComponentParam,
} from "../../../../../util/base-component";
import { getRandom } from "../../../../../util/function/random-function";
import { View } from "../../../view";
import { IOption } from "../../index/ul-elements/li-elements/item_view/item-children-view";
import { LocalStoge } from "../../index/ul-elements/li-elements/localstoge/localstoge";
import { getRad } from "../../../../../util/function/getRad";

interface ICoordinate {
  x: number;
  y: number;
}

interface ICenterParams {
  coordinate: ICoordinate;
  r: number;
}

const CssClasses: { wheel: string[] } = {
  wheel: ["picher_wheel"],
};

export class WheelPickerView extends View {
  constructor(
    localStoge: LocalStoge,
    result: BaseComponent,
  ) {
    const wheelBaseParams: BaseComponentParam = {
      tag: "canvas",
      classList: CssClasses.wheel,
    };
    super(wheelBaseParams);
    this.setCanvasSize(300, 300);
    this.createComponent(localStoge, result);
  }

  private setCanvasSize(weight: number, height: number) {
    const canvas: HTMLElement | null = this.viewComponent.getElement();
    if (canvas) {
      canvas.setAttribute("height", `${weight}px`);
      canvas.setAttribute("width", `${height}px`);
    }
  }

  public createComponent(
    localStoge: LocalStoge,
    result: BaseComponent,
  ): void {
    const canvas: HTMLElement | null = this.viewComponent.getElement();
    if (canvas) {
      const centerX: number = parseInt(canvas.getAttribute("width") ?? "") / 2;
      const centerY: number = parseInt(canvas.getAttribute("height") ?? "") / 2;
      const radius: number = parseInt(canvas.getAttribute("width") ?? "") / 3;
      if (canvas instanceof HTMLCanvasElement) {
        this.draw(
          canvas,
          { coordinate: { x: centerX, y: centerY }, r: radius },
          localStoge,
          result,
        );
      }
    }
  }

  private draw(
    canvas: HTMLCanvasElement,
    center: ICenterParams,
    localStoge: LocalStoge,
    result: BaseComponent,
  ) {
    const initDeg: number = 0;
    const finishDeg: number = 360;
    const option: IOption[] = localStoge.getLocalStogeList();
    const numOption = option.length;
    const optionColors: string[] = WheelPickerView.getRandomColors(numOption);
    const optionDegs: Array<{ startDeg: number; endDeg: number }> = [];
    let totalWeight: number = 0;
    option.forEach((el) => (totalWeight += parseInt(el.weight)));
    const step: number = finishDeg / totalWeight;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (ctx) {
      WheelPickerView.drawWheel(ctx, center);
      let startDeg: number = initDeg;
      for (let i = 0; i < numOption; i++) {
        let endDeg: number = startDeg + step * parseInt(option[i].weight);
        ctx.fillStyle = optionColors[i];
        ctx.strokeStyle = WHEEL_PARAMS.COLORS.BORDER_COLOR;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(
          center.coordinate.x,
          center.coordinate.y,
          center.r,
          getRad(startDeg),
          getRad(endDeg),
        );
        ctx.lineTo(center.coordinate.x, center.coordinate.y);
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.translate(center.coordinate.x, center.coordinate.y);
        ctx.rotate(getRad((startDeg + endDeg) / 2));
        ctx.textAlign = "center";
        ctx.fillStyle = WHEEL_PARAMS.COLORS.PRIMARY_COLOR;
        ctx.font = WHEEL_PARAMS.FONT.FONT;
        ctx.fillText(option[i].option, 50, 10);
        ctx.restore();

        optionDegs.push({
          startDeg: startDeg,
          endDeg: endDeg,
        });
        startDeg = endDeg;
        // check winner
        if (
          startDeg % 360 < 360 &&
          startDeg % 360 > 270 &&
          endDeg % 360 > 0 &&
          endDeg % 360 < 90
        ) {
          const resultDiv = result.getElement();
          if (resultDiv) {
            resultDiv.textContent = option[i].option;
          }
        }
      }
      WheelPickerView.drawWheel(ctx, {
        coordinate: { x: center.coordinate.x, y: center.coordinate.y },
        r: 10,
      });
      WheelPickerView.drawTriangle(
        ctx,
        {
          x: center.coordinate.x,
          y: center.coordinate.y - center.r + 10,
        },
        {
          x: center.coordinate.x + 10,
          y: center.coordinate.y - center.r - 10,
        },
        {
          x: center.coordinate.x - 10,
          y: center.coordinate.y - center.r - 10,
        },
      );
    }
  }

  private static drawWheel(
    ctx: CanvasRenderingContext2D,
    center: ICenterParams,
  ) {
    const initDeg: number = 0;
    const finishDeg = 360;
    ctx.beginPath();
    ctx.arc(
      center.coordinate.x,
      center.coordinate.y,
      10,
      getRad(initDeg),
      getRad(finishDeg),
    );
    ctx.fillStyle = WHEEL_PARAMS.COLORS.BORDER_COLOR;
    ctx.lineTo(center.coordinate.x, center.coordinate.y);
    ctx.fill();
  }

  private static drawTriangle(
    ctx: CanvasRenderingContext2D,
    coordinate1: ICoordinate,
    coordinate2: ICoordinate,
    coordinate3: ICoordinate,
  ) {
    ctx.beginPath();
    ctx.fillStyle = WHEEL_PARAMS.COLORS.PRIMARY_COLOR;
    ctx.moveTo(coordinate1.x, coordinate1.y);
    ctx.lineTo(coordinate2.x, coordinate2.y);
    ctx.lineTo(coordinate3.x, coordinate3.y);
    ctx.fill();
  }

  private static getRandomColors(num: number): string[] {
    const resultArr: string[] = [];
    while (resultArr.length < num) {
      const color =
        WHEEL_PARAMS.COLORS.SECTION_COLORS[
          getRandom(0, WHEEL_PARAMS.COLORS.SECTION_COLORS.length)
        ];
      if (!resultArr.includes(color)) {
        resultArr.push(color);
      }
    }
    return resultArr;
  }
}
