import { mostrarToast } from "./notificacoes.js";

export function configurarFormulario() {
  document.addEventListener("submit", (evento) => {
    const formulario = evento.target;

    if (!formulario.matches("#form-cadastro")) return;

    evento.preventDefault();

    const regras = [
      {
        id: "nome",
        regex: /\S+/,
        mensagem: "Digite seu nome completo."
      },
      {
        id: "email",
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        mensagem: "Digite um e-mail válido."
      },
      {
        id: "cpf",
        regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        mensagem: "Use o formato 000.000.000-00."
      },
      {
        id: "telefone",
        regex: /^\(\d{2}\) \d{5}-\d{4}$/,
        mensagem: "Use o formato (00) 00000-0000."
      },
      {
        id: "cep",
        regex: /^\d{5}-\d{3}$/,
        mensagem: "Use o formato 00000-000."
      }
    ];

    formulario.querySelectorAll(".mensagem-erro").forEach((mensagem) => {
      mensagem.remove();
    });

    formulario.querySelectorAll(".campo-invalido").forEach((campo) => {
      campo.classList.remove("campo-invalido");
      campo.removeAttribute("aria-invalid");
      campo.removeAttribute("aria-describedby");
    });

    const camposInvalidos = [];

    regras.forEach((regra) => {
      const campo = formulario.querySelector(`#${regra.id}`);

      if (!campo) return;

      const valor = campo.value.trim();

      if (!regra.regex.test(valor)) {
        campo.classList.add("campo-invalido");
        campo.setAttribute("aria-invalid", "true");

        const mensagem = document.createElement("small");
        mensagem.className = "mensagem-erro";
        mensagem.id = `${regra.id}-erro`;
        mensagem.textContent = regra.mensagem;
        mensagem.setAttribute("role", "alert");

        campo.insertAdjacentElement("afterend", mensagem);
        campo.setAttribute("aria-describedby", mensagem.id);
        camposInvalidos.push(campo);
      }
    });

    if (camposInvalidos.length > 0) {
      camposInvalidos[0].focus();
      mostrarToast(
        "Confira os campos destacados e corrija os dados.",
        "warning"
      );
      return;
    }

    mostrarToast(
      "Os dados passaram pela validação. Este formulário demonstrativo não envia nem salva o cadastro.",
      "success"
    );
  });
}