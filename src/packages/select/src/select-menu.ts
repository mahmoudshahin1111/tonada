import { Component, BaseElement, PREFIX } from "tonada-shared";
import { MenuItem } from "./menu-item";
import { Select } from "./select";
import { SelectConfig } from "./_common";

export class SelectMenu extends Component {
  opened: boolean = false;
  private items: MenuItem[] = [];
  onSelect: (option: MenuItem) => void;
  onDeSelect: (option: MenuItem) => void;
  constructor(
    element: BaseElement<HTMLDivElement>,
    private select: Select,
    options: BaseElement<HTMLOptionElement>[],
    public menuIcon: BaseElement,
    private selectConfig: SelectConfig
  ) {
    super(element);
    this.items = options.map((option) => {
      const menuItem = new MenuItem(option);
      this.items.push(menuItem);
      menuItem.baseElement.onEvent("click", () => {
        if (selectConfig.multiple) {
          if (!menuItem.selected) {
            menuItem.select();
            this.onSelect(menuItem);
          } else if (menuItem.selected) {
            menuItem.deselect();
            this.onDeSelect(menuItem);
          }
        } else {
          this.items.forEach((item) => {
            if (item.value === option.element.value) {
              if (item.selected) return;
              menuItem.select();
              this.onSelect(menuItem);
            } else {
              item.deselect();
            }
          });
        }
        this.toggleMenuIcon();
        if (!this.selectConfig.multiple) {
          this.close();
        } else {
          this.recalculatePosition();
        }
      });
      return menuItem;
    });
  }
  build(): void {
    this.element.addClass(`${PREFIX}-select-menu`);
    this.element.addClass(`${PREFIX}-hide`);
    this.items.forEach((item) => {
      if (item.option.element.hasAttribute("selected")) {
        item.select();
        this.onSelect ? this.onSelect(item) : null;
      }
      this.element.appendChild(item.baseElement);
    });
  }
  open(): void {
    this.recalculatePosition();
    this.element.removeClass(`${PREFIX}-hide`);
    this.toggleMenuIcon();
    this.opened = true;
  }
  close(): void {
    this.element.addClass(`${PREFIX}-hide`);
    this.toggleMenuIcon();
    this.opened = false;
  }
  toggleMenuIcon() {
    if (this.opened) {
      this.menuIcon.removeClass(`${PREFIX}-expanded`);
    } else {
      this.menuIcon.addClass(`${PREFIX}-expanded`);
    }
  }
  clear() {
    this.items.forEach((item) => {
      item.deselect();
    });
  }
  recalculatePosition() {
    this.element.setStyle(
      "top",
      `${this.select.element.getHeight().toString()}px`
    );
  }
}
