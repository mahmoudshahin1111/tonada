import { BaseElement, Component, PREFIX } from "tonada-shared";
import type {
  CalendarOptions,
  Calendar as CalendarType,
} from "./_common/types";

export class Calendar extends Component implements CalendarType {
  constructor(
    element: BaseElement<HTMLElement>,
    public options?: CalendarOptions
  ) {
    super(element);
  }
  build(): void {
    this.element.addClass(`${PREFIX}-calendar`);
  }
}
