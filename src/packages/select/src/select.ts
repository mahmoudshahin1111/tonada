import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { MenuItem } from "./menu-item";
import { ISelectHeaderOption, SelectHeader } from "./select-header";
import { SelectMenu } from "./select-menu";
import { SelectConfig, getDefaultSelectOptions } from "./_common";

export class Select extends Component {
  private select: BaseElement<HTMLSelectElement>;
  private selectHeader: SelectHeader;
  private selectMenu: SelectMenu;
  private menuIcon: BaseElement<HTMLSpanElement>;
  onOptionSelected: (optionValue: string) => void;
  onOptionRemoved: (optionValue: string) => void;
  constructor(
    element: BaseElement<HTMLSelectElement>,
    public selectConfig?: SelectConfig
  ) {
    super(element);
  }
  build(): void {
    this.selectConfig = Object.assign(
      getDefaultSelectOptions(),
      this.selectConfig
    );
    this.select = this.element
      .querySelector<HTMLSelectElement>(":scope > select")
      .at(0);
    this.selectConfig.multiple = !!this.select.getAttribute("multiple");
    this.element.addClass(`${PREFIX}-select`);
    this.select.hide();
    // create expand icon
    this.menuIcon = createBaseElement(document.createElement("span"));
    if (this.selectConfig.multiple) {
      this.menuIcon.addClass(`${PREFIX}-select-close-icon`);
      this.menuIcon.onEvent("click", () => this.clear());
    } else {
      this.menuIcon.addClass(`${PREFIX}-select-expand-icon`);
      this.menuIcon.onEvent("click", () => this.toggleMenu());
    }
    this.element.element.appendChild(this.menuIcon.element);
    // create header
    this.selectHeader = new SelectHeader(
      createBaseElement(document.createElement("div"))
    );
    this.selectHeader.element.onEvent("click", (e) => {
      if (
        this.selectConfig.multiple &&
        e.target !== this.selectHeader.element.element
      )
        return;
      this.toggleMenu();
    });
    this.selectHeader.build();
    this.element.appendChild(this.selectHeader.element);
    // create menu
    const selectOptions =
      this.select.querySelector<HTMLOptionElement>(":scope > option");
    this.selectMenu = new SelectMenu(
      createBaseElement(document.createElement("div")),
      this,
      selectOptions,
      this.menuIcon,
      this.selectConfig
    );
    this.selectMenu.build();
    this.element.appendChild(this.selectMenu.element);
    // on option selected disable the unselected and enable the selected options
    this.selectMenu.onSelect = (selectedOption: MenuItem) => {
      this.selectOption(selectedOption);
    };
    this.selectMenu.onDeSelect = (selectedOption: MenuItem) => {
      this.deselectOption(selectedOption);
    };
  }
  toggleMenu() {
    if (this.selectMenu.opened) {
      return this.selectMenu.close();
    }
    return this.selectMenu.open();
  }
  selectOption(selectedOption: MenuItem) {
    if (this.selectConfig.multiple) {
      this.selectHeader.setOption(selectedOption, this.selectConfig.multiple);
    } else {
      this.selectHeader.setOption(selectedOption, this.selectConfig.multiple);
    }
  }
  deselectOption(selectedOption: MenuItem) {
    if (this.selectConfig.multiple) {
      this.selectHeader.removeOption(
        selectedOption,
        this.selectConfig.multiple
      );
    }
  }
  clear() {
    this.selectMenu.clear();
    this.selectHeader.clear();
    this.selectMenu.close();
  }
}
