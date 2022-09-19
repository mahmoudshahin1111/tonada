import { SliderOptions } from "./types";

export function getDefaultSliderOptions(): SliderOptions {
    return {
      itemsPerPage: 1,
      slideAnimation: "moving",
      spaceBetween: 0,
      paginator: true,
      navigators: true,
      autoSliding: false,
      autoSlidingDuration: 2000,
    } as SliderOptions;
  }


