import { BaseElement } from "tonada-shared";

export class SliderItem {
    constructor(public element: BaseElement<HTMLElement>, options: { width: number }) {
      this.element.setStyle("width", `${options.width}px`);
    }
  }