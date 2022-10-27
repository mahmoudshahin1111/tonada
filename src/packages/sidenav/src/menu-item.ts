import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { MenuItem as MenuItemType, MenuItemOptions } from "./_common/types";
import { getDefaultMenuItemOptions, SIDENAV_PREFIX } from "./_common/utils";

export class MenuItem extends Component<HTMLButtonElement> {
  public headerElement: BaseElement<HTMLAnchorElement>;
  public menuItemsElement: BaseElement<HTMLUListElement>;
  public height: number = 0;
  public isBuilded: boolean;
  private _isClosed: boolean = true;
  private _menuItems: MenuItem[] = [];
  constructor(
    element: BaseElement<HTMLButtonElement>,
    public config: MenuItemType,
    public options?: MenuItemOptions
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
      if (this.config.active) {
        this.element.addClass(`${SIDENAV_PREFIX}-menu-item-active`);
      }
      if (this.config.disabled) {
        this.element.element.disabled = true;
      }
      const fragment = document.createDocumentFragment();
      this.headerElement = createBaseElement<HTMLAnchorElement>(
        document.createElement("a")
      );
      this.headerElement.addClass(`${SIDENAV_PREFIX}-menu-item-header`);
      fragment.appendChild(this.headerElement.element);
      this.menuItemsElement = createBaseElement(document.createElement("div"));
      this.menuItemsElement.addClass(`${SIDENAV_PREFIX}-menu-items`);
      fragment.appendChild(this.menuItemsElement.element);
      this.element.element.appendChild(fragment);
    }
    if (this.config.to) {
      this.headerElement.element.href = this.config.to;
    }

    if (this.config.iconHTML) {
      let iconHTML = this.config.iconHTML;
      if (typeof this.config.iconHTML === "function") {
        iconHTML = (this.config.iconHTML as Function).bind(this, this.config)();
      } else if (typeof this.config.iconHTML === "object") {
        iconHTML = (this.config.iconHTML as HTMLElement).innerHTML;
      }
      this.headerElement.element.innerHTML += `<i class="${SIDENAV_PREFIX}-menu-icon">${iconHTML}</i>`;
    }

    if (this.config.title) {
      let title = this.config.title;
      if (typeof this.config.title === "function") {
        title = (this.config.title as Function).bind(this, this.config)();
      } else if (typeof this.config.title === "object") {
        title = (this.config.title as HTMLElement).innerHTML;
      }
      this.headerElement.element.innerHTML += `<span class="${SIDENAV_PREFIX}-menu-item-header-title">${title}</span>`;
    }

    if (this.config.children?.length) {
      this.headerElement.element.innerHTML += ` <i class="${SIDENAV_PREFIX}-extend-icon"></i>`;
      this.config.children?.forEach((menuItem) => {
        const compiledMenuItem = new MenuItem(
          createBaseElement(document.createElement("button")),
          menuItem
        );
        compiledMenuItem.build();
        this._menuItems.push(compiledMenuItem);
        this.menuItemsElement.appendChild(compiledMenuItem.element);
      });
      this.headerElement.element.addEventListener("click", (e) => {
        if (this.config.disabled) return;
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
      menuItem.close();
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
