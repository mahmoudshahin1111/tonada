import { BaseElement, Component } from "tonada-shared";
import { Config } from "./_common/types";

export class SidenavContent extends Component{
    constructor(element:BaseElement<HTMLElement>,private _config:Config){
        super(element)
    }
    build(): void {
        
    }

}