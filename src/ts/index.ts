import { createBaseElement } from "../utils/inspector";
import { Accordion } from "./accordion";
import { InputPassword } from "./input-password";
import { Slider, SliderOptions } from "./slider";



export function createInputPassword(element:HTMLDivElement){
    return new InputPassword(createBaseElement(element));
}
export function createAccordion(element:HTMLDivElement){
    return new Accordion(createBaseElement(element));
}

export function createSlider(element:HTMLDivElement,options?:SliderOptions){
    return new Slider(createBaseElement(element),options);
}
export function createSliderPagination(element:HTMLDivElement){
    return 
}