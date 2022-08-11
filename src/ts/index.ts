import { Accordion } from "./accordion";
import { InputPassword } from "./input-password";



export function createInputPassword(element:HTMLDivElement){
    return new InputPassword(element);
}
export function createAccordion(element:HTMLDivElement){
    return new Accordion(element);
}