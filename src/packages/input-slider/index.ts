import { InputSlider } from './src/input-slider';
import { createBaseElement } from "tonada-shared";



function create(element: HTMLDivElement) {
    const component = new InputSlider(createBaseElement(element));
    component.build();
    return component;
  }

export { InputSlider, create };
