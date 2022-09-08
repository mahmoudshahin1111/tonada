import { createBaseElement } from "tonada-shared";
import { Select } from "./src/select";
import { SelectConfig } from "./src/_common";
function create(element: HTMLDivElement, config?: SelectConfig) {
  const component = new Select(createBaseElement(element), config);
  component.build();
  return component;
}
export { Select, create };
