import { BaseElement, Component, createBaseElement, PREFIX } from "tonada-shared";
import { getDefaultConfig } from "./_common/getDefaultConfig";
import { Config } from "./_common/types";

export class Checkbox  extends Component<HTMLDivElement>{
  checked:boolean;
  config:Config;
  value:string;
  checkbox:BaseElement<HTMLDivElement>;
  input:BaseElement<HTMLInputElement>;
  onChanged:(checked:boolean)=>void;
  constructor(element:BaseElement<HTMLDivElement>, config?:Config){
    console.log(config);
    
      super(element);
      this.config = Object.assign(getDefaultConfig(),config);
  }
  build(): void {
    this.element.addClass(`${PREFIX}-input-checkbox`);
    const fragment = document.createDocumentFragment();
    this.input = this.element.querySelector<HTMLInputElement>(':scope > input').at(0);
    this.input.hide();
    if(this.input.element.hasAttribute('disabled')){
      this.config.disabled = true;
    }
   if(this.input.element.hasAttribute('checked')){
    this.config.checked = true;
   }
    this.config.checked = this.input.element.hasAttribute('checked');
    this.value = this.input.element.getAttribute('value');
    this.checkbox = createBaseElement(document.createElement('div'));
    this.checkbox.addClass(`${PREFIX}-input-checkbox-box`);
    this.checkbox.element.innerHTML = `<i class="${PREFIX}-ic ${PREFIX}-ic-check"> </i>`;
    if(this.config.disabled){
      this.element.addClass(`${PREFIX}-input-checkbox-disabled`);
    }
    if(this.config.checked){
      this.check();
    }
    this.element.onEvent('click',(e)=>{
      if(this.config.disabled) return;
      e.preventDefault()
      this.toggle();
      this.onChanged ? this.onChanged(this.checked) : null;
    });
    fragment.appendChild(this.checkbox.element);
    this.element.element.appendChild(fragment);
  }
  toggle(){
    if(this.checked && !this.config.alwaysEnabled){
      return this.uncheck();
    }
    return this.check();
  }
  check(){
    this.element.addClass(`${PREFIX}-input-checkbox-checked`);
    this.input.element.checked = true;
    this.checked = true;
  }
  uncheck(){
    this.element.removeClass(`${PREFIX}-input-checkbox-checked`);
    this.input.element.checked = false;
    this.checked = false;
  }

}