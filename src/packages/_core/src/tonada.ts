import { BaseElement } from "tonada-shared";
import * as Accordion from "tonada-accordion";
import * as Checkbox from "tonada-checkbox";
import * as CheckboxGroup from "tonada-checkbox-group";
import * as Input from "tonada-input";
import * as InputGroup from "tonada-input-group";
import * as InputPassword from "tonada-input-password";
import * as Select from "tonada-select";
import * as Slider from "tonada-slider";

export class Tonada {
  constructor() {}

  create(componentName: string, element: HTMLDivElement, config?: any) {
    try {
      switch (componentName) {
        case `accordion`:
          return Accordion.create(element);
        case `checkbox`:
          return Checkbox.create(element);
        case `checkbox-group`:
          return CheckboxGroup.create(element, config);
        case `input`:
          return Input.create(element);
        case `input-group`:
          return InputGroup.create(element);
        case `input-password`:
          return InputPassword.create(element);
        case `select`:
          return Select.create(element);
        case `slider`:
          return Slider.create(element, config);
      }
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
