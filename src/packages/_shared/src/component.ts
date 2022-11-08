import { BaseElement } from "./base-element";
import { PREFIX } from "./defaults";

export abstract class Component<T extends HTMLElement = any> {
  private events: Map<string, CallableFunction[]> = new Map();
  constructor(public element: BaseElement<T>) {}
  abstract build(): void;
  hide() {
    this.element.setAttribute("hidden", "");
  }
  show() {
    this.element.removeAttribute("hidden");
  }
  onEvent(name: string, callBack: CallableFunction) {
    const eventNamePrefixed = `${name}_${this.element.key}`;
    if (!this.events.has(eventNamePrefixed)) {
      this.events.set(eventNamePrefixed, []);
      this.element.element.addEventListener(
        eventNamePrefixed,
        (eventPayload) => {
          this.events.forEach((event) => {
            event.forEach((callback) => {
              callback(eventPayload);
            });
          });
        }
      );
    }
    this.events.get(eventNamePrefixed).push(callBack);
  }
  dispatchEvent(name: string, payload?: any) {
    this.element.element.dispatchEvent(
      new CustomEvent(`${name}_${this.element.key}`, { detail: payload })
    );
  }
  getAllEvents() {
    const events: any = [];
    this.events.forEach((callbacks, name) => {
      events.push({
        name,
        callbacks,
      });
    });
    return events;
  }
}
