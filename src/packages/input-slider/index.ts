import { InputSlider } from './src/input-slider';
import { createBaseElement } from "tonada-shared";
import { Config } from './src/_common/types';



function create(element: HTMLDivElement,config:Config) {
    const component = new InputSlider(createBaseElement(element),config);
    component.build();
    return component;
  }

export { InputSlider, create };
