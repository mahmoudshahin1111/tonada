import { BaseElement, Component, createBaseElement, PREFIX } from "tonada-shared";
import {create} from 'tonada-input-checkbox';
import { getDefaultConfig } from "./_common/getDefaultConfig";
import { Config } from "./_common/types";

export class CheckboxGroup  extends Component<HTMLDivElement>{
  config:Config;
  checkbox:BaseElement<HTMLDivElement>;
  constructor(element:BaseElement<HTMLDivElement>, config?:Config){
      super(element);
      this.config = Object.assign(getDefaultConfig(),config);
  }
  build(): void {
    this.element.addClass(`${PREFIX}-input-checkbox-group`);
    // const fragment = document.createDocumentFragment();
    const checkboxes = this.element.querySelector(':scope > div');
    // checkboxes.forEach(checkbox=>{
    //   create(checkbox.element);
    // });
    // this.element.element.appendChild(fragment);
  }
  

}