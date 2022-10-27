import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { MenuItem } from "./menu-item";
import { Config, MenuItem as MenuItemType } from "./_common/types";
import { SIDENAV_PREFIX } from "./_common/utils";

export class SidenavMenu extends Component<HTMLElement> {
  onMenuItemHovered: (menuItem: MenuItem) => void;
  onToggleClicked: () => void;
  private _menuItems: MenuItem[] = [];
  constructor(element: BaseElement<HTMLElement>, private _config: Config) {
    super(element);
  }
  build(): void {
    const fragment = document.createDocumentFragment();
    const menuItemsDiv = document.createElement("div");
    menuItemsDiv.classList.add(`${SIDENAV_PREFIX}-menu-items`);
    this._config.menuItems.forEach((menuItem) => {
      const compiledMenuItem = new MenuItem(
        createBaseElement(document.createElement("button")),
        menuItem
      );
      this._menuItems.push(compiledMenuItem);
      compiledMenuItem.build();
      menuItemsDiv.appendChild(compiledMenuItem.element.element);
      compiledMenuItem.headerElement.element.addEventListener(
        "mouseenter",
        () => {
          if(compiledMenuItem.config.disabled) return;
          this.onMenuItemHovered
            ? this.onMenuItemHovered(compiledMenuItem)
            : null;
        }
      );
      compiledMenuItem.headerElement.element.addEventListener(
        "mouseleave",
        () => {
          this.onMenuItemHovered ? this.onMenuItemHovered(null) : null;
        }
      );
    });
    fragment.appendChild(menuItemsDiv);
    if (this._config.showToggler) {
      const toggleButton = createBaseElement(document.createElement("button"));
      toggleButton.addClass(`${SIDENAV_PREFIX}-menu-toggler`);
      toggleButton.onEvent("click", () => {
        this._menuItems.forEach((menuItem) => menuItem.close());
        this.onToggleClicked ? this.onToggleClicked() : null;
      });
      fragment.appendChild(toggleButton.element);
    }
    this.element.element.appendChild(fragment);
  }
  closeAllMenus() {
    this._menuItems.forEach((menuItem) => {
      menuItem.close();
    });
  }
}
