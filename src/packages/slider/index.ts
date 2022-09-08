import { createBaseElement } from "tonada-shared";
import { DefaultSlider } from "./src/default-slider";
import { FadingSlider } from "./src/fading-slider";
import { Slider } from "./src/slider";
import { SliderOptions, Slider as SliderType } from "./src/_common/types";
function create(element: HTMLDivElement, options?: SliderOptions): SliderType {
  const slider = new Slider(createBaseElement(element), options);
  let component: SliderType = new DefaultSlider(slider);
  if (options.slideAnimation === "fading") {
    component = new FadingSlider(slider);
  }
  component.build();
  return component;
}
export { Slider, create };
