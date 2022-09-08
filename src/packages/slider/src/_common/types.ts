export abstract class Slider {
    abstract build(): void;
    abstract prevSlider(): void;
    abstract nextSlider(): void;
    abstract goToPage(page: number): void;
    abstract getPagesCount(): number;
  }

  export  type SliderOptions = {
    itemsPerPage?: number;
    spaceBetween?: number;
    slideAnimation?: "moving" | "fading";
    infinite?: boolean;
    paginator?: boolean;
    navigators?: boolean;
    infiniteSlidingDuration?: number;
  };