import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { MenuItem } from "./menu-item";
import { Config } from "./_common/types";

export class SidenavMenu extends Component<HTMLElement> {
  onToggleClicked:()=>void;
  private _menuItems: MenuItem[] = [];
  constructor(element: BaseElement<HTMLElement>, private _config: Config) {
    super(element);
  }
  build(): void {
    const fragment = document.createDocumentFragment();
    const menuItemsDiv = document.createElement("ul");
    menuItemsDiv.classList.add(`${PREFIX}-sidenav-menu-items`);
    this._config.menuItems.forEach((menuItem) => {
      const compiledMenuItem = new MenuItem(
        createBaseElement(document.createElement("li")),
        menuItem
      );
      this._menuItems.push(compiledMenuItem);
      compiledMenuItem.build();
      menuItemsDiv.appendChild(compiledMenuItem.element.element);
    });
    const toggleButton = createBaseElement(document.createElement("button"));
    toggleButton.addClass(`${PREFIX}-sidenav-menu-toggler`);
    toggleButton.onEvent('click',()=>{
        this.onToggleClicked ? this.onToggleClicked() : null;
    });
    fragment.appendChild(menuItemsDiv);
    fragment.appendChild(toggleButton.element);
    this.element.element.appendChild(fragment);
  }
}
