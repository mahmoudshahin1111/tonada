export function getDefaultSelectOptions(): SelectConfig {
    return {
      multiple: false,
      disabled:false,
    } as SelectConfig;
  }

  export type SelectConfig = {
    multiple?: boolean;
    disabled?:boolean;
    options?: SelectConfigOption[];
  };
  export type SelectConfigOption = {
    label: string;
    value: string;
  };
  