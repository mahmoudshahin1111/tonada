import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";

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
  private select: BaseElement<HTMLSelectElement>;
  private selectHeader: SelectHeader;
  private selectMenu: SelectMenu;
  onOptionSelected: (optionValue: string) => void;
  onOptionRemoved: (optionValue: string) => void;
  constructor(element: BaseElement<HTMLSelectElement>, public options?: SelectOptions) {
    super(element);
  }
  build(): void {
    this.options = Object.assign(getDefaultSelectOptions(), this.options);
    this.select = this.element.querySelector<HTMLSelectElement>(":scope > select").at(0);
    this.options.multiple = !!this.select.getAttribute("multiple");
    this.element.addClass(`${PREFIX}-select`);
    this.select.hide();
    // create header
    this.selectHeader = new SelectHeader(
      createBaseElement(document.createElement("div"))
    );
    this.selectHeader.build();
    this.element.element.appendChild(this.selectHeader.element.element);
    // create menu
    const selectOptions = this.select.querySelector<HTMLOptionElement>(":scope > option");
    this.selectMenu = new SelectMenu(
      createBaseElement(document.createElement("div")),
      selectOptions
    );
    this.selectMenu.build();
    this.element.element.appendChild(this.selectMenu.element.element);
    // on option selected disable the unselected and enable the selected options
    this.selectMenu.onSelect = (selectedOption: SelectOption) => {
      if (this.options.multiple) {
        const option = selectOptions.find(
          (s) => (s.element as HTMLOptionElement).value === selectedOption.value
        );
        const optionElement = option.element as HTMLOptionElement;
        if (!optionElement.selected) {
          optionElement.setAttribute("selected", "");
          this.selectHeader.setOption(selectedOption, this.options.multiple);
          selectedOption.disable();
          this.onOptionSelected
            ? this.onOptionSelected(selectedOption.value)
            : null;
        } else {
          optionElement.removeAttribute("selected");
          this.selectHeader.removeOption(selectedOption, this.options.multiple);
          selectedOption.enable();
          this.onOptionRemoved
            ? this.onOptionRemoved(selectedOption.value)
            : null;
        }
      } else {
        selectOptions.forEach((option) => {
          const optionElement = option.element as HTMLOptionElement;
          if (optionElement.value === selectedOption.value) {
            optionElement.setAttribute("selected", "");
            this.selectHeader.setOption(selectedOption, false);
            selectedOption.disable();
            this.onOptionSelected
              ? this.onOptionSelected(selectedOption.value)
              : null;
          } else {
            optionElement.removeAttribute("selected");
            selectedOption.enable();
            this.onOptionRemoved
              ? this.onOptionRemoved(selectedOption.value)
              : null;
          }
        });
      }
    };
  }
}

export class SelectHeader extends Component {
  private options: ISelectHeaderOption<HTMLDivElement>[] = [];
  constructor(element: BaseElement<HTMLDivElement>) {
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
    let headerOption: ISelectHeaderOption<HTMLDivElement>;
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
export interface ISelectHeaderOption<T extends HTMLElement> {
  selectOption: SelectOption;
  baseElement: BaseElement<T>;
}
export class SelectHeaderTag implements ISelectHeaderOption<HTMLDivElement> {
  baseElement: BaseElement<HTMLDivElement>;
  constructor(public selectOption: SelectOption) {
    this.baseElement = createBaseElement(document.createElement("button"));
    this.baseElement.addClass(`${PREFIX}-select-header-tag`);
    this.baseElement.element.innerText = selectOption.label;
  }
}
export class SelectHeaderItem implements ISelectHeaderOption<HTMLDivElement> {
  baseElement: BaseElement<HTMLDivElement>;
  constructor(public selectOption: SelectOption) {
    this.baseElement = createBaseElement(document.createElement("div"));
    this.baseElement.addClass(`${PREFIX}-select-header-option`);
    this.baseElement.element.innerText = selectOption.label;
  }
}
export class SelectMenu extends Component {
  private options: SelectOption[] = [];
  onSelect: (option: SelectOption) => void;
  constructor(element: BaseElement<HTMLDivElement>, options: BaseElement<HTMLOptionElement>[]) {
    super(element);
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const selectOption = new SelectOption(option);
      this.options.push(selectOption);
      selectOption.baseElement.onEvent("click", () => {
        console.log(selectOption, "clicked");

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
  baseElement: BaseElement<HTMLOptionElement>;
  value: string;
  label: string;
  constructor(option: BaseElement<HTMLOptionElement>) {
    this.label = option.element.innerHTML;
    this.value = (option.element as HTMLOptionElement).value;
    this.baseElement = createBaseElement(document.createElement("button"));
    this.baseElement.addClass(`${PREFIX}-select-option`);
    this.baseElement.element.innerHTML = this.label;
    this.baseElement.setAttribute(
      `data-${PREFIX}-value`,
      (option.element as HTMLOptionElement).value
    );
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
