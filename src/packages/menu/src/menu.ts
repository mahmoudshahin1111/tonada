import { BaseElement, Component, PREFIX } from "tonada-shared";

/**
 * 1- can add the menu details by writing it's html and i should use this to display the menu in the proper position
 * 2- should be able to create the list by passing the menu as an object while creating but this is 
 * not good because mostly our users use server side rendering 
 * 3- calculate the right position based on the parent position 
 *  *caution*
 *  - if the menu will display at the bottom for example and there isn't enough place recalculate the proper position again 
 * 
 */

export class Menu extends Component {
  constructor(element: BaseElement<HTMLElement>) {
    super(element);
  }
  build(): void {
    this.element.addClass(`${PREFIX}-menu`);
    const fragment = document.createDocumentFragment();


    this.element.element(fragment);
  }
}
