export function configurarMenu() {
  const botaoMenu = document.querySelector(".botao-menu");
  const menuPrincipal = document.querySelector("#menu-principal");
  const itemComSubmenu = menuPrincipal?.querySelector(".item-com-submenu");

  if (!botaoMenu || !menuPrincipal) return;

  // Remove o bloqueio quando o ponteiro sai do item.
  itemComSubmenu?.addEventListener("pointerleave", () => {
    itemComSubmenu.classList.remove("submenu-fechado");
  });

  // Remove o bloqueio quando o foco sai do item.
  itemComSubmenu?.addEventListener("focusout", (evento) => {
    if (!itemComSubmenu.contains(evento.relatedTarget)) {
      itemComSubmenu.classList.remove("submenu-fechado");
    }
  });

  botaoMenu.addEventListener("click", () => {
    const aberto = botaoMenu.getAttribute("aria-expanded") === "true";

    botaoMenu.setAttribute("aria-expanded", String(!aberto));
    menuPrincipal.classList.toggle("aberto", !aberto);
  });

  menuPrincipal.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) {
      menuPrincipal.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      itemComSubmenu?.classList.remove("submenu-fechado");
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") return;

    const menuAberto =
      botaoMenu.getAttribute("aria-expanded") === "true";

    if (menuAberto) {
      menuPrincipal.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.focus();
      return;
    }

    const itemAtivo = menuPrincipal.querySelector(
      ".item-com-submenu:hover, .item-com-submenu:focus-within"
    );

    if (!itemAtivo) return;

    itemAtivo.classList.add("submenu-fechado");
    itemAtivo.querySelector(":scope > a")?.focus();
  });
}