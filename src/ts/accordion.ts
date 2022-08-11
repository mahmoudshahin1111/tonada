import { BaseElement } from "./base-element";
import { PREFIX } from "./shared";


export class Accordion extends BaseElement{
    private _sections = new Array<AccordionSection>();
    constructor(element: HTMLElement) {
        super(element);
        this.element.querySelectorAll(`.${PREFIX}-accordion-section`).forEach((section:HTMLElement)=>{
            const accordionSection = new AccordionSection(section);
            accordionSection.onToggled = ()=>this.closeTheOthersExcept(accordionSection);
            this._sections.push(accordionSection);
        });
    }
    closeTheOthersExcept(accordionSection:AccordionSection){
        this._sections.forEach((section:AccordionSection)=>{
            if(section != accordionSection){
                section.close();
            }
        });
    }

}

class AccordionSection extends BaseElement{
    private _toggler: HTMLElement;
    private _content: HTMLElement;
    private _isOpened: boolean = false;
    onToggled:()=>void;
    constructor(element: HTMLElement) {
        super(element);
        this._toggler = this.element.querySelector(`.${PREFIX}-accordion-toggler`);
        this._content = this.element.querySelector(`.${PREFIX}-accordion-content`);
        this._toggler.addEventListener('click',()=>{
            this.toggle();
         });
         this.close();
    }
    toggle(){
        this._content.classList.toggle(`${PREFIX}-hidden`);
        this.onToggled();
    }
    close(){
        this._content.classList.add(`${PREFIX}-hidden`);
    }
}