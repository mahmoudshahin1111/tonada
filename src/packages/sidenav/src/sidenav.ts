import {
  BaseElement,
  Component,
  createBaseElement,
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
  public isClosed: boolean;
  constructor(element: BaseElement<HTMLDivElement>, private _config?: Config) {
    super(element);
    this.sidenavMenu = new SidenavMenu(this,
      this.element.querySelector(`:scope > .${SIDENAV_PREFIX}-menu`).at(0),
      this._config
    );
    this.sidenavContent = new SidenavContent(
      this.element.querySelector(`:scope > .${SIDENAV_PREFIX}-content`).at(0),
      this._config
    );
    const floatingMenuElement = createBaseElement(document.createElement("ul"));
    this.floatingMenu = new FloatingMenu(this,floatingMenuElement);
  }
  build(): void {
    this.element.addClass(SIDENAV_PREFIX);
    this.sidenavMenu.build();
    this.sidenavContent.build();
    this.floatingMenu.build();
    this.sidenavMenu.element.appendChild(this.floatingMenu.element);
    this.sidenavMenu.onToggleClicked = () => {
      this.floatingMenu.close();
      this.isClosed ? this.open() : this.close();
    };
    this.sidenavMenu.onMenuItemHovered = (menuItem) => {
      if (!menuItem || !this.isClosed) return;
      this.floatingMenu.open(menuItem);
    };
    this.sidenavMenu.element.element.addEventListener("mouseleave", () => {
      this.floatingMenu.close();
    });
    this.sidenavContent.element.onEvent("click", (e) => {
      if (this.isClosed) {
        this.floatingMenu.close();
      }
    });
  }
  close() {
    this.element.addClass(`${SIDENAV_PREFIX}-closed`);
    this.isClosed = true;
    this.dispatchEvent(`${SIDENAV_PREFIX}_toggled`, { result: "closed" });
  }
  open() {
    this.element.removeClass(`${SIDENAV_PREFIX}-closed`);
    this.isClosed = false;
    this.dispatchEvent(`${SIDENAV_PREFIX}_toggled`, { result: "opened" });
  }
  onToggled(callback: CallableFunction) {
    this.onEvent(`${SIDENAV_PREFIX}_toggled`, callback);
  }
}
