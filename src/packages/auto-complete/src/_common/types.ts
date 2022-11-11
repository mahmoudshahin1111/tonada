export type Config = {
  disabled: boolean;
};

export type Option = {
  container: string | Function | HTMLElement;
  value: string;
};

export type Item = {
  isSelected: boolean;
  title: string;
  options: Option[];
} & Option;
