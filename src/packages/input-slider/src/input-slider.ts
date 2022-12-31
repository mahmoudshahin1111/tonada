import _ from "lodash";
import { BaseElement, Component, createBaseElement } from "tonada-shared";
import { Config } from "./_common/types";
import { getDefaultConfig, INPUT_SLIDER_PREFIX } from "./_common/utils";

export class InputSlider extends Component<HTMLDivElement> {
  thumbElements: Thumb[] = [];

  railElement: Rail;

  config: Config;

  constructor(element: BaseElement<HTMLDivElement>, config?: Config) {
    super(element);
    this.config = Object.assign(getDefaultConfig(), config);
  }

  build(): void {
    const fragment = document.createDocumentFragment();
    this.railElement = new Rail(
      createBaseElement<HTMLSpanElement>(document.createElement("span"))
    );

    const createdThumb = this.createThumb();
    this.thumbElements.push(createdThumb);
    this.railElement.element.appendChild(createdThumb.element);
    fragment.appendChild(this.railElement.element.element);
    document.addEventListener("mouseup", (e: MouseEvent) =>
      this.handleOnMouseUp(e, createdThumb)
    );
    document.addEventListener("mousemove", (e: MouseEvent) =>
      this.handleOnMouseMove(e, createdThumb)
    );
    createdThumb.build();
    this.railElement.build();
    this.element.element.appendChild(fragment);
    document.addEventListener("DOMContentLoaded", () => {
      const x1 = this.getValue() as number;
      const x2 = this.getMax();
      const x3 = this.getMin();
      const x7 = this.getStep();
      const x4 = this.railElement.element.element.getBoundingClientRect().left;
      const x5 =
        this.railElement.element.element.getBoundingClientRect().left +
        this.railElement.element.element.getBoundingClientRect().width;
      const x6 = (x2 - x3) / x7;
    });
  }

  private handleOnMouseUp(e: MouseEvent, thumb: Thumb): void {
    thumb.deHold();
  }
  private handleOnMouseDown(e: MouseEvent, thumb: Thumb): void {
    thumb.hold();
  }
  private handleOnMouseMove(e: MouseEvent, thumb: Thumb): void {
    if (!thumb.isHold()) return;
    this.updateThumb(e.clientX, thumb);
  }

  private updateThumb(mouseXPosition: number, thumb: Thumb) {
    const x9 = mouseXPosition;
    const x1 = this.getMax();
    const x2 = this.getMin();
    const x3 = this.getStep();
    const x4 = this.railElement.element.element.getBoundingClientRect().right;
    const x5 = this.railElement.element.element.getBoundingClientRect().left;
    const x6 = x4 - x5;
    const x7 = (x3 / (x1 - x2)) * x6;
    let x11 = thumb.positionIndex;

    // move forward
    let moveIndexBy =
      x3 *
      Math.floor(
        Math.abs(
          mouseXPosition - thumb.element.element.getBoundingClientRect().right
        ) / x7
      );
    if (
      x9 > thumb.element.element.getBoundingClientRect().right &&
      x11 + moveIndexBy <= (x1 - x2) / x3
    ) {
      x11 += moveIndexBy;
    }

    // move backward
    moveIndexBy =
      x3 *
      Math.floor(
        Math.abs(
          mouseXPosition - thumb.element.element.getBoundingClientRect().left
        ) / x7
      );
    if (
      x9 < thumb.element.element.getBoundingClientRect().left &&
      x11 - moveIndexBy >= 0
    ) {
      x11 -= moveIndexBy;
    }
    // set as max and min on out or rail
    if (mouseXPosition >= x4) {
      x11 = (x1 - x2) / x3;
    } else if (
      mouseXPosition <=
      this.railElement.element.element.getBoundingClientRect().left
    ) {
      x11 = 0;
    }
    // update
    thumb.positionIndex = x11;
    thumb.update(x11 * x7, x11 * x3 + x2);
    this.railElement.fullFilled.update(0, x11 * x7);
  }

