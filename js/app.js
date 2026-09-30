import { configurarMenu } from "./modules/menu.js";
import { configurarFormulario } from "./modules/formulario.js";
import { mostrarToast } from "./modules/notificacoes.js";
import { iniciarRotas } from "./modules/rotas.js";

configurarMenu();
configurarFormulario();
iniciarRotas();

document.addEventListener("click", (evento) => {
  if (evento.target.closest("#botao-toast")) {
    mostrarToast("Esta é uma mensagem de exemplo.");
  }
});