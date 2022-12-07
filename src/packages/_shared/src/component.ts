import { BaseElement } from "./base-element";
import { PREFIX } from "./defaults";

export abstract class Component<
  T extends HTMLElement = any,
  TConfig = Record<string, any>
> {
  protected events: Map<string, CallableFunction[]> = new Map();

  public config:TConfig = {} as TConfig;

  constructor(public element: BaseElement<T>,config?:TConfig) {
    if(config){
      this.config = config;
    }
  }
  
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
          const listeners = this.events.get(eventNamePrefixed);
          listeners.forEach((listener) => {
            listener(eventPayload);
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

