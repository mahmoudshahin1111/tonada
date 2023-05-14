import { createBaseElement } from "tonada-shared";
import { CalendarOptions } from "./src/_common/types";
import { Calendar } from "./src/calendar";

function create(element: HTMLDivElement, options: CalendarOptions): Calendar {
  const component = new Calendar(createBaseElement(element), options);
  component.build();
  return component;
}
export { Calendar, create };
