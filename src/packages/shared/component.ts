import { BaseElement } from "./base-element";


export abstract class Component {
  constructor(public element: BaseElement) {}
  abstract build():void;
}

