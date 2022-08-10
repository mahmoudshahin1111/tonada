export const PREFIX = 'tn';
export const version = '1.0.0';
export const DEBUG = true;

export function log(...args:string[]|any[]) {
    if(DEBUG){
        console.log.apply(console, ...args);
    }
}