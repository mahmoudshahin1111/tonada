import { PREFIX } from "tonada-shared";
import { Config, MenuItemOptions } from "./types";

export function getDefaultConfig(): Config {
    return {
      showToggler:true,
      menuItems:[],
      toggled:false,
    } as Config;
  }


export const SIDENAV_PREFIX = `${PREFIX}-sidenav`

export function getDefaultMenuItemOptions():MenuItemOptions{
  return {
    isFloating:false,
  } as MenuItemOptions
}