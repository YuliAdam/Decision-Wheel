import "./picker-wheel.css";
import WHEEL_PARAMS from "./picker-wheel-property.json";
import type { BaseComponentParam } from "../../../../../util/base-component";
import { getRandom } from "../../../../../util/function/random-function";
import { View } from "../../../view";
import { IOption } from "../../index/ul-elements/li-elements/item_view/item-children-view";
import { LocalStoge } from "../../index/ul-elements/li-elements/localstoge/localstoge";
import {
  getRad,
  easeOutSin,
  getPercent,
} from "../../../../../util/function/wheelFunction";
import { AudioView } from "../audio/audio";

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
  private speed: number;
  private currentDeg: number;
  private pause: boolean;
  private options: IOption[];
  private ctx: CanvasRenderingContext2D | null;
  public time: number;
  private center: ICenterParams;
  private step: number;
  private optionColors: string[];
  private optionDegs: Array<{
    title: string;
    startDeg: number;
    endDeg: number;
  }>;
  constructor(localStoge: LocalStoge) {
    const wheelBaseParams: BaseComponentParam = {
      tag: "canvas",
      classList: CssClasses.wheel,
    };
    super(wheelBaseParams);

    const canvas = this.viewComponent.getElement();
    this.ctx = null;
    if (canvas && canvas instanceof HTMLCanvasElement) {
      this.ctx = canvas.getContext("2d");
    }
    this.time = 0;
    this.speed = 0;
    this.currentDeg = 0;
    this.pause = false;
    this.options = localStoge.validateOption();
    this.setCanvasSize(300, 300);
    this.center = this.getCenter();
    const finishDeg: number = 360;
    this.step = finishDeg / this.getTotalWeight();
    this.optionColors = WheelPickerView.getRandomColors(this.options.length);
    this.optionDegs = [];
    this.draw();
  }

  private setCanvasSize(weight: number, height: number) {
    const canvas: HTMLElement | null = this.viewComponent.getElement();
    if (canvas) {
      canvas.setAttribute("height", `${weight}px`);
      canvas.setAttribute("width", `${height}px`);
    }
  }

  private getCenter(): ICenterParams {
    const canvas = this.viewComponent.getElement();
    if (canvas) {
      const centerX: number = parseInt(canvas.getAttribute("width") ?? "") / 2;
      const centerY: number = parseInt(canvas.getAttribute("height") ?? "") / 2;
      const radius: number = parseInt(canvas.getAttribute("width") ?? "") / 3;
      return { coordinate: { x: centerX, y: centerY }, r: radius };
    }
    return { coordinate: { x: 0, y: 0 }, r: 0 };
  }

  private getTotalWeight(): number {
    let totalWeight: number = 0;
    this.options.forEach((el) => (totalWeight += parseInt(el.weight)));
    return totalWeight;
  }

  private draw() {
    const initDeg: number = this.currentDeg;
    if (this.ctx) {
      this.drawWheel();
      let startDeg: number = initDeg;
      for (let i = 0; i < this.options.length; i++) {
        let endDeg: number =
          startDeg + this.step * parseInt(this.options[i].weight);
        this.ctx.fillStyle = this.optionColors[i];
        this.ctx.strokeStyle = WHEEL_PARAMS.COLORS.BORDER_COLOR;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(
          this.center.coordinate.x,
          this.center.coordinate.y,
          this.center.r,
          getRad(startDeg),
          getRad(endDeg),
        );
        this.ctx.lineTo(this.center.coordinate.x, this.center.coordinate.y);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.save();
        this.ctx.translate(this.center.coordinate.x, this.center.coordinate.y);
        this.ctx.rotate(getRad((startDeg + endDeg) / 2));
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = WHEEL_PARAMS.COLORS.PRIMARY_COLOR;
        this.ctx.font = WHEEL_PARAMS.FONT.FONT;
        this.ctx.fillText(this.options[i].option, 50, 10);
        this.ctx.restore();
        this.drawWheel();
        this.drawTriangle(
          {
            x: this.center.coordinate.x,
            y: this.center.coordinate.y - this.center.r + 10,
          },
          {
            x: this.center.coordinate.x + 10,
            y: this.center.coordinate.y - this.center.r - 10,
          },
          {
            x: this.center.coordinate.x - 10,
            y: this.center.coordinate.y - this.center.r - 10,
          },
        );
        this.optionDegs.push({
          title: this.options[i].option,
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
        }
      }
    }
  }

  private animate(maxRotation: number, audio: AudioView, overDiv: Element) {
    if (this.pause) {
      return;
    }
    this.speed = easeOutSin(getPercent(this.currentDeg, maxRotation, 0)) * 25;
    if (this.speed < 0.1) {
      this.speed = 0;
      this.pause = true;
      audio.pauseAudio();
      overDiv.classList.add("display-none");
    }
    this.currentDeg += this.speed;
    this.draw();
    window.requestAnimationFrame(() =>
      this.animate(maxRotation, audio, overDiv),
    );
  }

  public spin(audio: AudioView, overDiv: Element) {
    if (this.speed != 0) {
      return;
    }
    let maxRotation = 0;
    this.currentDeg = 0;
    this.draw();
    maxRotation = 360 * this.time - this.optionDegs[0].endDeg + 10;
    this.optionDegs = [];
    console.log("max", maxRotation);
    console.log(this.optionDegs);
    this.pause = false;
    window.requestAnimationFrame(() =>
      this.animate(maxRotation, audio, overDiv),
    );
  }

  private drawWheel() {
    const initDeg: number = 0;
    const finishDeg = 360;
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.center.coordinate.x,
        this.center.coordinate.y,
        10,
        getRad(initDeg),
        getRad(finishDeg),
      );
      this.ctx.fillStyle = WHEEL_PARAMS.COLORS.BORDER_COLOR;
      this.ctx.lineTo(this.center.coordinate.x, this.center.coordinate.y);
      this.ctx.fill();
    }
  }

  private drawTriangle(
    coordinate1: ICoordinate,
    coordinate2: ICoordinate,
    coordinate3: ICoordinate,
  ) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.fillStyle = WHEEL_PARAMS.COLORS.PRIMARY_COLOR;
      this.ctx.moveTo(coordinate1.x, coordinate1.y);
      this.ctx.lineTo(coordinate2.x, coordinate2.y);
      this.ctx.lineTo(coordinate3.x, coordinate3.y);
      this.ctx.fill();
    }
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
