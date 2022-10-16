import _ from "lodash";
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
  public menuItemsElement: BaseElement<HTMLUListElement>;
  build(): void {
    this.element.element.classList.add(
      `${SIDENAV_PREFIX}-floating-menu`,
      `${SIDENAV_PREFIX}-menu-item`,
      `${SIDENAV_PREFIX}-floating-menu-hidden`
    );
    const fragment = document.createDocumentFragment();
    this.headerElement = createBaseElement<HTMLAnchorElement>(
      document.createElement("a")
    );
    this.headerElement.addClass(`${SIDENAV_PREFIX}-menu-item-header`);
    fragment.appendChild(this.headerElement.element);

    this.menuItemsElement = createBaseElement(document.createElement("ul"));
    this.menuItemsElement.addClass(`${SIDENAV_PREFIX}-menu-items`);
    fragment.appendChild(this.menuItemsElement.element);
    this.element.element.appendChild(fragment);
  }
  open(menuItem: MenuItem) {
    const bounding = menuItem.element.getBoundingClientRect();
    this.element.element.style.left = `${bounding.right}px`;
    this.element.element.style.top = `${bounding.top}px`;
    this.headerElement.element.innerHTML = ``;
    this.menuItemsElement.element.innerHTML = ``;
    menuItem.config.to
      ? (this.headerElement.element.href = menuItem.config.to)
      : null;
    menuItem.config.iconHTML
      ? (this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-icon">${menuItem.config.iconHTML}</i>`)
      : null;
    menuItem.config.title
      ? (this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-item-header-title">${menuItem.config.title}</i>`)
      : null;

    if (menuItem.config.children?.length) {
      this.headerElement.element.innerHTML += ` <i class="${SIDENAV_PREFIX}-extend-icon"></i>`;
      menuItem.config.children?.forEach((menuItem) => {
        const compiledMenuItem = new MenuItem(
          createBaseElement(document.createElement("li")),
          menuItem
        );
        compiledMenuItem.build();
        this.menuItemsElement.appendChild(compiledMenuItem.element);
      });
    }
    this.element.removeClass(`${SIDENAV_PREFIX}-floating-menu-hidden`);
  }
  close() {
    this.element.element.removeAttribute("style");
    this.element.addClass(`${SIDENAV_PREFIX}-floating-menu-hidden`);
  }
}
