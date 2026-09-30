import { renderizarProjetos } from "./projetos.js";

const rotas = {
  inicio: null,
  projetos: "./projetos.html",
  cadastro: "./cadastro.html"
};

const CHAVE_ROTA = "ongHolySpirit:ultimaRota";

function lerUltimaRota() {
  try {
    const rotaSalva = localStorage.getItem(CHAVE_ROTA);

    if (!rotaSalva) return "";

    const hash = JSON.parse(rotaSalva);

    if (typeof hash !== "string" || !hash.startsWith("#")) {
      return "";
    }

    const nomeRota = hash.slice(1).split("/")[0];

    return rotas[nomeRota] !== undefined ? hash : "";
  } catch (erro) {
    console.warn("Não foi possível ler a rota salva.", erro);
    return "";
  }
}

async function carregarRota(app, conteudoInicio) {
  const hashRota =
    window.location.hash || lerUltimaRota() || "#inicio";

  const partesHash = hashRota.slice(1).split("/");
  const nomeRota = rotas[partesHash[0]] !== undefined
    ? partesHash[0]
    : "inicio";
  const idAlvo = partesHash[1];

  if (nomeRota === "inicio") {
    app.innerHTML = conteudoInicio;
  } else {
    try {
      const resposta = await fetch(rotas[nomeRota]);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar a página.");
      }

      const textoHtml = await resposta.text();
      const documento = new DOMParser().parseFromString(textoHtml, "text/html");
      const conteudoMain = documento.querySelector("main");

      if (!conteudoMain) {
        throw new Error("A página não possui uma área main.");
      }

      app.innerHTML = conteudoMain.innerHTML;

      if (nomeRota === "projetos") {
        renderizarProjetos(app);
      }
    } catch (erro) {
      app.innerHTML = `
        <section>
          <h1>Não foi possível carregar esta página</h1>
          <p>Confira os caminhos dos arquivos e abra o projeto pelo Live Server.</p>
        </section>
      `;
      console.error(erro);
      return;
    }
  }

  const rotaParaSalvar = nomeRota === "projetos" && idAlvo
    ? `#projetos/${idAlvo}`
    : `#${nomeRota}`;

  try {
    localStorage.setItem(
      CHAVE_ROTA,
      JSON.stringify(rotaParaSalvar)
    );
  } catch (erro) {
    console.warn("Não foi possível salvar a rota.", erro);
  }

  app.focus({ preventScroll: true });

  if (idAlvo) {
    document.getElementById(idAlvo)?.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

export function iniciarRotas() {
  const app = document.querySelector("#app");

  if (!app) return;

  const conteudoInicio = app.innerHTML;
  const atualizarRota = () => carregarRota(app, conteudoInicio);

  window.addEventListener("hashchange", atualizarRota);
  atualizarRota();
}