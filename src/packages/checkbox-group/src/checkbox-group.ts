import { BaseElement, Component, createBaseElement, PREFIX } from "tonada-shared";
import {create,Checkbox} from 'tonada-checkbox';
import { getDefaultConfig } from "./_common/getDefaultConfig";
import { Config } from "./_common/types";

export class CheckboxGroup  extends Component<HTMLDivElement>{
  config:Config;
  checkboxes:Checkbox[] = [];
  selectedCheckbox:Checkbox;
  constructor(element:BaseElement<HTMLDivElement>, config?:Config){
      super(element);
      this.config = Object.assign(getDefaultConfig(),config);
  }
  build(): void {
    this.element.addClass(`${PREFIX}-checkbox-group`);
    const checkboxesElements = this.element.querySelector(':scope > div');
    checkboxesElements.forEach(checkboxesElement=>{
      const checkbox = create(checkboxesElement.element,{alwaysEnabled:true});
      this.checkboxes.push(checkbox);
      checkbox.onChanged = (checked)=>{
        if(checked){
          this.selectedCheckbox = checkbox;
          this.deselectAllExcept(checkbox);
        }
      };
    });
  }
  deselectAllExcept(checkbox:Checkbox){
    this.checkboxes.forEach(c=>{
          if(checkbox === c) return true;
          c.uncheck();
    })
  }
  

}