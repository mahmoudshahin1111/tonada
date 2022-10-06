import { createBaseElement } from "tonada-shared";
import { Menu } from "./src/menu";
import { getDefaultConfig } from "./src/_common/getDefaultConfig";
import { Config } from "./src/_common/types";
function create(element: HTMLDivElement, config?: Config) {
  const component = new Menu(createBaseElement(element), Object.assign(getDefaultConfig(),config));
  component.build();
  return component;
}
export { Menu, create };
