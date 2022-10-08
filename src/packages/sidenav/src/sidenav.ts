import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { SidenavContent } from "./sidenav-content";
import { MenuItem } from "./menu-item";
import { SidenavMenu } from "./sidenav-menu";
import { Config, MenuItem as MenuItemType } from "./_common/types";

export class Sidenav extends Component {
  public sidenavMenu: SidenavMenu;
  public sidenavContent: SidenavContent;

  constructor(
    element: BaseElement<HTMLSelectElement>,
    private _config?: Config
  ) {
    super(element);
    this.sidenavMenu = new SidenavMenu(
      this.element.querySelector(`:scope > .${PREFIX}-sidenav-menu`).at(0),
      this._config
    );
    this.sidenavContent = new SidenavContent(
      this.element.querySelector(`:scope > .${PREFIX}-sidenav-content`).at(0),
      this._config
    );
  }
  build(): void {
    this.element.addClass(`${PREFIX}-sidenav`);
    this.sidenavMenu.build();
    this.sidenavMenu.onToggleClicked = ()=>{
      this.element.toggleClass(`${PREFIX}-sidenav-closed`);
    }
    this.sidenavContent.build();
  }
}
