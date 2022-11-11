import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";

// should be moved to index 
export function create(element: HTMLDivElement) {
  const component = new Input(createBaseElement(element));
  component.build();
  return component;
}

export class Input extends Component<HTMLDivElement> {
  input: BaseElement<HTMLInputElement>;
  label: BaseElement<HTMLLabelElement>;
  constructor(element: BaseElement<HTMLDivElement>) {
    super(element);
  }
  build(): void {
    this.element.addClass(`${PREFIX}-control`);
    this.input = this.element.querySelector(`:scope > .${PREFIX}-input`).at(0);
    this.label = this.element.querySelector(`:scope > label`).at(0);
    if (this.label) {
      this.label.onEvent("click", () => {
        this.input.element.focus();
      });
    }
  }
}
