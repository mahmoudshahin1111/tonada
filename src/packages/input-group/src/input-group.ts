import {
  BaseElement,
  Component,
  PREFIX,
} from "tonada-shared";



export class InputGroup extends Component {
  input: BaseElement<HTMLElement>;
  label: BaseElement<HTMLElement>;
  constructor(element: BaseElement<HTMLElement>) {
    super(element);
  }
  build(): void {
    this.input = this.element.querySelector(`:scope > .${PREFIX}-input`).at(0);
    this.label = this.element.querySelector(`:scope > label`).at(0);
    this.input.addClass(`${PREFIX}-control`);
    if (this.label) {
      this.label.onEvent("click", () => {
        this.input.element.focus();
      });
    }
  }
}
