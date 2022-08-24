import { createBaseElement } from "../utils/common";
import { BaseElement } from "./base-element";
import { Component } from "./component";

export function create(element: HTMLDivElement) {
    return new Select(createBaseElement(element));
  }

export class Select extends Component {
  private select : BaseElement;
  constructor(element: BaseElement) {
    super(element);
  }
}
export class SelectItem {
  constructor(element: BaseElement) {}
}
