import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { MenuItem } from "./menu-item";
import { SIDENAV_PREFIX } from "./_common/utils";



export class FloatingMenu extends Component<HTMLElement> {
  public headerElement: BaseElement<HTMLAnchorElement>;
  public menuItems: FloatingMenu[];
  build(): void {
    this.element.element.classList.add(`${SIDENAV_PREFIX}-floating-menu`,`${SIDENAV_PREFIX}-floating-menu-hidden`);
    const fragment = document.createDocumentFragment();
    this.element.element.style.top = "0px";
    this.element.element.style.left = "0px";
    this.headerElement = createBaseElement(document.createElement("a"));
    this.headerElement.addClass(`${SIDENAV_PREFIX}-floating-menu-item-header`);
    fragment.appendChild(this.headerElement.element);
    this.element.element.appendChild(fragment);
  }
  render(menuItem: MenuItem) {
    this.headerElement.element.innerHTML = ``;
    menuItem.config.to ? (this.headerElement.element.href = menuItem.config.to) : null;
    menuItem.config.iconHTML
      ? (this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-floating-menu-item-icon">${menuItem.config.iconHTML}</i>`)
      : null;
      menuItem.config.title
      ? (this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-floating-menu-item-header-title">${menuItem.config.title}</i>`)
      : null;
  }
}
