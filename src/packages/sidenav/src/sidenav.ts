import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { FloatingMenu } from "./floating-menu";
import { SidenavContent } from "./sidenav-content";
import { SidenavMenu } from "./sidenav-menu";
import { Config } from "./_common/types";
import { SIDENAV_PREFIX } from "./_common/utils";

export class Sidenav extends Component<HTMLDivElement> {
  public sidenavMenu: SidenavMenu;
  public sidenavContent: SidenavContent;
  public floatingMenu: FloatingMenu;
  private _isClosed: boolean = false;
  constructor(element: BaseElement<HTMLDivElement>, private _config?: Config) {
    super(element);
    this.sidenavMenu = new SidenavMenu(
      this.element.querySelector(`:scope > .${SIDENAV_PREFIX}-menu`).at(0),
      this._config
    );
    this.sidenavContent = new SidenavContent(
      this.element.querySelector(`:scope > .${SIDENAV_PREFIX}-content`).at(0),
      this._config
    );
    const floatingMenuElement = createBaseElement(document.createElement("ul"));
    this.floatingMenu = new FloatingMenu(floatingMenuElement);
  }
  build(): void {
    this.element.addClass(SIDENAV_PREFIX);
    this.sidenavMenu.build();
    this.sidenavContent.build();
    this.floatingMenu.build();
    this.sidenavMenu.element.appendChild(this.floatingMenu.element);
    this.sidenavMenu.onToggleClicked = () => {
      this.floatingMenu.close();
      this._isClosed ? this.open() : this.close();
    };
    this.sidenavMenu.onMenuItemHovered = (menuItem) => {
      if (!menuItem || !this._isClosed) return;
      this.floatingMenu.open(menuItem);
    };
    this.sidenavMenu.element.element.addEventListener("mouseleave", () => {
      this.floatingMenu.close();
    });
    this.sidenavContent.element.onEvent("click", (e) => {
      if (this._isClosed) {
        this.floatingMenu.close();
      }
    });
  }
  close() {
    this.element.addClass(`${SIDENAV_PREFIX}-closed`);
    this._isClosed = true;
  }
  open() {
    this.element.removeClass(`${SIDENAV_PREFIX}-closed`);
    this._isClosed = false;
  }
}
