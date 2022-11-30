import { Input } from "tonada-input/src/input";
import { BaseElement, Component } from "tonada-shared";
import { Config } from "./_common/types";
import { getDefaultConfig } from "./_common/utils";

export class InputSlider extends Component<HTMLDivElement> {
  input: Input;
  config: Config;
  constructor(element: BaseElement<HTMLDivElement>, config?: Config) {
    super(element);
    this.config = Object.assign(getDefaultConfig(), config);
  }
  build(): void {
    const fragment = document.createDocumentFragment();

    this.element.element.appendChild(fragment);
  }
 
}
