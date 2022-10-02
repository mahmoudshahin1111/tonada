import { Tonada } from "./src/tonada";

declare var window : Window & {Tonada:any};
const tonada: Tonada = new Tonada(window);

export default tonada;
