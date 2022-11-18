import type { BaseElement } from "tonada-shared";
import { createBaseElement, Component } from "tonada-shared";
import { create as createInput, Input } from "tonada-input";
import { AUTO_COMPLETE_PREFIX, getDefaultConfig } from "./_common/utils";
import { Config, Item as ItemType } from "./_common/types";
import { convertToHtml } from "tonada-shared/src/common";
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
    this.input.build();
    this.input.element.element.addEventListener("change", (e: any) => {
      if (e.target.value === "") return this.menu.close();
      this.dispatchEvent(`${AUTO_COMPLETE_PREFIX}_search`, {
        result: e.target.value,
      });
    });
    this.menu = new Menu(createBaseElement(document.createElement("div")));
    this.menu.onSelect(({ detail }: any) => {
      this.dispatchEvent(`${AUTO_COMPLETE_PREFIX}_select`, detail);
    });
    this.menu.build();

    fragment.appendChild(this.menu.element.element);
    this.element.element.appendChild(fragment);
  }
  onSearch(callback: CallableFunction) {
    this.onEvent(`${AUTO_COMPLETE_PREFIX}_search`, callback);
  }
  onSelect(callback: CallableFunction) {
    this.onEvent(`${AUTO_COMPLETE_PREFIX}_select`, callback);
  }
  open(items: ItemType[]) {
    this.menu.open(items);
  }
  close() {
    this.menu.close();
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
  open(items: ItemType[]) {
    items.forEach((item) => {
      let createdItem = null;
      // if has options will be unselectable
      createdItem = new Item(item);
      if (!item.items?.length) {
        // otherwise it will be selectable
        createdItem.onSelect(({ detail }: any) => {
          this.dispatchEvent(`${AUTO_COMPLETE_PREFIX}_select`, detail);
        });
      }
      createdItem.build();
      this.items.push(createdItem);
    });
    const fragment = document.createDocumentFragment();
    this.items.forEach((item) => {
      fragment.appendChild(item.element.element);
    });
    this.element.element.appendChild(fragment);
    this.element.addClass(`${AUTO_COMPLETE_PREFIX}-opened`);
  }

  close() {
    this.element.removeClass(`${AUTO_COMPLETE_PREFIX}-opened`);
    this.items = [];
    this.element.element.innerHTML = ``;
  }
  onSelect(callback: CallableFunction) {
    this.onEvent(`${AUTO_COMPLETE_PREFIX}_select`, callback);
  }
}
export class Item extends Component<HTMLButtonElement> {
  menu: BaseElement<HTMLDivElement>;
  title: BaseElement<HTMLDivElement>;
  container: BaseElement<HTMLDivElement>;
  items: Item[] = [];
  isSelected: boolean;
  constructor(public item: ItemType) {
    super(
      createBaseElement(
        document.createElement(item.items?.length ? "div" : "button")
      )
    );
    this.isSelected = item.isSelected;
  }
  build(): void {
    this.element.addClass(`${AUTO_COMPLETE_PREFIX}-menu-item`);
    const fragment = document.createDocumentFragment();
    if (this.item.items?.length) {
      this.menu = createBaseElement<HTMLDivElement>(
        document.createElement("div")
      );
      this.menu.addClass(`${AUTO_COMPLETE_PREFIX}-menu`);
      this.item.items.forEach((item) => {
        const createdItem = new Item(item);
        createdItem.build();
        this.items.push(createdItem);
        this.menu.appendChild(createdItem.element);
      });
    } else {
      if (this.isSelected) {
        this.element.addClass(`${AUTO_COMPLETE_PREFIX}-selected`);
      }
      this.element.element.addEventListener("click", () => {
        this.dispatchEvent(`${AUTO_COMPLETE_PREFIX}_select`, this);
      });
    }
    if (this.item.title) {
      this.title = createBaseElement(document.createElement("div"));
      this.title.element.innerHTML = convertToHtml(this.item.title, this);
      fragment.appendChild(this.title.element);
    }
    this.container = createBaseElement(document.createElement("div"));
    if (this.item?.items?.length) {
      if (this.item.container) {
        this.container.element.innerHTML = convertToHtml(
          this.item.container,
          this,
          this.menu?.element?.innerHTML
        );
      } else {
        this.container.appendChild(this.menu);
      }
    } else {
      this.container.element.innerHTML = convertToHtml(
        this.item.container,
        this
      );
    }

    fragment.appendChild(this.container.element);
    this.element.element.appendChild(fragment);
  }
  onSelect(callback: CallableFunction) {
    this.onEvent(`${AUTO_COMPLETE_PREFIX}_select`, callback);
  }
}
