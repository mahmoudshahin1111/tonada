export type Config = {
    showToggler?:boolean;
    toggled?:boolean;
    menuItems:MenuItem[];
};

export type MenuItem = {
    title:string|Function|HTMLElement;
    iconHTML:string|Function|HTMLElement;
    to:string;
    isOpened:boolean;
    children:MenuItem[];
    disabled:boolean;
    active:boolean;
}

export type MenuItemOptions = {
    extendDisabled:boolean;
}