export type Config = {
  updateOn:'blur'|'change',
  value?:string;
  disabled?: boolean;
};


export type Item = {
  isSelected: boolean;
  title: string;
  container: string | Function | HTMLElement;
  value: string;
  items: Item[];
};
