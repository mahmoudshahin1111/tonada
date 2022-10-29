import { BaseElement, Component, PREFIX } from "tonada-shared";

export class Menu extends Component {
  constructor(element: BaseElement<HTMLElement>) {
    super(element);
  }
  build(): void {
    this.element.addClass(`${PREFIX}-menu`);
    const fragment = document.createDocumentFragment();
    this.element.element(fragment);
  }
}
