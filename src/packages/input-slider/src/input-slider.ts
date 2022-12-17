import _ from "lodash";
import { BaseElement, Component, createBaseElement } from "tonada-shared";
import { Config } from "./_common/types";
import { getDefaultConfig, INPUT_SLIDER_PREFIX } from "./_common/utils";

export class InputSlider extends Component<HTMLDivElement> {
  thumbElements: Thumb[] = [];

  railElement: Rail;

  fulfilledElement: Fulfilled;

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
      console.log(
        Math.round(
          ((this.railElement.element.getWidth() -
            this.railElement.element.getLeft()) *
            (this.getStep() * createdThumb.value)) /
            (this.getMax() - this.getMin())
        )
      );

      createdThumb.update(
        Math.round(
          (((this.railElement.element.getWidth() -
            this.railElement.element.getLeft()) /
            this.getStep()) *
            (this.getStep() * createdThumb.value)) /
            (this.getMax() - this.getMin())
        ),
        10
      );
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
    const currentMousePosition =
      Math.round(e.clientX) -
      Math.round(
        this.railElement.element.element.getBoundingClientRect().left
      ) -
      thumb.element.element.getBoundingClientRect().width / 2;
    const railStep =
      (this.getStep() / this.getMax()) *
      this.railElement.element.element.getBoundingClientRect().width;
    const newPosition = Math.round(currentMousePosition / railStep) * railStep;
    if (
      newPosition <
        this.railElement.element.element.getBoundingClientRect().width +
          railStep &&
      newPosition > -railStep &&
      thumb.getPosition() !== newPosition
    ) {
      thumb.update(
        newPosition,
        this.getMax() *
          (newPosition /
            this.railElement.element.element.getBoundingClientRect().width)
      );
    }
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
    if (this.config.min) {
      return this.config.min;
    }
    return parseFloat(this.element.getAttribute(`${INPUT_SLIDER_PREFIX}-min`));
  }

  private getMax(): number {
    if (this.config.max) {
      return this.config.max;
    }
    return parseFloat(this.element.getAttribute(`${INPUT_SLIDER_PREFIX}-max`));
  }

  private getStep(): number {
    if (this.config.step) {
      return 10; // this.config.step;
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
}

class Thumb extends Component<HTMLButtonElement> {
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
    this._position = position - this.element.element.getBoundingClientRect().width / 2;
    this.element.element.style.transform = `translateX(${
      this._position 
    }px)`;
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
  getPosition(){
    return this._position + this.element.element.getBoundingClientRect().width / 2;
  }
}
