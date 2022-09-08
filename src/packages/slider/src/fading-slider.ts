// import { Slider } from "..";
import { Slider } from "./slider";
import { Slider as SliderType } from "./_common/types";

export class FadingSlider extends SliderType {
    private _autoSlidingIntervalId: NodeJS.Timer;
    constructor(private _slider: Slider) {
      super();
    }
  
    build(): void {
      this._slider.options.itemsPerPage = 1;
      this._slider.build();
      this._slider.prevButton.onEvent("click", () => {
        this.prevSlider();
      });
      this._slider.nextButton.onEvent("click", () => {
        this.nextSlider();
      });
      this._slider.sliderPaginator.onPageClicked = (page:number) => {
        this.goToPage(page);
      };
      this._slider.sliderItems.forEach((sliderItem, i) => {
        sliderItem.element.setStyle("opacity", `0`);
        sliderItem.element.setStyle("left", `0px`);
        sliderItem.element.setStyle("width", `100%`);
      });
      this.sliderToPage(this._slider.page);
      this._slider.sliderPaginator.setActivePage(this._slider.page);
      if (this._slider.options.infinite) {
        this.enableAutoSliding();
      }
    }
    prevSlider() {
      if (this._slider.page === 0) return;
      this._slider.page -= 1;
      this.sliderToPage(this._slider.page);
    }
    nextSlider() {
      if (this._slider.page === this._slider.sliderItems.length - 1)
        return;
      this._slider.page += 1;
      this.sliderToPage(this._slider.page);
    }
    goToPage(page: number) {
      this.sliderToPage(page);
    }
    getPagesCount(): number {
      return this._slider.getPagesCount();
    }
    sliderToPage(page: number): void {
      this._slider.page = page;
      this._slider.sliderPaginator.setActivePage(page);
      this._slider.sliderItems.forEach((sliderItem, i) => {
        if (i === page) {
          sliderItem.element.setStyle("opacity", `1`);
        } else {
          sliderItem.element.setStyle("opacity", `0`);
        }
      });
    }
    enableAutoSliding() {
      if (this._autoSlidingIntervalId) {
        clearInterval(this._autoSlidingIntervalId);
      }
      this._autoSlidingIntervalId = setInterval(() => {
        if (this.isLastPage()) {
          this.sliderToPage(0);
          this._slider.sliderPaginator.setActivePage(0);
        } else {
          this.nextSlider();
        }
      }, this._slider.options.infiniteSlidingDuration);
    }
    isLastPage(): boolean {
      return this._slider.page === this.getPagesCount() - 1;
    }
  }