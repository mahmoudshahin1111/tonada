import { createBaseElement } from "../utils/common";
import { BaseElement } from "./base-element";
import { Component } from "./component";

export function create(element: HTMLDivElement) {
    const component = new Select(createBaseElement(element));
    component.build();
    return component;
  }

export class Select extends Component {
  private select : BaseElement;
  constructor(element: BaseElement) {
    super(element);
  }
  build(): void {
    console.log("select builded");
    
  }
}
export class SelectHeader {
    constructor(element:BaseElement){

    }
}
export class SelectOption {
  constructor(element: BaseElement) {}
}
