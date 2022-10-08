import { createBaseElement } from "tonada-shared";
import { Sidenav } from "./src/sidenav";
import { getDefaultConfig } from "./src/_common/getDefaultConfig";
import { Config } from "./src/_common/types";
function create(element: HTMLDivElement, config?: Config) {
  const component = new Sidenav(createBaseElement(element), Object.assign(getDefaultConfig(),config));
  component.build();
  return component;
}
export { Sidenav, create };
