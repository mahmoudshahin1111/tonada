/**
 * examples to make you inspire what you need to do
 * https://splidejs.com/
 *
 */

import { BaseElement } from "./base-element";
import { PREFIX } from "./shared";

export class Slider {
  private _list: BaseElement;
  private _sliderItems: SliderItem[] = [];
  private _prevButton: SliderButton;
  private _nextButton: SliderButton;
  private _step = 0;
  constructor(private _element: BaseElement, private options?: SliderOptions) {
    this._list = this._element.querySelector(`:scope > .${PREFIX}-list`).at(0);
    this._list
      .querySelector(`:scope > .${PREFIX}-list-item`)
      .forEach((element) => {
        this._sliderItems.push(new SliderItem(element,((this._list.getWidth() / this.options?.itemsPerPage) - (this.options.spaceBetween /2))));
      });
    const sliderButtons = this._element
      .querySelector(`:scope > .${PREFIX}-slider-buttons > button`)
      .map((element) => new SliderButton(element));
    this._prevButton = sliderButtons.at(0);
    this._nextButton = sliderButtons.at(1);
    this._prevButton.onClick = () => {
      console.log("prev button clicked");
      this.prevSlider();
    };
    this._nextButton.onClick = () => {
      console.log("next button clicked");
      this.nextSlider();
    };

    this._sliderItems.forEach((sliderItem, i) => {
      sliderItem.element.setStyle(
        "transform",
        `translateX(${(this._list.getWidth() / this.options?.itemsPerPage) * i}px)`
      );
    });
  }
  prevSlider() {
    if(this._step < this.options.itemsPerPage) return;
    this._step -= this.options.itemsPerPage;
    this._sliderItems.forEach((_sliderItem, i) => {
      _sliderItem.element.setStyle(
        "transform",
        `translateX(${(i - this._step) * (_sliderItem.element.getWidth() + this.options.spaceBetween /2)}px)`
      );
    });
  }
  nextSlider() {
    if(this._step > this.options.itemsPerPage) return;
    this._step += this.options.itemsPerPage;
    this._sliderItems.forEach((_sliderItem, i) => {
      _sliderItem.element.setStyle(
        "transform",
        `translateX(${(i - this._step) * (_sliderItem.element.getWidth() + this.options.spaceBetween /2)}px)`
      );
    });
  }
}

class SliderItem {
  constructor(public element: BaseElement,width:number) {
    this.element.setStyle("width", `${width}px`);
  }
}

class SliderButton {
  onClick: () => void;
  constructor(private _element: BaseElement) {
    this._element.onEvent("click", () => {
      this.onClick();
    });
  }
}

export type SliderOptions = {
  itemsPerPage?: number;
  spaceBetween?: number;
};
