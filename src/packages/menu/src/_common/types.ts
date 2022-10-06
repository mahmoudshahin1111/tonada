export type Config = {
    showToggler?:boolean;
    menuItems:MenuItem[];
};

export type MenuItem = {
    title:string;
    iconHTML:string;
    to:string;
    children:MenuItem[];
}