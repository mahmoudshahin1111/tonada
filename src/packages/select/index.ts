import { createBaseElement } from "tonada-shared";
import { Select } from "./src/select";
import { Config } from "./src/_common/types";
function create(element: HTMLDivElement, config?: Config) {
  const component = new Select(createBaseElement(element), config);
  component.build();
  return component;
}
export { Select, create };
