import { default as Input } from "./input";
import { BaseElement } from "./base-element";

window.document.addEventListener('DOMContentLoaded',()=>{
    window.document.body.querySelectorAll('.tornada-input').forEach((inputElement:HTMLInputElement) => {
        const input = new Input(new BaseElement(inputElement));
        console.log("input created",input);
        
    })
});
