const projetos = [
  {
    id: "projeto-alimentar",
    categoria: "Assistência social",
    titulo: "Projeto Alimentar",
    imagem: "../imagens/projeto-alimentar.png",
    descricao: "Projeto voltado à distribuição de alimentos para famílias da comunidade."
  },
  {
    id: "projeto-educacao",
    categoria: "Assistência social",
    titulo: "Projeto Educação",
    imagem: "../imagens/projeto-educacao.png",
    descricao: "Projeto voltado ao apoio educacional de crianças e jovens."
  },
  {
    id: "projeto-discipulos",
    categoria: "Assistência social",
    titulo: "Projeto Gerando Discípulos",
    imagem: "../imagens/projeto-gerando-discipulos.png",
    descricao: "Projeto voltado para discipular pessoas de diferentes idades."
  },
  {
    id: "projeto-musical",
    categoria: "Assistência social",
    titulo: "Projeto Musical",
    imagem: "../imagens/projeto-musical.png",
    descricao: "Projeto voltado ao incentivo musical de crianças e jovens."
  }
];

export function renderizarProjetos(app) {
  const areaProjetos = app.querySelector("#lista-projetos");

  if (!areaProjetos) {
    console.error("Não encontrei a seção #lista-projetos.");
    return;
  }

  const botaoToast = areaProjetos.querySelector("#botao-toast");

  if (!botaoToast) {
    console.error("Não encontrei o botão #botao-toast.");
    return;
  }

  const cards = projetos.map((projeto) => `
    <article id="${projeto.id}">
      <span class="badge">${projeto.categoria}</span>
      <h3>${projeto.titulo}</h3>
      <img
        src="${projeto.imagem}"
        alt="${projeto.titulo}"
        loading="lazy"
      >
      <p>${projeto.descricao}</p>
    </article>
  `).join("");

  botaoToast.insertAdjacentHTML("beforebegin", cards);
}