import { components as tonadaComponents } from "../../package.json";

declare var window: any;

export function create(
  componentName: string,
  element: HTMLDivElement,
  config?: any
) {
  const tonadaComponent = tonadaComponents.find(
    (n) => n.name.toLowerCase() === componentName.toLowerCase()
  );
  return window[tonadaComponent.className]["create"](element, config);
}
