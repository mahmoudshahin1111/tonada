import Tonada from "tonada-core";

export const create = (
  componentName: string,
  element: HTMLDivElement,
  options: any
) => {
  return Tonada.create(componentName, element, options);
};
