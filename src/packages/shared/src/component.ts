import { BaseElement } from "./base-element";


export abstract class Component<T extends HTMLElement = any> {
  constructor(public element: BaseElement<T>) {}
  abstract build():void;
}

