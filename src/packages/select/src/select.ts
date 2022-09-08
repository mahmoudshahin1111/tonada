import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { MenuItem } from "./menu-item";
import { SelectHeader } from "./select-header";
import { SelectMenu } from "./select-menu";
import { SelectConfig, getDefaultSelectOptions } from "./_common";

export class Select extends Component {
  private select: BaseElement<HTMLSelectElement>;
  private selectHeader: SelectHeader;
  private selectMenu: SelectMenu;
  private menuIcon: BaseElement<HTMLSpanElement>;
  private selectConfig:SelectConfig = getDefaultSelectOptions();
  onOptionSelected: (optionValue: string) => void;
  onOptionRemoved: (optionValue: string) => void;
  constructor(
    element: BaseElement<HTMLSelectElement>,
    config?: SelectConfig
  ) {
    super(element);
    this.selectConfig = getDefaultSelectOptions();
    this.select = this.element
    .querySelector<HTMLSelectElement>(":scope > select")
    .at(0);
    this.select.hide();
    this.selectConfig.disabled = this.select.element.hasAttribute("disabled");
    this.selectConfig.multiple = this.select.element.hasAttribute("multiple");
    this.selectConfig = Object.assign(
      this.selectConfig,
      config
    );
  }
  build(): void {
    const fragment = document.createDocumentFragment();
    this.element.addClass(`${PREFIX}-select`);
    // create expand icon
    this.menuIcon = createBaseElement(document.createElement("span"));
    if (this.selectConfig.multiple) {
      this.menuIcon.addClass(`${PREFIX}-select-close-icon`);
      this.menuIcon.onEvent("click", () => {
        if (this.selectConfig.disabled) return;
        this.clear();
      });
    } else {
      this.menuIcon.addClass(`${PREFIX}-select-expand-icon`);
      this.menuIcon.onEvent("click", () => {
        if (this.selectConfig.disabled) return;
        this.toggleMenu();
      });
    }
    // create header
    this.selectHeader = new SelectHeader(
      createBaseElement(document.createElement("div"))
    );
    this.selectHeader.element.onEvent("click", (e) => {
      if (this.selectConfig.disabled) return;
      if (
        this.selectConfig.multiple &&
        e.target !== this.selectHeader.element.element
      )
        return;
      this.toggleMenu();
    });
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
    // on option selected disable the unselected and enable the selected options
    this.selectMenu.onSelect = (selectedOption: MenuItem) => {
      this.selectOption(selectedOption);
    };
    this.selectMenu.onDeSelect = (selectedOption: MenuItem) => {
      this.deselectOption(selectedOption);
    };
    if (this.selectConfig.disabled) {
      this.element.addClass(`${PREFIX}-select-disabled`);
    }
    fragment.appendChild(this.menuIcon.element);
    fragment.appendChild(this.selectHeader.element.element);
    fragment.appendChild(this.selectMenu.element.element);
    this.selectHeader.build();
    this.selectMenu.build();
    this.element.element.appendChild(fragment);
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
