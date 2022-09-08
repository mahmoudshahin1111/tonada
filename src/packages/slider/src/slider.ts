import {
  BaseElement,
  Component,
  PREFIX,
} from "tonada-shared";
import { Slider as SliderType } from "..";
import { SliderItem } from "./slider-item";
import { SliderPaginator } from "./slider-paginator";
import { getDefaultSliderOptions } from "./_common/getDefaultSliderOptions";
import { SliderOptions } from "./_common/types";


export class Slider extends Component implements SliderType {
  list: BaseElement<HTMLElement>;
  sliderItems: SliderItem[] = [];
  prevButton: BaseElement<HTMLElement>;
  nextButton: BaseElement<HTMLElement>;
  sliderPaginator: SliderPaginator;
  page: number = 0;
  constructor(element: BaseElement<HTMLElement>, public options?: SliderOptions) {
    super(element);
  }
  build(): void {
    this.options = Object.assign(getDefaultSliderOptions(), this.options);
    this.list = this.element.querySelector(`:scope > .${PREFIX}-list`).at(0);
    this.list
      .querySelector(`:scope > .${PREFIX}-list-item`)
      .forEach((element) => {
        const calculatedWidth =
          this.list.getWidth() / this.options?.itemsPerPage -
          this.options.spaceBetween / 2;
        this.sliderItems.push(
          new SliderItem(element, { width: calculatedWidth })
        );
      });
    this.sliderPaginator = new SliderPaginator(
      this.element.querySelector(`:scope > .${PREFIX}-slider-paginator`).at(0),
      this.getPagesCount()
    );
    const sliderButtons = this.element.querySelector(
      `:scope > .${PREFIX}-slider-button`
    );
    this.prevButton = sliderButtons.at(0);
    this.nextButton = sliderButtons.at(1);
    if (!this.options.navigators) {
      this.nextButton.hide();
      this.prevButton.hide();
    }
    if (!this.options.paginator) {
      this.sliderPaginator.element.hide();
    }
  }
  getPagesCount(): number {
    return Math.ceil(this.sliderItems.length / this.options.itemsPerPage);
  }
  prevSlider(): void {}
  nextSlider(): void {}
  goToPage(page: number): void {}
}
