import { BaseElement, createBaseElement, PREFIX } from "tonada-shared";

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