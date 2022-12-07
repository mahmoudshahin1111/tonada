import { PREFIX } from "tonada-shared";
import { Config } from "./types";

export function getDefaultConfig(): Config {
  return {
    max:100,
    min:0,
    value:0,
    step:1,
  } as Config;
}

export const INPUT_SLIDER_PREFIX = `${PREFIX}-input-slider`;



