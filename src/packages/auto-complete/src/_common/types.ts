export type Config = {
  disabled: boolean;
  updateOn:'blur'|'change'
};


export type Item = {
  isSelected: boolean;
  title: string;
  container: string | Function | HTMLElement;
  value: string;
  items: Item[];
};
