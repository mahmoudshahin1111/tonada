export type Config = {
    showToggler?:boolean;
    toggled?:boolean;
    menuItems:MenuItem[];
};

export type MenuItem = {
    title:string|Function|HTMLElement;
    iconHTML:string|Function|HTMLElement;
    /**
     * redirect link
     */
    to:string;
    /** 
     * menu item opened by default
     */
    isOpened:boolean;
    children:MenuItem[];
    disabled:boolean;
    active:boolean;
}

export type MenuItemOptions = {
    isFloating:boolean;
}