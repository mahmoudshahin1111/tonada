import _ from "lodash";
import { createBaseElement } from "../utils/common";
import { PREFIX } from "../utils/defaults";
import { BaseElement } from "./base-element";
import { Component } from "./component";



export function getDefaultSelectOptions(): SelectOptions {
  return {
    search: false,
    multiple: false,
  } as SelectOptions;
}
export function create(element: HTMLDivElement, config?: SelectOptions) {
  const component = new Select(createBaseElement(element), config);
  component.build();
  return component;
}

export class Select extends Component {
  private select: BaseElement;
  private selectHeader: SelectHeader;
  private selectMenu: SelectMenu;
  onOptionSelected: (optionValue: string) => void;
  onOptionRemoved: (optionValue: string) => void;
  constructor(element: BaseElement, public options?: SelectOptions) {
    super(element);
  }
  build(): void {
    this.options = Object.assign(getDefaultSelectOptions(), this.options);
    this.select = this.element.querySelector(":scope > select").at(0);
    this.options.multiple = !!this.select.getAttribute("multiple");
    this.element.addClass(`${PREFIX}-select`);
    this.select.hide();
    this.selectHeader = new SelectHeader(
      createBaseElement(document.createElement("div"))
    );
    this.selectHeader.build();
    this.element.element.appendChild(this.selectHeader.element.element);
    this.selectMenu = new SelectMenu(
      createBaseElement(document.createElement("div")),
      (this.select.element as HTMLSelectElement).options
    );
    this.selectMenu.build();
    this.element.element.appendChild(this.selectMenu.element.element);
    const selectOptions = this.select.querySelector(":scope > option");
    this.selectMenu.onSelect = (selectedOption: SelectOption) => {
      this.onOptionSelected(selectedOption.value);
      if (this.options.multiple) {
        selectOptions.forEach((option) => {
          const optionElement = option.element as HTMLOptionElement;
          if (!optionElement.selected) {
            optionElement.setAttribute("selected", "");
            this.selectHeader.setOption(selectedOption, this.options.multiple);
            selectedOption.disable();
          } else {
            optionElement.removeAttribute("selected");
            this.selectHeader.removeOption(
              selectedOption,
              this.options.multiple
            );
            selectedOption.enable();
          }
        });
      } else {
        selectOptions.forEach((option) => {
          const optionElement = option.element as HTMLOptionElement;
          if (!optionElement.selected) {
            optionElement.setAttribute("selected", "");
            this.selectHeader.setOption(selectedOption, false);
            selectedOption.disable();
          } else {
            optionElement.removeAttribute("selected");
            this.selectHeader.removeOption(selectedOption, false);
            selectedOption.enable();
          }
        });
      }
    };
  }
}


export class SelectHeader extends Component {
  private options: ISelectHeaderOption[] = [];
  constructor(element: BaseElement) {
    super(element);
  }
  build(): void {
    this.element.addClass(`${PREFIX}-select-header`);
  }
  removeOption(option: SelectOption, multi?: boolean) {
    if (multi && this.options.length > 1) {
      const existsOptionIndex = this.options.findIndex(
        (o) => o.selectOption.baseElement.key === option.baseElement.key
      );
      this.options[existsOptionIndex].baseElement.element.remove();
      this.options.splice(existsOptionIndex, 1);
    } else {
      this.element.element.innerHTML = "";
      this.options = [];
    }
  }
  setOption(option: SelectOption, multi?: boolean) {
    let headerOption: ISelectHeaderOption;
    if (multi) {
      headerOption = new SelectHeaderTag(option);
      this.options.push(headerOption);
    } else {
      this.removeOption(option);
      headerOption = new SelectHeaderItem(option);
      this.options = [headerOption];
    }
    this.element.appendChild(headerOption.baseElement);
  }
}
export interface ISelectHeaderOption {
  selectOption: SelectOption;
  baseElement: BaseElement;
}
export class SelectHeaderTag implements ISelectHeaderOption {
  baseElement: BaseElement;
  constructor(public selectOption: SelectOption) {
    this.baseElement = createBaseElement(document.createElement("button"));
    this.baseElement.addClass(`${PREFIX}-select-header-tag`);
    this.baseElement.element.innerText = selectOption.label;
  }
}
export class SelectHeaderItem implements ISelectHeaderOption {
  baseElement: BaseElement;
  constructor(public selectOption: SelectOption) {
    this.baseElement = createBaseElement(document.createElement("div"));
    this.baseElement.addClass(`${PREFIX}-select-header-option`);
    this.baseElement.element.innerText = selectOption.label;
  }
}
export class SelectMenu extends Component {
  private options: SelectOption[] = [];
  onSelect: (option: SelectOption) => void;
  constructor(element: BaseElement, options: HTMLOptionsCollection) {
    super(element);
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const selectOption = new SelectOption(option);
      this.options.push(selectOption);
      selectOption.baseElement.onEvent("click", () => {
        this.onSelect(selectOption);
      });
    }
  }
  build(): void {
    this.element.addClass(`${PREFIX}-select-menu`);
    this.options.forEach((option) => {
      this.element.element.appendChild(option.baseElement.element);
    });
  }
}
export class SelectOption {
  baseElement: BaseElement;
  value: string;
  label: string;
  constructor(option: HTMLOptionElement) {
    this.baseElement = createBaseElement(document.createElement("button"));
    this.baseElement.addClass(`${PREFIX}-select-option`);
    this.label = option.innerHTML;
    this.value = option.value;
    this.baseElement.element.innerHTML = this.label;
    this.baseElement.setAttribute(`data-${PREFIX}-value`, option.value);
  }
  disable() {
    this.baseElement.addClass(`${PREFIX}-select-option-disabled`);
  }
  enable() {
    this.baseElement.removeClass(`${PREFIX}-select-option-disabled`);
  }
}

export type SelectOptions = {
  search?: boolean;
  multiple?: boolean;
  options?: SelectConfigOption[];
};
export type SelectConfigOption = {
  label: string;
  value: string;
};
