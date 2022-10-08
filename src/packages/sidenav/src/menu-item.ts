import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { MenuItem as MenuItemType } from "./_common/types";

export class MenuItem extends Component<HTMLElement> {
  private _menuItems: MenuItem[] = [];
  private _isClosed: boolean = true;
  constructor(
    element: BaseElement<HTMLElement>,
    private _menuItem: MenuItemType
  ) {
    super(element);
  }
  build(): void {
    const fragment = document.createDocumentFragment();
    this.element.element.classList.add(`${PREFIX}-sidenav-menu-item`);
    this.element.element.classList.add(`${PREFIX}-sidenav-menu-item-closed`);
    const menuItemHeader = document.createElement("a");
    menuItemHeader.classList.add(`${PREFIX}-sidenav-menu-item-header`);
    this._menuItem.to ? (menuItemHeader.href = this._menuItem.to) : null;
    this._menuItem.iconHTML
      ? (menuItemHeader.innerHTML += `<i class="${PREFIX}-sidenav-menu-icon">${this._menuItem.iconHTML}</i>`)
      : null;
    this._menuItem.title
      ? (menuItemHeader.innerHTML += `<i class="${PREFIX}-sidenav-menu-item-header-title">${this._menuItem.title}</i>`)
      : null;

    const menuItemsDiv = document.createElement("ul");
    menuItemsDiv.classList.add(`${PREFIX}-sidenav-menu-items`);
    if (this._menuItem.children) {
      this._menuItem.children && this._menuItem.children.length > 0
        ? (menuItemHeader.innerHTML += ` <i class="${PREFIX}-sidenav-extend-icon"></i>`)
        : null;
      this._menuItem.children?.forEach((menuItem) => {
        const compiledMenuItem = new MenuItem(
          createBaseElement(document.createElement("li")),
          menuItem
        );
        compiledMenuItem.build();
        this._menuItems.push(compiledMenuItem);
        menuItemsDiv.appendChild(compiledMenuItem.element.element);
      });
      menuItemHeader.addEventListener("click", (e) => {
        if (this._isClosed) {
          this.open();
        } else {
          this.close();
        }
      });
    }
    fragment.appendChild(menuItemHeader);
    fragment.appendChild(menuItemsDiv);
    this.element.element.appendChild(fragment);
  }
  close() {
    this.element.element.classList.add(`${PREFIX}-sidenav-menu-item-closed`);
    this._isClosed = true;
    this._menuItems.forEach((menuItem) => menuItem.close());
  }
  open() {
    this.element.element.classList.remove(`${PREFIX}-sidenav-menu-item-closed`);
    this._isClosed = false;
  }
}
