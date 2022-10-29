import _ from "lodash";
import { BaseElement, Component } from "tonada-shared";
import { MenuItem } from "./menu-item";
import { Sidenav } from "./sidenav";
import { SIDENAV_PREFIX } from "./_common/utils";

export class FloatingMenu extends Component<HTMLElement> {
  private openedMenuItem: MenuItem | undefined;
  constructor(public parent: Sidenav, element: BaseElement<HTMLElement>) {
    super(element);
  }
  build(): void {
    this.element.element.classList.add(
      `${SIDENAV_PREFIX}-floating-menu`,
      `${SIDENAV_PREFIX}-menu-item`,
      `${SIDENAV_PREFIX}-menu-item-closed`,
      `${SIDENAV_PREFIX}-floating-menu-hidden`
    );
  }
  open(menuItem: MenuItem) {
    if (this.openedMenuItem) {
      this.openedMenuItem.element.element.classList.remove(
        `${SIDENAV_PREFIX}-menu-item-active`
      );
    }
    this.openedMenuItem = menuItem;
    this.element.element.innerHTML = "";
    const bounding = menuItem.element.getBoundingClientRect();
    this.element.element.style.top = `${bounding.top}px`;
    this.element.element.style.maxHeight = "";
    if (menuItem.config?.children?.length) {
      if (window.innerHeight - bounding.top < 300) {
        this.element.element.style.maxHeight = `${
          window.innerHeight - bounding.top
        }px`;
      }
    }
    const fragment = MenuItem.clone(menuItem, { extendDisabled: false });
    this.element.element.appendChild(fragment);
    this.element.removeClass(`${SIDENAV_PREFIX}-floating-menu-hidden`);
    this.element.removeClass(`${SIDENAV_PREFIX}-menu-item-closed`);
    this.openedMenuItem.element.element.classList.add(
      `${SIDENAV_PREFIX}-menu-item-active`
    );
  }
  close() {
    this.element.addClass(`${SIDENAV_PREFIX}-menu-item-closed`);
    this.element.addClass(`${SIDENAV_PREFIX}-floating-menu-hidden`);
    if (this.openedMenuItem) {
      this.openedMenuItem.element.element.classList.remove(
        `${SIDENAV_PREFIX}-menu-item-active`
      );
    }
  }
}
