import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";

export class Accordion extends Component {
  private _sections = new Array<AccordionSection>();
  constructor(element: BaseElement<HTMLDivElement>) {
    super(element);
  }
  build(): void {
    this.element
      .querySelector(`:scope > .${PREFIX}-accordion-section`)
      .forEach((section:BaseElement<HTMLDivElement>) => {
        const accordionSection = new AccordionSection(section);
        accordionSection.onToggled = () =>
          this.closeTheOthersExcept(accordionSection);
        this._sections.push(accordionSection);
      });
  }
  private closeTheOthersExcept(accordionSection: AccordionSection) {
    this._sections.forEach((section: AccordionSection) => {
      if (section != accordionSection) {
        section.close();
      }
    });
  }
  getSections() {
    return this._sections;
  }
}

class AccordionSection {
  private _header: BaseElement<HTMLElement>;
  private _content: BaseElement<HTMLElement>;
  private _contentHeight: number;
  onToggled: () => void;
  constructor(private element: BaseElement<HTMLDivElement>) {
    this._header = this.element
      .querySelector(`.${PREFIX}-accordion-header`)
      .at(0);
    this._content = this.element
      .querySelector(`.${PREFIX}-accordion-content`)
      .at(0);
    this._contentHeight = this._content.getHeight();
    this._header.onEvent("click", () => this.toggle());
    this.close();
  }
  toggle() {
    if (this.element.hasClass(`${PREFIX}-closed`)) {
      this.open();
    } else {
      this.close();
    }
    this.onToggled();
  }
  open() {
    this.element.removeClass(`${PREFIX}-closed`);
    this._content.setStyle("height", `${this._contentHeight.toString()}px`);
  }
  close() {
    this.element.addClass(`${PREFIX}-closed`);
    this._content.setStyle("height", "0");
  }
}
