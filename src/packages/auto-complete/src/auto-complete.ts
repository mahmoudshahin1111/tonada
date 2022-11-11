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
  add(item: Item) {
    this.element.appendChild(item.element);
    this.items.push(item);
  }
  open(items: ItemType[]) {
    this.items.forEach((item) => item.element.remove());
    items.forEach((item) => {
      let createdItem = null;
      // if has options will be unselectable
      if (item.options.length) {
        const itemTitle = document.createElement("div");
        if (item.options.length) {
          itemTitle.innerHTML = convertToHtml(item.title, item);
        }
        createdItem = new Item(
          null,
          createBaseElement<HTMLButtonElement>(itemTitle),
          {
            isSelected: item.isSelected,
            items: item.options.map((option) => {
              const itemContainer = document.createElement("button");
              itemContainer.innerHTML = convertToHtml(option.container, option);
              return new Item(
                option.value,
                createBaseElement<HTMLButtonElement>(itemContainer)
              );
            }),
          }
        );
        createdItem.build();
        this.add(createdItem);
      } else {
        // otherwise it will be selectable
        const itemContainer = document.createElement("button");
        itemContainer.innerHTML = convertToHtml(item.container, item);
        createdItem = new Item(
          null,
          createBaseElement<HTMLButtonElement>(itemContainer),
          {
            isSelected: item.isSelected,
            items: [],
          }
        );
  
        createdItem.onSelect(({ detail }: any) => {
          this.dispatchEvent(`${AUTO_COMPLETE_PREFIX}_select`, detail);
        });
      }

      createdItem.build();
      this.add(createdItem);
    });

    this.element.addClass(`${AUTO_COMPLETE_PREFIX}-opened`);
  }
  close() {
    this.items.forEach((item) => item.element.remove());
    this.element.removeClass(`${AUTO_COMPLETE_PREFIX}-opened`);
  }
  onSelect(callback: CallableFunction) {
    this.onEvent(`${AUTO_COMPLETE_PREFIX}_select`, callback);
  }
}
export class Item extends Component<HTMLButtonElement> {
  isSelected: boolean;
  items: Item[];
  menu: BaseElement<HTMLDivElement>;
  constructor(
    public value: string,
    element: BaseElement<HTMLButtonElement>,
    config?: { isSelected: boolean; items?: Item[] }
  ) {
    super(element);
    this.isSelected = config?.isSelected;
    this.items = config?.items;
  }
  build(): void {
    this.element.addClass(`${AUTO_COMPLETE_PREFIX}-menu-item`);
    const fragment = document.createDocumentFragment();
    if (this.items?.length) {
      this.menu = createBaseElement<HTMLDivElement>(
        document.createElement("div")
      );
      this.menu.addClass(`${AUTO_COMPLETE_PREFIX}-menu`);
      this.items.forEach((item) => {
        this.menu.appendChild(item.element);
      });
      fragment.appendChild(this.menu.element);
    } else {
      if (this.isSelected) {
        this.element.addClass(`${AUTO_COMPLETE_PREFIX}-selected`);
      }
      this.element.element.addEventListener("click", () => {
        this.dispatchEvent(`${AUTO_COMPLETE_PREFIX}_select`, this);
      });
    }

    this.element.element.appendChild(fragment);
  }
  onSelect(callback: CallableFunction) {
    this.onEvent(`${AUTO_COMPLETE_PREFIX}_select`, callback);
  }
}
