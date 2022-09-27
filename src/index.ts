import { Tonada } from "tonada-core";

const tonada: Tonada = new Tonada();

export const create = (
  componentName: string,
  element: HTMLDivElement,
  options: any
) => {
  return tonada.create(componentName, element, options);
};
