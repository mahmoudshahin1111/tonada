import _ from "lodash";
import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { MenuItem } from "./menu-item";
import { Sidenav } from "./sidenav";
import { SIDENAV_PREFIX } from "./_common/utils";

export class FloatingMenu extends Component<HTMLElement> {
  constructor(public parent:Sidenav ,element: BaseElement<HTMLElement>) {
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
    this.element.element.innerHTML = '';
    const bounding = menuItem.element.getBoundingClientRect();
    this.element.element.style.top = `${bounding.top}px`;
    if (window.innerHeight - bounding.top < 300) {
      this.element.element.style.bottom = `0px`;
    } else {
      this.element.element.style.bottom = "";
    }
    const fragment = MenuItem.clone(menuItem,{extendDisabled:false});
    this.element.element.appendChild(fragment);
    this.element.removeClass(`${SIDENAV_PREFIX}-floating-menu-hidden`);
    this.element.removeClass(`${SIDENAV_PREFIX}-menu-item-closed`);
  }
  close() {
    this.element.addClass(`${SIDENAV_PREFIX}-menu-item-closed`);
    this.element.addClass(`${SIDENAV_PREFIX}-floating-menu-hidden`);
  }
}
