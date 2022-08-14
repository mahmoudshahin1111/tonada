import { createBaseElement } from "../utils/inspector";
import { Accordion } from "./accordion";
import { InputPassword } from "./input-password";



export function createInputPassword(element:HTMLDivElement){
    return new InputPassword(createBaseElement(element));
}
export function createAccordion(element:HTMLDivElement){
    return new Accordion(createBaseElement(element));
}