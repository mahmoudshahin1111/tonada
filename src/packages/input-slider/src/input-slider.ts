import _ from "lodash";
import { Input } from "tonada-input/src/input";
import { BaseElement, Component, createBaseElement } from "tonada-shared";
import { Config } from "./_common/types";
import { getDefaultConfig, INPUT_SLIDER_PREFIX } from "./_common/utils";

export class InputSlider extends Component<HTMLDivElement> {
  thumbElement: BaseElement<HTMLSpanElement>[] = [];
  railElement: BaseElement<HTMLSpanElement>;
  fulfilledElement: BaseElement<HTMLSpanElement>;
  config: Config;
  constructor(element: BaseElement<HTMLDivElement>, config?: Config) {
    super(element);
    this.config = Object.assign(getDefaultConfig(), config);
  }
  build(): void {
    const fragment = document.createDocumentFragment();
    this.config.max = this.getMaxAttribute();
    this.config.min = this.getMinAttribute();
    this.config.range = this.getRangeAttribute();
    this.config.step = this.getStepAttribute();
    this.config.value = this.getValueAttribute();
    this.railElement = this.createRailElement();
    this.fulfilledElement = this.createFulfilledElement();
    this.railElement.appendChild(this.fulfilledElement);
    if (this.config.range) {
      (this.config.value as number[]).forEach((value) => {
        const createdThumb = this.createThumb(this.railElement, value);
        this.thumbElement.push(createdThumb);
        this.railElement.appendChild(createdThumb);
      });
    } else {
      const createdThumb = this.createThumb(
        this.railElement,
        this.config.value as number
      );
      this.thumbElement.push(createdThumb);
      this.railElement.appendChild(createdThumb);
    }
    fragment.appendChild(this.railElement.element);
    this.element.element.appendChild(fragment);
  }
  private createThumb(
    railElement: BaseElement<HTMLElement>,
    value: number
  ): BaseElement<HTMLSpanElement> {
    const thumbElement = createBaseElement<HTMLSpanElement>(
      document.createElement("span")
    );
    thumbElement.addClass(`${INPUT_SLIDER_PREFIX}-thumb`);
    const createdThumbTooltipElement = this.createThumbTooltip();
    createdThumbTooltipElement.element.innerHTML = value.toString();
    thumbElement.element.style.transform = `translateX(${
      value * this.config.step
    }px)`; // set default position
    thumbElement.appendChild(createdThumbTooltipElement);
    let isHold = false;
    thumbElement.element.addEventListener("mousedown", (e: MouseEvent) => {
      isHold = true;
      this.config.value = e.clientX - railElement.getBoundingClientRect().left;
    });
    document.addEventListener("mouseup", (e: MouseEvent) => {
      isHold = false;
      this.config.value = e.clientX - railElement.getBoundingClientRect().left;
    });
    document.addEventListener("mousemove", (e: MouseEvent) => {
      const mouseX = e.clientX - railElement.getBoundingClientRect().left;
      const newValue = mouseX / this.config.step;
      const max =  thumbElement.getBoundingClientRect().width /this.config.max;
      const min = thumbElement.getBoundingClientRect().left / this.config.min;
      if (
        isHold &&
        newValue >= this.config.min &&
        newValue <= this.config.max
      ) {
        this.config.value = newValue;
        thumbElement.element.style.transform = `translateX(${parseInt(
          ((mouseX - thumbElement.getBoundingClientRect().width / 2) * this.config.step).toString(),
          10
        )}px)`;
      }
    });
    return thumbElement;
  }
  private createThumbTooltip(): BaseElement<HTMLSpanElement> {
    const thumbTooltipElement = createBaseElement<HTMLSpanElement>(
      document.createElement("span")
    );
    thumbTooltipElement.addClass(`${INPUT_SLIDER_PREFIX}-tooltip`);
    return thumbTooltipElement;
  }
  private createRailElement(): BaseElement<HTMLDivElement> {
    const railElement = createBaseElement<HTMLDivElement>(
      document.createElement("div")
    );
    railElement.addClass(`${INPUT_SLIDER_PREFIX}-rail`);
    return railElement;
  }
  private createFulfilledElement(): BaseElement<HTMLSpanElement> {
    const fulfilledElement = createBaseElement<HTMLSpanElement>(
      document.createElement("span")
    );
    fulfilledElement.addClass(`${INPUT_SLIDER_PREFIX}-fulfilled`);
    return fulfilledElement;
  }
  private getMinAttribute(): number {
    return parseFloat(this.element.getAttribute(`${INPUT_SLIDER_PREFIX}-min`));
  }
  private getMaxAttribute(): number {
    return parseFloat(this.element.getAttribute(`${INPUT_SLIDER_PREFIX}-max`));
  }
  private getStepAttribute(): number {
    return parseFloat(
      this.element.getAttribute(`${INPUT_SLIDER_PREFIX}-step`) || "1"
    );
  }
  private getRangeAttribute(): boolean {
    return this.element.getAttribute(`${INPUT_SLIDER_PREFIX}-range`) === "true"
      ? true
      : false;
  }
  private getValueAttribute(): number[] | number {
    const valueEncoded = this.element.getAttribute(
      `${INPUT_SLIDER_PREFIX}-value`
    );
    if (!!valueEncoded && valueEncoded != "") {
      return JSON.parse(valueEncoded);
    }
    if (this.config.range) {
      return [0, 0];
    }
    return 0;
  }
}
