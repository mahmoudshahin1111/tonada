import { BaseElement } from "tonada-shared";
export class Tonada {
  constructor(private _window: Window & { Tonada: any }) {}

  create(componentName: string, element: HTMLDivElement, config?: any) {
    try {
      return (this._window.Tonada[componentName as any] as any).create(
        element,
        config
      );
    } catch (e) {
      console.error(
        `Make sure you had imported the package by add the proper <script> tag for ${componentName} or report your issue https://github.com/mahmoudshahin1111/tonada/issues`,
        e
      );
    }
  }
}

export type CreateFunc<
  BaseElementType extends HTMLElement = any,
  ConfigType = any
> = (
  element: HTMLDivElement,
  config?: ConfigType
) => BaseElement<BaseElementType>;
