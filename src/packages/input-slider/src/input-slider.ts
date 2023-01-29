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

    // listen to mouse moving events to update thumb position
    document.addEventListener("mouseup", (e: MouseEvent) => {
      this.handleOnMouseUp(e, createdThumb);
      this.dispatchEvent(`${INPUT_SLIDER_PREFIX}_change`, {
        result: createdThumb.value,
      });
    });

    document.addEventListener("mousemove", (e: MouseEvent) =>
      this.handleOnMouseMove(e, createdThumb)
    );

    document.addEventListener("DOMContentLoaded", () => {
      this.moveThumbToPositionByValue(createdThumb, this.getValue() as number);
    });

    this.railElement.element.element.addEventListener("mousedown", (e) => {
      createdThumb.hold();
      this.moveThumbToPosition(
        createdThumb,
        this.railElement.element.element.getBoundingClientRect().left,
        e.clientX
      );
    });

    this.railElement.element.element.addEventListener("mouseup", (e) => {
      createdThumb.deHold();
    });
    // build
    createdThumb.build();
    this.railElement.build();
    this.element.element.appendChild(fragment);
  }

  onChange(callback: CallableFunction) {
    this.onEvent(`${INPUT_SLIDER_PREFIX}_change`, callback);
  }

  private handleOnMouseUp(e: MouseEvent, thumb: Thumb): void {
    thumb.deHold();
  }
  private handleOnMouseDown(e: MouseEvent, thumb: Thumb): void {
    thumb.hold();
  }
  private handleOnMouseMove(e: MouseEvent, thumb: Thumb): void {
    if (!thumb.isHold()) return;
    this.moveThumbToPosition(
      thumb,
      this.railElement.element.element.getBoundingClientRect().left,
      e.clientX
    );
  }

  private moveThumbToPositionByValue(thumb: Thumb, value: number) {
    const steps = (this.getMax() - this.getMin()) / this.getStep();
    const stepLength =
      this.railElement.element.element.getBoundingClientRect().width / steps;
    const movedIndexes = (value - this.getMin()) / this.getStep();

    thumb.positionIndex = movedIndexes;

    const newPosition = movedIndexes * stepLength;
    thumb.update(newPosition, value);
    this.railElement.fullFilled.update(0, movedIndexes * stepLength);
  }

  private moveThumbToPosition(
    thumb: Thumb,
    startPosition: number,
    moveToPosition: number
  ) {
    const steps = (this.getMax() - this.getMin()) / this.getStep();
    const stepLength =
      this.railElement.element.element.getBoundingClientRect().width / steps;
    const MovedIndexes = Math.round(
      (moveToPosition - startPosition) / stepLength
    );
    if (
      moveToPosition <=
        this.railElement.element.element.getBoundingClientRect().right &&
      moveToPosition >=
        this.railElement.element.element.getBoundingClientRect().left
    ) {
      thumb.positionIndex = MovedIndexes;
      const value = MovedIndexes * this.getStep() + this.getMin();
      const newPosition = MovedIndexes * stepLength;
      thumb.update(newPosition, value);
      this.railElement.fullFilled.update(
        startPosition -
          this.railElement.element.element.getBoundingClientRect().left,
        MovedIndexes * stepLength
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

  private getValue(): number[] | number {
    let value: number | number[] = null;
    if (this.config.value) {
      value = this.config.value;
    } else {
      value = Number(this.element.getAttribute(`${INPUT_SLIDER_PREFIX}-value`));
    }
    return value;
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
