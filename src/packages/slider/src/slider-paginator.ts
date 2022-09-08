import { BaseElement, PREFIX } from "tonada-shared";

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