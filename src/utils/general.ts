export function extendObject<T>(base:any, mixin:any) : T {
  Object.getOwnPropertyNames(mixin).forEach((name) => {
    base[name] = mixin[name];
  }
  );
  return base;
}