import { Slider } from "./slider";
import { Slider as SliderType } from "./_common/types";



export class DefaultSlider extends SliderType {
    constructor(private _baseSlider: Slider) {
      super();
    }
  
    build(): void {
      this._baseSlider.build();
      this._baseSlider.prevButton.onEvent("click", () => {
        this.prevSlider();
      });
      this._baseSlider.nextButton.onEvent("click", () => {
        this.nextSlider();
      });
      this._baseSlider.sliderPaginator.onPageClicked = (page:number) => {
        this.goToPage(page);
      };
      this._baseSlider.sliderItems.forEach((sliderItem, i) => {
        sliderItem.element.setStyle(
          "transform",
          `translateX(${
            (this._baseSlider.list.getWidth() /
              this._baseSlider.options?.itemsPerPage) *
            i
          }px)`
        );
      });
      this._baseSlider.sliderPaginator.setActivePage(this._baseSlider.page);
      this.sliderToPage(this._baseSlider.page);
    }
    prevSlider() {
      if (this._baseSlider.page <= 0) return;
      this._baseSlider.page -= this._baseSlider.options.itemsPerPage;
      this.sliderToPage(this._baseSlider.page);
    }
    nextSlider() {
      console.log(
        this._baseSlider.page * this._baseSlider.options.itemsPerPage >=
          this._baseSlider.sliderItems.length - 2,
        this._baseSlider.page,
        this._baseSlider.options.itemsPerPage
      );
  
      if (
        this._baseSlider.page * this._baseSlider.options.itemsPerPage >=
        this._baseSlider.sliderItems.length - 2
      )
        return;
      this._baseSlider.page += this._baseSlider.options.itemsPerPage;
      this.sliderToPage(this._baseSlider.page);
    }
    goToPage(page: number) {
      this._baseSlider.page = page * this._baseSlider.options.itemsPerPage;
      this.sliderToPage(this._baseSlider.page);
    }
    getPagesCount(): number {
      return this._baseSlider.getPagesCount();
    }
    sliderToPage(page: number): void {
      // mark the current page as active
      this._baseSlider.sliderPaginator.setActivePage(
        Math.ceil(page / this._baseSlider.options.itemsPerPage)
      );
      // if the page items less than the items per page then adjust the item width
      this._baseSlider.sliderItems.forEach((_sliderItem, i) => {
        if (
          this._baseSlider.sliderItems.length - page <
            this._baseSlider.options.itemsPerPage &&
          i >= page
        ) {
          const calculatedWidth =
            this._baseSlider.list.getWidth() /
              (this._baseSlider.sliderItems.length - page) -
            this._baseSlider.options.spaceBetween / 2;
          _sliderItem.element.setStyle("width", `${calculatedWidth}px`);
        }
        // move the item to the correct position
        _sliderItem.element.setStyle(
          "transform",
          `translateX(${
            (i - page) *
            (_sliderItem.element.getWidth() +
              this._baseSlider.options.spaceBetween)
          }px)`
        );
      });
    }
  }