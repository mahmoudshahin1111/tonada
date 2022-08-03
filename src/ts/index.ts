import { default as Input } from "./input";
import { TornadaElement } from "./tornada-element";

window.document.addEventListener('DOMContentLoaded',()=>{
    window.document.body.querySelectorAll('.tornada-input').forEach((input:HTMLInputElement) => {
        const tornadaElement:Input = new Input(new TornadaElement(input));
    })
});
