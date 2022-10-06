import { BaseElement, Component, PREFIX } from "tonada-shared";
import { Config, MenuItem } from "./_common/types";

export class Menu extends Component {
  constructor(element: BaseElement<HTMLSelectElement>, public config?: Config) {
    super(element);
  }
  build(): void {
    const fragment = document.createDocumentFragment();
    this.element.addClass(`${PREFIX}-menu`);
    const menuItemsDiv = document.createElement("ul");
    menuItemsDiv.classList.add(`${PREFIX}-menu-items`);
    this.config.menuItems.forEach((menuItem) => {
      menuItemsDiv.appendChild(
        this.buildMenuItem(document.createElement("li"), menuItem)
      );
    });
    const toggleButton = document.createElement("button");
    toggleButton.classList.add(`${PREFIX}-menu-toggler`);
    fragment.appendChild(menuItemsDiv);
    fragment.appendChild(toggleButton);
    this.element.element.appendChild(fragment);
  }

  buildMenuItem(element: HTMLElement, menuItem: MenuItem) {
    element.classList.add(`${PREFIX}-menu-item`);
    element.classList.add(`${PREFIX}-menu-item-closed`);
    const menuItemHeader = document.createElement("a");
    menuItemHeader.classList.add(`${PREFIX}-menu-item-header`);
    menuItem.to ? (menuItemHeader.href = menuItem.to) : null;
    menuItem.iconHTML
      ? (menuItemHeader.innerHTML += `<i class="${PREFIX}-menu-icon">${menuItem.iconHTML}</i>`)
      : null;
    menuItem.title
      ? (menuItemHeader.innerHTML += `<i class="${PREFIX}-menu-item-header-title">${menuItem.title}</i>`)
      : null;
    element.appendChild(menuItemHeader);
    const menuItemsDiv = document.createElement("ul");
    menuItemsDiv.classList.add(`${PREFIX}-menu-items`);
    if (menuItem.children) {
      menuItem.children && menuItem.children.length > 0
        ? (menuItemHeader.innerHTML += ` <i class="${PREFIX}-extend-icon"></i>`)
        : null;
      menuItem.children?.forEach((menuItem) => {
        menuItemsDiv.appendChild(
          this.buildMenuItem(document.createElement("li"), menuItem)
        );
      });
      menuItemHeader.addEventListener("click", (e) => {
        element.classList.toggle(`${PREFIX}-menu-item-closed`);
      });
    }
    element.appendChild(menuItemsDiv);
    return element;
  }
}
