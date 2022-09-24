import packageJson from "../package.json";
import { Tonada } from "tonada-core";
import _ from "lodash";
declare var window: any;
const packClasses = [];
const resolvePackInfoFromName = (name:string) => {
  const nameSlices = String(name)
    .split("-")
    .map((nameSlice) => _.capitalize(nameSlice));
  return [_.capitalize(packageJson.name), ...nameSlices].join("");
};

for (const pack of packageJson.packages) {
  const tonadaComponentClass = window[resolvePackInfoFromName(pack.name)];
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
