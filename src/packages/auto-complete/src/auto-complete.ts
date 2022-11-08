import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";
import { create as createInput, Input } from "tonada-input";
import { AUTO_COMPLETE_PREFIX, getDefaultConfig } from "./_common/utils";
import { Config } from "./_common/types";
export class AutoComplete extends Component<HTMLDivElement> {
  input: Input;
  menu: Menu;
  config: Config;
  constructor(element: BaseElement<HTMLDivElement>, config?: Config) {
    super(element);
    this.config = Object.assign(getDefaultConfig(), config);
  }
  build(): void {
    const fragment = document.createDocumentFragment();
    this.element.addClass(AUTO_COMPLETE_PREFIX);
    this.input = createInput(
      this.element
        .querySelector<HTMLInputElement>(
          `:scope > .${AUTO_COMPLETE_PREFIX}-input`
        )
        ?.at(0)?.element
    );
    this.menu = new Menu(createBaseElement(document.createElement("div")));
    this.menu.build();

    fragment.appendChild(this.menu.element.element);
    this.element.element.appendChild(fragment);
    this.input.element.element.addEventListener("change", (e: any) => {
      if (e.target.value === "") return this.menu.close();
      this.dispatchEvent(`${AUTO_COMPLETE_PREFIX}_search`, {
        result: e.target.value,
      });
    });
  }
  onSearch(callback: CallableFunction) {
    this.onEvent(`${AUTO_COMPLETE_PREFIX}_search`, callback);
  }
  open(
    items: {
      container: string | Function | HTMLElement;
      value: any;
    }[]
  ) {
    this.menu.open(items);
  }
}

export class Menu extends Component<HTMLDivElement> {
  items: Item[] = [];
  constructor(element: BaseElement<HTMLDivElement>) {
    super(element);
  }
  build(): void {
    this.element.addClass(`${AUTO_COMPLETE_PREFIX}-menu`);
    const fragment = document.createDocumentFragment();
    this.element.element.appendChild(fragment);
  }
  add(item: Item) {
    this.element.appendChild(item.element);
    this.items.push(item);
  }
  open(
    items: {
      container: string | Function | HTMLElement;
      value: any;
    }[]
  ) {
    this.items.forEach((item) => item.element.remove());
    items.forEach((item) => {
      const itemContainer = document.createElement("button");
      if (typeof item.container === "function") {
        itemContainer.innerHTML = item.container();
      } else if (typeof item.container === "object") {
        itemContainer.appendChild(item.container);
      } else {
        itemContainer.innerHTML = item.container;
      }
      const createdItem = new Item(
        item.value,
        createBaseElement<HTMLButtonElement>(itemContainer)
      );
      createdItem.build();
      this.add(createdItem);
    });

    this.element.addClass(`${AUTO_COMPLETE_PREFIX}-opened`);
  }
  close() {
    this.items.forEach((item) => item.element.remove());
    this.element.removeClass(`${AUTO_COMPLETE_PREFIX}-opened`);
  }
}
export class Item extends Component<HTMLButtonElement> {
  isSelected: boolean;
  constructor(
    public value: string,
    element: BaseElement<HTMLButtonElement>,
    config?: { isSelected: boolean }
  ) {
    super(element);
    this.isSelected = config?.isSelected;
  }
  build(): void {
    this.element.addClass(`${AUTO_COMPLETE_PREFIX}-menu-item`);
    if (this.isSelected) {
      this.element.addClass(`${AUTO_COMPLETE_PREFIX}-selected`);
    }
    const fragment = document.createDocumentFragment();
    this.element.element.appendChild(fragment);
  }
}
