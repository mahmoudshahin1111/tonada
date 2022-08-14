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
    private closeTheOthersExcept(accordionSection:AccordionSection){
        this._sections.forEach((section:AccordionSection)=>{
            if(section != accordionSection){
                section.close();
            }
        });
    }
    getSections(){
        return this._sections;
    }

}

class AccordionSection extends BaseElement{
    private _header: HTMLElement;
    private _content: HTMLElement;
    onToggled:()=>void;
    constructor(element: HTMLElement) {
        super(element);
        this._header = this.element.querySelector(`.${PREFIX}-accordion-header`);
        this._content = this.element.querySelector(`.${PREFIX}-accordion-content`);
        this._header.addEventListener('click',()=>{
            this.toggle();
         });
         this.close();
    }
    toggle(){
        this._content.classList.toggle(`${PREFIX}-hidden`);
        this.onToggled();
    }
    open(){
        this._content.classList.remove(`${PREFIX}-hidden`);
    }
    close(){
        this._content.classList.add(`${PREFIX}-hidden`);
    }
}