  private createThumb(): Thumb {
    const thumb = new Thumb(
      createBaseElement<HTMLButtonElement>(document.createElement("button"))
    );
    thumb.element.element.addEventListener("mousedown", (e: MouseEvent) =>
      this.handleOnMouseDown(e, thumb)
    );

    return thumb;
  }

  private getMin(): number {
    let min = 0;
    if (this.config.min !== null) {
      min = this.config.min;
    } else {
      min = parseFloat(this.element.getAttribute(`${INPUT_SLIDER_PREFIX}-min`));
    }
    return min;
  }

  private getMax(): number {
    if (this.config.max !== null) {
      return this.config.max;
    }
    return parseFloat(this.element.getAttribute(`${INPUT_SLIDER_PREFIX}-max`));
  }

  private getStep(): number {
    if (this.config.step !== null) {
      return this.config.step;
    }
    return parseFloat(
      this.element.getAttribute(`${INPUT_SLIDER_PREFIX}-step`) || "1"
    );
  }

  private isRange(): boolean {
    return _.isArray(this.getValue());
  }

  private getValue(): number[] | number {
    let value: number | number[] = null;
    if (this.config.value) {
      value = this.config.value;
    } else {
      const valueEncoded = this.element.getAttribute(
        `${INPUT_SLIDER_PREFIX}-value`
      );
      if (!!valueEncoded && valueEncoded != "") {
        value = JSON.parse(valueEncoded);
      }
    }
    return 0;
  }
}

class Rail extends Component<HTMLSpanElement> {
  fullFilled: Fulfilled;

  constructor(element: BaseElement<HTMLSpanElement>) {
    super(element);
  }

  build(): void {
    const fragment = document.createDocumentFragment();
    this.element.addClass(`${INPUT_SLIDER_PREFIX}-rail`);
    this.fullFilled = new Fulfilled(
      createBaseElement<HTMLSpanElement>(document.createElement("span"))
    );
    this.fullFilled.build();
    fragment.append(this.fullFilled.element.element);
    this.element.element.appendChild(fragment);
  }
}

class Fulfilled extends Component<HTMLSpanElement> {
  constructor(element: BaseElement<HTMLSpanElement>) {
    super(element);
  }
  build(): void {
    this.element.addClass(`${INPUT_SLIDER_PREFIX}-fulfilled`);
  }
  update(startPosition: number, endPosition: number) {
    this.element.element.style.left = `${startPosition}px`;
    this.element.element.style.width = `${endPosition}px`;
  }
}

class Thumb extends Component<HTMLButtonElement> {
  positionIndex: number = 0;
  value: number = 0;
  tooltip: BaseElement<HTMLSpanElement>;
  private _position: number;
  private _isHold: boolean;
  constructor(element: BaseElement<HTMLButtonElement>) {
    super(element);
  }
  build(): void {
    this.tooltip = createBaseElement<HTMLSpanElement>(
      document.createElement("span")
    );
    this.tooltip.addClass(`${INPUT_SLIDER_PREFIX}-tooltip`);
    this.element.addClass(`${INPUT_SLIDER_PREFIX}-thumb`);
    this.tooltip.element.innerHTML = this.value.toString();
    this.element.appendChild(this.tooltip);
  }
  update(position: number, value: number) {
    this.value = value;
    this._position =
      position - this.element.element.getBoundingClientRect().width / 2;
    this.element.element.style.transform = `translateX(${this._position}px)`;
    this.tooltip.element.innerHTML = value.toString();
  }
  hold() {
    this._isHold = true;
    this.element.addClass(`${INPUT_SLIDER_PREFIX}-holden`);
  }
  deHold() {
    this._isHold = false;
    this.element.removeClass(`${INPUT_SLIDER_PREFIX}-holden`);
  }
  isHold() {
    return this._isHold;
  }
  getPosition() {
    return (
      this._position + this.element.element.getBoundingClientRect().width / 2
    );
  }
}
