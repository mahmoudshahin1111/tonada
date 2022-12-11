import _ from "lodash";
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
    this.railElement = this.createRailElement();
    this.fulfilledElement = this.createFulfilledElement();
    this.railElement.appendChild(this.fulfilledElement);
    if (this.isRange()) {
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
    thumbElement.setObjectRef<{ value: number[] | number }>({
      value: this.isRange()
        ? (this.getValue() as number[])
        : (this.getValue() as number),
    });
    thumbElement.addClass(`${INPUT_SLIDER_PREFIX}-thumb`);
    const createdThumbTooltipElement = this.createThumbTooltip();
    createdThumbTooltipElement.element.innerHTML = value.toString();
    thumbElement.element.style.transform = `translateX(${
      value * this.getStep()
    }px)`; // set default position
    thumbElement.appendChild(createdThumbTooltipElement);
    let isHold = false;
    thumbElement.element.addEventListener("mousedown", (e: MouseEvent) => {
      isHold = true;
    });
    document.addEventListener("mouseup", (e: MouseEvent) => {
      isHold = false;
    });
    document.addEventListener("mousemove", (e: MouseEvent) => {
      if (!isHold) return;
     
      const thumbWidth = thumbElement.getBoundingClientRect().width;
      const mousePositionOnRail =
      e.clientX - railElement.getBoundingClientRect().left;
      const minRailLength = 0;
      const maxRailLength =
        minRailLength + railElement.getBoundingClientRect().width;

      if (
        mousePositionOnRail < minRailLength ||
        mousePositionOnRail > maxRailLength
      )
        return;

      if (this.isRange()) {
      } else {
        const thumbPosition = Math.round((mousePositionOnRail / maxRailLength) * (maxRailLength / this.getStep())) * this.getStep()
        const newValue = Math.round((thumbPosition / maxRailLength) * this.getMax());
        // update thumb position
        thumbElement.element.style.transform = `translateX(${thumbPosition -  (thumbWidth/2)}px)`;
        console.log(thumbPosition,`new value:${newValue}`);
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
