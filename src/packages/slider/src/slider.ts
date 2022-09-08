import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";

export function getDefaultSliderOptions(): SliderOptions {
  return {
    itemsPerPage: 1,
    slideAnimation: "moving",
    spaceBetween: 0,
    paginator: true,
    navigators: true,
    infinite: false,
    infiniteSlidingDuration: 2000,
  } as SliderOptions;
}
// -------------------------------------------------------------------------------------------------
export function create(
  element: HTMLDivElement,
  options?: SliderOptions
): Slider {
  const baseSlider = new BaseSlider(createBaseElement(element), options);
  let component: Slider = new DefaultSlider(baseSlider);
  if (options.slideAnimation === "fading") {
    component = new FadingSlider(baseSlider);
  }
  component.build();
  return component;
}
// -------------------------------------------------------------------------------------------------
export abstract class Slider {
  abstract build(): void;
  abstract prevSlider(): void;
  abstract nextSlider(): void;
  abstract goToPage(page: number): void;
  abstract getPagesCount(): number;
}
// -------------------------------------------------------------------------------------------------

export class BaseSlider extends Component implements Slider {
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

// -------------------------------------------------------------------------------------------------

export class DefaultSlider extends Slider {
  constructor(private _baseSlider: BaseSlider) {
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
    this._baseSlider.sliderPaginator.onPageClicked = (page) => {
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

// -------------------------------------------------------------------------------------------------
export class FadingSlider extends Slider {
  private _autoSlidingIntervalId: NodeJS.Timer;
  constructor(private _baseSlider: BaseSlider) {
    super();
  }

  build(): void {
    this._baseSlider.options.itemsPerPage = 1;
    this._baseSlider.build();
    this._baseSlider.prevButton.onEvent("click", () => {
      this.prevSlider();
    });
    this._baseSlider.nextButton.onEvent("click", () => {
      this.nextSlider();
    });
    this._baseSlider.sliderPaginator.onPageClicked = (page) => {
      this.goToPage(page);
    };
    this._baseSlider.sliderItems.forEach((sliderItem, i) => {
      sliderItem.element.setStyle("opacity", `0`);
      sliderItem.element.setStyle("left", `0px`);
      sliderItem.element.setStyle("width", `100%`);
    });
    this.sliderToPage(this._baseSlider.page);
    this._baseSlider.sliderPaginator.setActivePage(this._baseSlider.page);
    if (this._baseSlider.options.infinite) {
      this.enableAutoSliding();
    }
  }
  prevSlider() {
    if (this._baseSlider.page === 0) return;
    this._baseSlider.page -= 1;
    this.sliderToPage(this._baseSlider.page);
  }
  nextSlider() {
    if (this._baseSlider.page === this._baseSlider.sliderItems.length - 1)
      return;
    this._baseSlider.page += 1;
    this.sliderToPage(this._baseSlider.page);
  }
  goToPage(page: number) {
    this.sliderToPage(page);
  }
  getPagesCount(): number {
    return this._baseSlider.getPagesCount();
  }
  sliderToPage(page: number): void {
    this._baseSlider.page = page;
    this._baseSlider.sliderPaginator.setActivePage(page);
    this._baseSlider.sliderItems.forEach((sliderItem, i) => {
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
        this._baseSlider.sliderPaginator.setActivePage(0);
      } else {
        this.nextSlider();
      }
    }, this._baseSlider.options.infiniteSlidingDuration);
  }
  isLastPage(): boolean {
    return this._baseSlider.page === this.getPagesCount() - 1;
  }
}
// -------------------------------------------------------------------------------------------------
export class SliderItem {
  constructor(public element: BaseElement<HTMLElement>, options: { width: number }) {
    this.element.setStyle("width", `${options.width}px`);
  }
}
// -------------------------------------------------------------------------------------------------
export class SliderPaginator {
  onPageClicked: (page: number) => void;
  private _pages: BaseElement<HTMLElement>[] = [];
  constructor(public element: BaseElement<HTMLElement>, pages: number) {
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
    this.element.element.appendChild(baseElement.element);
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
// -------------------------------------------------------------------------------------------------
type SliderOptions = {
  itemsPerPage?: number;
  spaceBetween?: number;
  slideAnimation?: "moving" | "fading";
  infinite?: boolean;
  paginator?: boolean;
  navigators?: boolean;
  infiniteSlidingDuration?: number;
};
// -------------------------------------------------------------------------------------------------
