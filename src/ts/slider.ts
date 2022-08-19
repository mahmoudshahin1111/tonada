/**
 * examples to make you inspire what you need to do
 * https://splidejs.com/
 *
 */

import { BaseElement } from "./base-element";
import { PREFIX } from "./shared";

export interface SliderSlidingAnimationState {
  sliderToPage(slider: Slider, page: number): void;
  init(slider: Slider): void;
  getPagesCount(slider: Slider): number;
  prevSlider(slider: Slider): void;
  nextSlider(slider: Slider): void;
  goToPage(slider:Slider,page:number):void;
}

export class SliderSwitchMovingState implements SliderSlidingAnimationState {

  init(slider: Slider): void {
    slider.sliderItems.forEach((sliderItem, i) => {
      sliderItem.element.setStyle(
        "transform",
        `translateX(${
          (slider.list.getWidth() / slider.options?.itemsPerPage) * i
        }px)`
      );
    });
  }
  sliderToPage(slider: Slider, page: number): void {
    slider.sliderPaginator.setActivePage(
      Math.ceil(page / slider.options.itemsPerPage)
    );
    slider.sliderItems.forEach((_sliderItem, i) => {
      _sliderItem.element.setStyle(
        "transform",
        `translateX(${
          (i - page) *
          (_sliderItem.element.getWidth() + slider.options.spaceBetween)
        }px)`
      );
    });
  }
  getPagesCount(slider: Slider) {
    return Math.ceil(slider.sliderItems.length / slider.options.itemsPerPage);
  }
  prevSlider(slider: Slider) {
    if (slider.page <= 0) return;
    slider.page -= slider.options.itemsPerPage;
    this.sliderToPage(slider, slider.page);
  }
  nextSlider(slider: Slider) {
    if (slider.page * slider.options.itemsPerPage >=  slider.sliderItems.length - 2) return;
    slider.page += slider.options.itemsPerPage;
    this.sliderToPage(slider, slider.page);
  }
  goToPage(slider: Slider, page: number): void {
    slider.page = page * slider.options.itemsPerPage;
    console.log(`go to page ${slider.page }`);
    this.sliderToPage(slider, slider.page );
  }
}

export class SliderSwitchFadingState implements SliderSlidingAnimationState {
  init(slider: Slider): void {
    slider.sliderItems.forEach((sliderItem, i) => {
      sliderItem.element.setStyle("opacity", `0`);
      sliderItem.element.setStyle("left", `0px`);
      sliderItem.element.setStyle("width", `100%`);
    });
    this.sliderToPage(slider, 0);
  }

  sliderToPage(slider: Slider, page: number): void {
    slider.page = page ;
    slider.sliderPaginator.setActivePage(page);
    slider.sliderItems.forEach((sliderItem, i) => {
      if (i === page) {
        sliderItem.element.setStyle("opacity", `1`);
      } else {
        sliderItem.element.setStyle("opacity", `0`);
      }
    });
  }
  getPagesCount(slider: Slider) {
    return slider.sliderItems.length;
  }
  prevSlider(slider: Slider) {
    if (slider.page === 0) return;
    slider.page -= 1;
    this.sliderToPage(slider, slider.page);
  }
  nextSlider(slider: Slider) {
    if (slider.page === slider.sliderItems.length - 1) return;
    slider.page += 1;
    this.sliderToPage(slider, slider.page);
  }
  goToPage(slider: Slider, page: number): void {
    this.sliderToPage(slider, page);
  }
}

export class Slider {
  list: BaseElement;
  sliderItems: SliderItem[] = [];
  prevButton: BaseElement;
  nextButton: BaseElement;
  sliderPaginator: SliderPaginator;
  sliderSlidingAnimationState: SliderSlidingAnimationState;
  page = 0;
  constructor(private _element: BaseElement, public options?: SliderOptions) {
    this.options = Object.assign({
      itemsPerPage:1,
      slideAnimation:'moving',
      spaceBetween:0
    } as SliderOptions,this.options);
    this.sliderSlidingAnimationState = new SliderSwitchMovingState();
    if(this.options.slideAnimation === 'fading'){
      this.sliderSlidingAnimationState = new SliderSwitchFadingState();
    }
    this.list = this._element.querySelector(`:scope > .${PREFIX}-list`).at(0);
    this.list
      .querySelector(`:scope > .${PREFIX}-list-item`)
      .forEach((element) => {
        this.sliderItems.push(
          new SliderItem(
            element,
            this.list.getWidth() / this.options?.itemsPerPage -
              this.options.spaceBetween / 2
          )
        );
      });
    this.sliderPaginator = new SliderPaginator(
      this._element.querySelector(`:scope > .${PREFIX}-slider-paginator`).at(0),
      this.sliderSlidingAnimationState.getPagesCount(this)
    );
    const sliderButtons = this._element.querySelector(
      `:scope > .${PREFIX}-slider-button`
    );
    this.prevButton = sliderButtons.at(0);
    this.nextButton = sliderButtons.at(1);
    this.prevButton.onEvent("click", () => {
      console.log("prev button clicked");
      this.prevSlider();
    });
    this.nextButton.onEvent("click", () => {
      console.log("next button clicked");
      this.nextSlider();
    });
    this.sliderPaginator.onPageClicked = (page) => {
      this.goToPage(page);
    };
    this.sliderSlidingAnimationState.init(this);
    this.sliderPaginator.setActivePage(this.page);
    if(this.sliderItems.length / this.options.itemsPerPage <= 1){
      this.sliderPaginator._element.hide();
      this.nextButton.hide();
      this.prevButton.hide();
    }
  }
  prevSlider() {
    this.sliderSlidingAnimationState.prevSlider(this);
  }
  nextSlider() {
    this.sliderSlidingAnimationState.nextSlider(this);
  }
  goToPage(page: number) {
    this.sliderSlidingAnimationState.goToPage(this, page);
  }
}

class SliderItem {
  constructor(public element: BaseElement, width: number) {
    this.element.setStyle("width", `${width}px`);
  }
}

class SliderPaginator {
  onPageClicked: (page: number) => void;
  private _pages: BaseElement[] = [];
  constructor(public _element: BaseElement, pages: number) {
    for (let page = 0; page < pages; page++) {
      this.createPage(page);
    }
  }
  private createPage(page: number) {
    const pageElement = document.createElement("span");
    const baseElement = new BaseElement(pageElement);
    baseElement.addClass(`${PREFIX}-slider-paginator-page`);
    baseElement.setAttribute("data-page", page.toString());
    baseElement.onEvent("click", () => {
      this.onPageClicked(page);
    });
    this._element.element.appendChild(baseElement.element);
    this._pages.push(baseElement);
  }
  setActivePage(page: number) {
    this._pages.forEach((pageElement) => {
      if (pageElement.getAttribute("data-page") === page.toString()) {
        pageElement.addClass(`${PREFIX}-active`);
      } else {
        pageElement.removeClass(`${PREFIX}-active`);
      }
    });
  }

}

export type SliderOptions = {
  itemsPerPage?: number;
  spaceBetween?: number;
  slideAnimation?: "moving" | "fading";
};
