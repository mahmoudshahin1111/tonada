import { packages } from "../package.json";
import { Tonada } from "tonada-core";
declare var window: any;
const packClasses = [];
for (const pack of packages) {
  const tonadaComponentClass = window[pack.className];
  if (tonadaComponentClass) {
    packClasses.push({
      name: pack.name,
      componentClass: tonadaComponentClass,
    });
  }
}

const tonada: Tonada = new Tonada(packClasses);

export const create = (
  componentName: string,
  element: HTMLDivElement,
  options: any
) => {
  return tonada.create(componentName, element, options);
};
