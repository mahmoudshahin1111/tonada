import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";

export function getDefaultSelectOptions(): SelectConfig {
  return {
    search: false,
    multiple: false,
  } as SelectConfig;
}
export function create(element: HTMLDivElement, config?: SelectConfig) {
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
    // create header
    this.selectHeader = new SelectHeader(
      createBaseElement(document.createElement("div"))
    );
    this.selectHeader.build();
    this.element.element.appendChild(this.selectHeader.element.element);
    // create menu
    const selectOptions =
      this.select.querySelector<HTMLOptionElement>(":scope > option");
    this.selectMenu = new SelectMenu(
      createBaseElement(document.createElement("div")),
      selectOptions,
      this.selectConfig
    );
    this.selectMenu.build();
    this.element.element.appendChild(this.selectMenu.element.element);
    // on option selected disable the unselected and enable the selected options
    this.selectMenu.onSelect = (selectedOption: MenuItem) => {
      if (this.selectConfig.multiple) {
        this.selectHeader.setOption(selectedOption, this.selectConfig.multiple);
      } else {
        this.selectHeader.setOption(selectedOption, this.selectConfig.multiple);
      }
    };
    this.selectMenu.onDeSelect = (selectedOption: MenuItem) => {
      if (this.selectConfig.multiple) {
        this.selectHeader.removeOption(
          selectedOption,
          this.selectConfig.multiple
        );
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
  removeOption(option: MenuItem, multi?: boolean) {
    if (multi && this.options.length > 1) {
      const existsOptionIndex = this.options.findIndex(
        (o) => o.menuItem.baseElement.key === option.baseElement.key
      );
      this.options[existsOptionIndex].baseElement.element.remove();
      this.options.splice(existsOptionIndex, 1);
    } else {
      this.element.element.innerHTML = "";
      this.options = [];
    }
  }
  setOption(option: MenuItem, multi?: boolean) {
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
  menuItem: MenuItem;
  baseElement: BaseElement<T>;
}
export class SelectHeaderTag implements ISelectHeaderOption<HTMLDivElement> {
  baseElement: BaseElement<HTMLDivElement>;
  constructor(public menuItem: MenuItem) {
    this.baseElement = createBaseElement(document.createElement("button"));
    this.baseElement.addClass(`${PREFIX}-select-header-tag`);
    this.baseElement.element.innerText = menuItem.label;
  }
}
export class SelectHeaderItem implements ISelectHeaderOption<HTMLDivElement> {
  baseElement: BaseElement<HTMLDivElement>;
  constructor(public menuItem: MenuItem) {
    this.baseElement = createBaseElement(document.createElement("div"));
    this.baseElement.addClass(`${PREFIX}-select-header-option`);
    this.baseElement.element.innerText = menuItem.label;
  }
}
export class SelectMenu extends Component {
  private items: MenuItem[] = [];
  onSelect: (option: MenuItem) => void;
  onDeSelect: (option: MenuItem) => void;
  constructor(
    element: BaseElement<HTMLDivElement>,
    options: BaseElement<HTMLOptionElement>[],
    selectConfig: SelectConfig
  ) {
    super(element);
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
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
      });
    }
  }
  build(): void {
    this.element.addClass(`${PREFIX}-select-menu`);
    this.items.forEach((option) => {
      this.element.element.appendChild(option.baseElement.element);
    });
  }
}
export class MenuItem {
  baseElement: BaseElement<HTMLButtonElement>;
  value: string;
  label: string;
  selected: boolean;
  constructor(private option: BaseElement<HTMLOptionElement>) {
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
  toggleSelect() {
    this.selected ? this.deselect() : this.select();
  }
  select() {
    this.baseElement.addClass(`${PREFIX}-select-option-selected`);
    this.option.setAttribute("selected", "");
    this.selected = true;
  }
  deselect() {
    this.baseElement.removeClass(`${PREFIX}-select-option-selected`);
    this.option.removeAttribute("selected");
    this.selected = false;
  }
  disable() {
    this.baseElement.element.disabled = true;
    this.option.element.disabled = true;
  }
  enable() {
    this.baseElement.element.disabled = false;
    this.option.element.disabled = false;
  }
}

export type SelectConfig = {
  search?: boolean;
  multiple?: boolean;
  options?: SelectConfigOption[];
};
export type SelectConfigOption = {
  label: string;
  value: string;
};
