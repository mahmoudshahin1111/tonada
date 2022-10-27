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
  constructor(element: BaseElement<HTMLElement>) {
    super(element);
  }
  build(): void {
    this.element.element.classList.add(
      `${SIDENAV_PREFIX}-floating-menu`,
      `${SIDENAV_PREFIX}-menu-item`,
      `${SIDENAV_PREFIX}-menu-item-closed`,
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
    this.headerElement.element.innerHTML = ``;
    this.menuItemsElement.element.innerHTML = ``;
    const bounding = menuItem.element.getBoundingClientRect();
    this.element.element.style.top = `${bounding.top}px`;
    if (window.innerHeight - bounding.top < 300) {
      this.element.element.style.bottom = `0px`;
    } else {
      this.element.element.style.bottom = "";
    }
    if (menuItem.config.iconHTML) {
      let iconHTML = menuItem.config.iconHTML;
      if (typeof menuItem.config.iconHTML === "function") {
        iconHTML = (menuItem.config.iconHTML as Function).bind(
          this,
          menuItem.config
        )();
      } else if (typeof menuItem.config.iconHTML === "object") {
        iconHTML = (menuItem.config.iconHTML as HTMLElement).innerHTML;
      }
      this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-icon">${iconHTML}</i>`;
    }

    if (menuItem.config.title) {
      let title = menuItem.config.title;
      if (typeof menuItem.config.title === "function") {
        title = (menuItem.config.title as Function).bind(
          this,
          menuItem.config
        )();
      } else if (typeof menuItem.config.title === "object") {
        title = (menuItem.config.title as HTMLElement).title;
      }
      this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-item-header-title">${title}</i>`;
    }

    if (menuItem.config.children?.length) {
      this.headerElement.element.innerHTML += ` <i class="${SIDENAV_PREFIX}-extend-icon"></i>`;
      menuItem.config.children?.forEach((menuItem) => {
        const compiledMenuItem = new MenuItem(
          createBaseElement(document.createElement("button")),
          menuItem
        );
        compiledMenuItem.build();
        this.menuItemsElement.appendChild(compiledMenuItem.element);
      });
    }
    this.element.removeClass(`${SIDENAV_PREFIX}-floating-menu-hidden`);
    this.element.removeClass(`${SIDENAV_PREFIX}-menu-item-closed`);
  }
  close() {
    this.element.addClass(`${SIDENAV_PREFIX}-menu-item-closed`);
    this.element.addClass(`${SIDENAV_PREFIX}-floating-menu-hidden`);
  }
}
