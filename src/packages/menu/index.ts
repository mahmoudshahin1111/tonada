import { createBaseElement } from "tonada-shared";
import { Menu } from "./src/menu";


function create(element: HTMLDivElement) {
    const component = new Menu(createBaseElement(element));
    component.build();
    return component;
  }

export { Menu, create };
