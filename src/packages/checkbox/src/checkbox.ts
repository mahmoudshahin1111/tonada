import { BaseElement, Component, createBaseElement, PREFIX } from "tonada-shared";
import { Config } from "./_common/types";

export class Checkbox  extends Component{
  checked:boolean;
  constructor(element:BaseElement,public config:Config){
      super(element);
  }
  build(): void {
    const fragment = document.createDocumentFragment();
    this.element.element.appendChild(fragment);
  }
  toggle(){
    if(this.checked){
      return this.uncheck();
    }
    return this.check();
  }
  check(){
    this.element.addClass(`${PREFIX}-input-checkbox-checked`);
    this.checked = true;
  }
  uncheck(){
    this.element.removeClass(`${PREFIX}-input-checkbox-checked`);
    this.checked = false;
  }

}