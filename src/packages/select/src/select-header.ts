import { Component, BaseElement, PREFIX, createBaseElement } from "tonada-shared";
import { MenuItem } from "./menu-item";


export interface ISelectHeaderOption<T extends HTMLElement> {
    menuItem: MenuItem;
    baseElement: BaseElement<T>;
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
        (headerOption as SelectHeaderTag).removeButton.onEvent('click',()=>{
          this.removeOption(option,true);
          option.deselect();
        });
        this.options.push(headerOption);
      } else {
        this.removeOption(option);
        headerOption = new SelectHeaderItem(option);
        this.options = [headerOption];
      }
      this.element.appendChild(headerOption.baseElement);
    }
    clear(){
      this.options.forEach(option=>{
        option.baseElement.remove()
      });
      this.options = [];
    }
  }

  export class SelectHeaderTag implements ISelectHeaderOption<HTMLDivElement> {
    baseElement: BaseElement<HTMLDivElement>;
    removeButton: BaseElement<HTMLButtonElement>;
    constructor(public menuItem: MenuItem) {
      this.baseElement = createBaseElement(document.createElement("div"));
      this.baseElement.addClass(`${PREFIX}-select-header-tag`);
      this.baseElement.element.innerText = menuItem.label;
      // create remove button
      this.removeButton = createBaseElement(document.createElement("button"));
      this.removeButton.addClass(`${PREFIX}-remove-button`);
      this.baseElement.appendChild(this.removeButton);
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