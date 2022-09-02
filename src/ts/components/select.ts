import { clone, createBaseElement } from "../utils/common";
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
      createBaseElement(document.createElement("div")),
      this.options
    );
    this.selectHeader.build();
    this.element.element.appendChild(this.selectHeader.getElement());
    this.selectMenu = new SelectMenu(
      createBaseElement(document.createElement("div")),
      (this.select.element as HTMLSelectElement).options
    );
    this.selectMenu.build();
    this.element.element.appendChild(this.selectMenu.getElement());
    this.selectMenu.onSelect = (selectedOption: SelectOption) => {
      this.selectHeader.setOption(selectedOption);
      this.select.querySelector(":scope > option").forEach((option) => {
        if (this.options.multiple) {
          if (
            (option.element as HTMLOptionElement).value ===
              selectedOption.value &&
            !(option.element as HTMLOptionElement).selected
          ) {
            (option.element as HTMLOptionElement).setAttribute("selected", "");
          } else if (
            (option.element as HTMLOptionElement).value ===
              selectedOption.value &&
            (option.element as HTMLOptionElement).selected
          ) {
            (option.element as HTMLOptionElement).removeAttribute("selected");
          }
        }else{
          if (
            (option.element as HTMLOptionElement).value === selectedOption.value
          ) {
            (option.element as HTMLOptionElement).setAttribute("selected", "");
          }else{
            (option.element as HTMLOptionElement).removeAttribute("selected");
          }
        }

      });
    };
  }
}
export class SelectHeader extends Component {
  private options: SelectOption[] = [];
  constructor(element: BaseElement, private selectOptions: SelectOptions) {
    super(element);
  }
  build(): void {
    this.element.addClass(`${PREFIX}-select-header`);
  }
  getElement() {
    return this.element.element;
  }
  setOption(option: SelectOption) {
    if (this.selectOptions.multiple) {
      const selectedOption = this.options.find(o=>o.value === option.value); 
      if(!selectedOption){
        this.options.push(clone(option));
        const selectHeaderTag = new SelectHeaderTag(option);
        this.element.element.appendChild(selectHeaderTag.baseElement.element);
        option.disable();
      }else{
        this.options = this.options.filter(o=>o.value!==o.value);
        option.enable();
        this.element.element.removeChild(option.baseElement.element);
      }
 
    } else {
      this.element.element.innerHTML = "";
      this.options = [option];
      const selectHeaderOption = new SelectHeaderOption(option);
      this.element.element.appendChild(selectHeaderOption.baseElement.element);
    }
  }
}
export class SelectHeaderTag {
  baseElement: BaseElement;
  constructor(selectOption: SelectOption) {
    this.baseElement = createBaseElement(document.createElement("button"));
    this.baseElement.addClass(`${PREFIX}-select-header-tag`);
    this.baseElement.element.innerText = selectOption.label;
  }
}
export class SelectHeaderOption {
  baseElement: BaseElement;
  constructor(selectOption: SelectOption) {
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
      selectOption.baseElement.onEvent("click", () => {
        this.onSelect(selectOption);
      });
      this.options.push(selectOption);
    }
  }
  build(): void {
    this.element.addClass(`${PREFIX}-select-menu`);
    this.options.forEach((option) => {
      this.element.element.appendChild(option.baseElement.element);
    });
  }
  getElement() {
    return this.element.element;
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
  }
  disable(){
    this.baseElement.addClass(`${PREFIX}-select-option-disabled`);
  }
  enable(){
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
