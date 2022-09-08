import data from "./data/rickandmorty/rickandmorty.js";
import {
  orderCrescente,
  ordemDecrescente,
  filterArr,
  porcentagemCal,
} from "./data.js";

function renderizaCards(cards) {
  const root = document.getElementById("root");
  root.className = "container";
  root.innerHTML = cards.join("");
}

const btn = document.getElementById("tudo");

btn.addEventListener("click", function () {
  const markup = data.results.sort(orderCrescente).map((result) => {
    return montarCards(result);
  });
  console.log(markup);
  renderizaCards(markup);
});

const btnCrescente = document.getElementById("ordenaz");
btnCrescente.addEventListener("click", function () {
  const markup = data.results.sort(orderCrescente).map((result) => {
    return montarCards(result);
  });
  renderizaCards(markup);
});

const btnDecrescente = document.getElementById("ordenza");
btnDecrescente.addEventListener("click", function () {
  const markup = data.results.sort(ordemDecrescente).map((result) => {
    return montarCards(result);
  });
  renderizaCards(markup);
});

function montarCards(param) {
  return `
  <div class="card">
  <div class="card-image">
    <img src="${param.image}" class="foto" alt="" />
  </div>
  <div class="card-conteudo">
    <h3>${param.name}</h3>
    <label class="letras">Status: ${param.status} </label>
    <label class="letras">Especie: ${param.species} </label>
    <label class="letras">Genero: ${param.gender} </label>
    <label class="letras">Local: ${param.location.name} </label>
    <label class="letras">Origem: ${param.origin.name} </label>
  </div>
</div>
`;
}

const btnDesconhecido = document.getElementById("desconhecido");

btnDesconhecido.addEventListener("click", function () {
  const markup = filterArr(data.results, "status", "unknown").map((result) => {
    return montarCards(result);
  });

  renderizaCards(markup);
});

const btnVivo = document.getElementById("vivo");

btnVivo.addEventListener("click", function () {
  const markup = filterArr(data.results, "status", "Alive").map((result) => {
    return montarCards(result);
  });
  renderizaCards(markup);
});

const btnMorto = document.getElementById("morto");
btnMorto.addEventListener("click", function () {
  const markup = filterArr(data.results, "status", "Dead").map((result) => {
    return montarCards(result);
  });

  renderizaCards(markup);
});

const btnEspecie = document.getElementById("especie");

btnEspecie.addEventListener("click", function () {
  const markup = filterArr(data.results, "species", "Alien").map((result) => {
    return montarCards(result);
  });

  renderizaCards(markup);
});

window.addEventListener("load", function () {
  // Get the checkbox
  let chk = document.getElementById("menu-btn");
  // Get all menu links
  let menuLinks = document.querySelectorAll(".menu li a");
  // Loop on links
  menuLinks.forEach(function (item) {
    // Add event listener to each links
    item.addEventListener("click", function () {
      // When link is clicked, uncheck the checkbox to hide menu
      chk.checked = false;
    });
  });

  btnEspecie.textContent = `Alien (${porcentagemCal(
    filterArr(data.results, "species", "Alien").length,
    data.results.length
  )})`;

  btnVivo.textContent = `Vivos (${porcentagemCal(
    filterArr(data.results, "status", "Alive").length,
    data.results.length
  )})`;

  btnMorto.textContent = `Mortos (${porcentagemCal(
    filterArr(data.results, "status", "Dead").length,
    data.results.length
  )})`;

  btnDesconhecido.textContent = `Desconhecidos (${porcentagemCal(
    filterArr(data.results, "status", "unknown").length,
    data.results.length
  )})`;
});
