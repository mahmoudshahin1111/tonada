export type Config = {
    showToggler?:boolean;
    menuItems:MenuItem[];
};

export type MenuItem = {
    title:string;
    iconHTML:string;
    to:string;
    isOpened:boolean;
    children:MenuItem[];
}

export type MenuItemOptions = {
    isFloating:boolean;
}