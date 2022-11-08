import { PREFIX } from "tonada-shared";
import { Config } from "./types";

export function getDefaultConfig(): Config {
  return {
    disabled:false
  } as Config;
}

export const AUTO_COMPLETE_PREFIX = `${PREFIX}-auto-complete`;

