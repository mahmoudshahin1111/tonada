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
  build(): void {
    this.element.element.classList.add(
      `${SIDENAV_PREFIX}-floating-menu`,
      `${SIDENAV_PREFIX}-menu-item`,
      `${SIDENAV_PREFIX}-floating-menu-hidden`
    );
    this.element.element.style.top = "0px";
    this.element.element.style.left = "0px";
  }
  render(menuItem: MenuItem) {
    this.element.element.innerHTML = ``;
    const fragment = document.createDocumentFragment();
    const headerElement = createBaseElement<HTMLAnchorElement>(document.createElement("a"));
    headerElement.addClass(`${SIDENAV_PREFIX}-menu-item-header`);
    fragment.appendChild(headerElement.element);
    menuItem.config.to ? (headerElement.element.href = menuItem.config.to) : null;
    menuItem.config.iconHTML
      ? (headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-icon">${menuItem.config.iconHTML}</i>`)
      : null;
      menuItem.config.title
      ? (headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-item-header-title">${menuItem.config.title}</i>`)
      : null;
      
    if(menuItem.config.children?.length){
      const menuItemsDiv = createBaseElement(document.createElement("ul"));
      fragment.appendChild(menuItemsDiv.element);
      menuItemsDiv.element.classList.add(`${SIDENAV_PREFIX}-menu-items`);
      headerElement.element.innerHTML += ` <i class="${SIDENAV_PREFIX}-extend-icon"></i>`;
      menuItem.config.children?.forEach((menuItem) => {
        const compiledMenuItem = new MenuItem(
          createBaseElement(document.createElement("li")),
          menuItem
        );
        compiledMenuItem.build();
        menuItemsDiv.appendChild(compiledMenuItem.element);
      });
    }


    this.element.element.appendChild(fragment);
  }
}
