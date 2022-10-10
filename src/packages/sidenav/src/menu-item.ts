import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { MenuItem as MenuItemType, MenuItemOptions } from "./_common/types";
import { getDefaultMenuItemOptions, SIDENAV_PREFIX } from "./_common/utils";

export class MenuItem extends Component<HTMLElement> {
  public headerElement:BaseElement<HTMLAnchorElement>;
  public height:number = 0;
  private _menuItems: MenuItem[] = [];
  private _isClosed: boolean = true;
  constructor(
    element: BaseElement<HTMLElement>,
    public config: MenuItemType,
    public options?:MenuItemOptions
  ) {
    super(element);
    this._isClosed = !config.isOpened;
    this.options = Object.assign(getDefaultMenuItemOptions(),options);
  }
  build(): void {
    const fragment = document.createDocumentFragment();
    this.element.element.classList.add(`${SIDENAV_PREFIX}-menu-item`);
    this.headerElement = createBaseElement(document.createElement("a"));
    this.headerElement.addClass(`${SIDENAV_PREFIX}-menu-item-header`);
    this.config.to ? (this.headerElement.element.href = this.config.to) : null;
    this.config.iconHTML
      ? (this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-icon">${this.config.iconHTML}</i>`)
      : null;
    this.config.title
      ? (this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-item-header-title">${this.config.title}</i>`)
      : null;

    const menuItemsDiv = document.createElement("ul");
    menuItemsDiv.classList.add(`${SIDENAV_PREFIX}-menu-items`);
    if (this.config.children) {
      this.config.children && this.config.children.length > 0
        ? (this.headerElement.element.innerHTML += ` <i class="${SIDENAV_PREFIX}-extend-icon"></i>`)
        : null;
      this.config.children?.forEach((menuItem) => {
        const compiledMenuItem = new MenuItem(
          createBaseElement(document.createElement("li")),
          menuItem
        );
        compiledMenuItem.build();
        this._menuItems.push(compiledMenuItem);
        menuItemsDiv.appendChild(compiledMenuItem.element.element);
      });
      this.headerElement.element.addEventListener("click", (e) => {
        if (this._isClosed) {
          this.open();
        } else {
          this.close();
        }
      });
    }
    if (this._isClosed) {
      this.element.element.classList.add(`${SIDENAV_PREFIX}-menu-item-closed`);
    }
    fragment.appendChild(this.headerElement.element);
    fragment.appendChild(menuItemsDiv);
    this.element.element.appendChild(fragment);
  }
  close() {
    this.element.element.classList.add(`${SIDENAV_PREFIX}-menu-item-closed`);
    this._isClosed = true;
    this._menuItems.forEach((menuItem) => menuItem.close());
  }
  open() {
    this.element.element.classList.remove(`${SIDENAV_PREFIX}-menu-item-closed`);
    this._isClosed = false;
  }

}
