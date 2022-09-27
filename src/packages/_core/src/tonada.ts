import _ from "lodash";
declare var window: any;

export class Tonada {
  constructor() {}

  create(componentName: string, element: HTMLDivElement, config?: any) {
    try {
      return (window as any)[
        this.resolvePackInfoFromName(componentName)
      ].create(element, config);
    } catch (e) {
      console.error(
        `Make sure you had imported the package by add the proper <script> tag for ${componentName} or report your issue https://github.com/mahmoudshahin1111/tonada/issues`,
        e
      );
    }
  }
  resolvePackInfoFromName(name: string) {
    const nameSlices = String(name)
      .split("-")
      .map((nameSlice) => _.capitalize(nameSlice));
    return ["Tonada", ...nameSlices].join("");
  }
}
