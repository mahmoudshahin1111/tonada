import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";

export function create(element: HTMLDivElement) {
  const component = new Input(createBaseElement(element));
  component.build();
  return component;
}

export class Input extends Component {
  input: BaseElement<HTMLElement>;
  label: BaseElement<HTMLElement>;
  constructor(element: BaseElement<HTMLElement>) {
    super(element);
  }
  build(): void {
    this.input = this.element.querySelector(`:scope > .${PREFIX}-input`).at(0);
    this.label = this.element.querySelector(`:scope > label`).at(0);
    if (this.label) {
      this.label.onEvent("click", () => {
        this.input.element.focus();
      });
    }
  }
}