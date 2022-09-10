import { Config } from "./types";

export function getDefaultConfig(): Config {
    return {
      multiple: false,
      disabled:false,
    } as Config;
  }

