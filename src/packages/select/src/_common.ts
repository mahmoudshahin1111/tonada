export function getDefaultSelectOptions(): SelectConfig {
    return {
      search: false,
      multiple: false,
    } as SelectConfig;
  }

  export type SelectConfig = {
    search?: boolean;
    multiple?: boolean;
    options?: SelectConfigOption[];
  };
  export type SelectConfigOption = {
    label: string;
    value: string;
  };
  