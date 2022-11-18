export type Config = {
  disabled: boolean;
};


export type Item = {
  isSelected: boolean;
  title: string;
  container: string | Function | HTMLElement;
  value: string;
  items: Item[];
};
