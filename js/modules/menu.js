export function configurarMenu() {
  const botaoMenu = document.querySelector(".botao-menu");
  const menuPrincipal = document.querySelector("#menu-principal");

  if (!botaoMenu || !menuPrincipal) return;

  botaoMenu.addEventListener("click", () => {
    const aberto = botaoMenu.getAttribute("aria-expanded") === "true";

    botaoMenu.setAttribute("aria-expanded", String(!aberto));
    menuPrincipal.classList.toggle("aberto", !aberto);
  });

  menuPrincipal.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) {
      menuPrincipal.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      menuPrincipal.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.focus();
    }
  });
}