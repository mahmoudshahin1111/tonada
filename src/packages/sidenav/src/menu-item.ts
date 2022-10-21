import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { MenuItem as MenuItemType, MenuItemOptions } from "./_common/types";
import { getDefaultMenuItemOptions, SIDENAV_PREFIX } from "./_common/utils";

export class MenuItem extends Component<HTMLElement> {
  public headerElement: BaseElement<HTMLAnchorElement>;
  public menuItemsElement: BaseElement<HTMLUListElement>;
  public height: number = 0;
  public isBuilded: boolean;
  private _isClosed: boolean = true;
  private _menuItems: MenuItem[] = [];
  constructor(
    element: BaseElement<HTMLElement>,
    public config: MenuItemType,
    public options?: MenuItemOptions,
  ) {
    super(element);
    this._isClosed = !config?.isOpened;
    this.options = Object.assign(getDefaultMenuItemOptions(), options);
    if (options?.isFloating) {
      this.element.element.classList.add(
        `${SIDENAV_PREFIX}-floating-menu`,
        `${SIDENAV_PREFIX}-floating-menu-hidden`
      );
    }
  }
  build(): void {
    if (!this.isBuilded) {
      this.element.addClass(`${SIDENAV_PREFIX}-menu-item`);
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

    this.config.to ? (this.headerElement.element.href = this.config.to) : null;
    this.config.iconHTML
      ? (this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-icon">${this.config.iconHTML}</i>`)
      : null;
    this.config.title
      ? (this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-item-header-title">${this.config.title}</i>`)
      : null;

    if (this.config.children?.length) {
      this.headerElement.element.innerHTML += ` <i class="${SIDENAV_PREFIX}-extend-icon"></i>`;
      this.config.children?.forEach((menuItem) => {
        const compiledMenuItem = new MenuItem(
          createBaseElement(document.createElement("li")),
          menuItem
        );
        compiledMenuItem.build();
        this._menuItems.push(compiledMenuItem);
        this.menuItemsElement.appendChild(compiledMenuItem.element);
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
    this.isBuilded = true;
  }
  close() {
    this.element.element.classList.add(`${SIDENAV_PREFIX}-menu-item-closed`);
    this._isClosed = true;
    this._menuItems.forEach((menuItem) => {
      if (!menuItem.config.iconHTML) {
        menuItem.hide();
      } else {
        menuItem.close();
      }
    });
    if (this.options.isFloating) {
      this.element.element.removeAttribute("style");
    }
  }
  open() {
    this.element.element.classList.remove(`${SIDENAV_PREFIX}-menu-item-closed`);
    this._isClosed = false;
  }
}
