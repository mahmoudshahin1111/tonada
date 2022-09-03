export class Tonada {
  constructor(public components: {name:string,componentClass:any}[]) {}
  create(componentName: string, element: HTMLDivElement, config?: any) {
    try{
      const component = this.components.find(
        (n) => n.name.toLowerCase() === componentName.toLowerCase()
      );
      if(!component){
        throw console.error(`Make sure you had imported the package by add the proper <script> tag for ${componentName}`);
      }
      return component.componentClass.create(element, config);
    }catch(e){
      console.error(`something wrong please report about the issue on https://github.com/mahmoudshahin1111/tonada`,e);
    }

  }
}
