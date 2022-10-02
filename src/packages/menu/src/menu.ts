import {
  BaseElement,
  Component,
  PREFIX,
} from "tonada-shared";
import { Config } from "./_common/types";

export class Select extends Component {
 
  constructor(
    element: BaseElement<HTMLSelectElement>,
    config?: Config
  ) {
    super(element);
   
  }
  build(): void {
    const fragment = document.createDocumentFragment();
    this.element.addClass(`${PREFIX}-menu`);
    
   
    this.element.element.appendChild(fragment);
  }
 
}
