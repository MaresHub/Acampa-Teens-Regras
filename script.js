const dadosRegras = {
  "orientacoes-gerais": {
    titulo: "ORIENTAÇÕES GERAIS",
    icone: "fas fa-campground",
    conteudo: `
      <div class="banner-logo">
        
<img src="Acampamento.png" alt="Logo Acampa Teens" class="logo-banner" />
      </div>
      <p>Olá Acampante, tudo bem ?</p>
      <p>Estamos em contagem regressiva para nosso Acampa Teens, estamos preparando um fim de semana incrível para você, além de muita diversão teremos muita presença de Deus! Será um tempo marcante na sua vida. 🔥</p>
      
      <div class="container-relogio" id="relogioContagem">
        <div class="bloco-tempo">
          <span id="dias" class="numero-tempo">00</span>
          <span class="label-tempo">Dias</span>
        </div>
        <div class="bloco-tempo">
          <span id="horas" class="numero-tempo">00</span>
          <span class="label-tempo">Horas</span>
        </div>
        <div class="bloco-tempo">
          <span id="minutos" class="numero-tempo">00</span>
          <span class="label-tempo">Minutos</span>
        </div>
        <div class="bloco-tempo">
          <span id="segundos" class="numero-tempo">00</span>
          <span class="label-tempo">Segundos</span>
        </div>
      </div>
      <p>Para tornar a experiência ainda melhor, separamos aqui uma lista de itens dispensáveis para o fim de semana, além de algumas orientações com regras e deveres.</p>
      <p><strong class="destaque">Por favor, leia tudo com muita atenção e se caso haja dúvidas, pode me chamar no pv. 🙋🏻‍♀</strong></p>
    `,
  },
  "o-que-levar": {
    titulo: "O QUE LEVAR? 💼 ✅",
    icone: "fas fa-suitcase-rolling",
    conteudo: `
      <p>Aqui está a lista de itens essenciais para o nosso fim de semana:</p>
      <ul>
        <li>Roupas confortáveis para o fim de semana.</li>
        <li>Uma muda de roupa que possa sujar (teremos uma brincadeira com muita tinta)</li>
        <li>Um par de tênis que possa sujar 👟</li>
        <li>Roupa para banho na piscina (não será permitido banho na piscina com biquínis/sunga.) 🏊</li>
        <li>Toalha</li>
        <li>Roupa de cama (Travesseiro, cobertor, lençol etc.)</li>
        <li>Itens de higiene pessoal (Sabonete, shampoo, condicionador, desodorante, pasta de dentes, escova etc…)</li>
        <li>Bíblia</li>
        <li>Remédios de uso contínuo (informar a equipe com antecedência, caso seja necessário uso de medicamentos durante o evento)</li>
        <li>Chinelo</li>
      </ul>
    `,
  },
  "o-que-nao-levar": {
    titulo: "O QUE NÃO LEVAR? 💼❌",
    icone: "fas fa-ban",
    conteudo: `
      <p>Por favor, <strong>NÃO LEVE</strong> os seguintes itens:</p>
      <ul>
        <li><strong>Celular:</strong> Durante o acampamento é proibido uso de celular, então orientamos que não levem o aparelho, já que a equipe não se responsabilizará por possíveis danos com problemas com aparelho.</li>
        <li>Roupas novas (você pode acabar sujando ou estragando).</li>
      </ul>
    `,
  },
  "regras-acampa": {
    titulo: "REGRAS DO ACAMPA",
    icone: "fas fa-scroll",
    conteudo: `
      <p>Para a boa convivência de todos, temos algumas regras importantes:</p>
      <ol>
        <li>Toda nossa programação tem horário, então TODOS precisam estar presentes no horário determinado.</li>
        <li>Todos devem participar das dinâmicas e demais atividades. (Ressalva problemas de saúde).</li>
        <li>Todos os problemas ou situações que venham acontecer a equipe é responsável em resolver, então qualquer problema recorram a equipe, não tentem resolver sozinhos.</li>
        <li>Caso você precise de algum remédio, não se alto medique antes de informar a equipe.</li>
        <li>A organização e limpeza dos quartos também é responsabilidade dos acampantes, caso peças sejam encontradas no chão ou pelos cantos do sitio, iram para o varal da vergonha, e só poderiam ser retiradas de lá, no final do acampamento.</li>
        <li>Não será tolerado nenhum tipo de desrespeito.</li>
        <li><strong class="destaque">NÃO SERÁ PERMITIDO USO DE CELULAR.</strong> Caso seja necessário contato com algum familiar, recorra alguém da equipe.</li>
        <li>Palavrões e xingamentos são proibidos, pode gerar perca de pontos.</li>
        <li>Seus pertences são responsabilidade sua, então cuide! E não pegue nada de ninguém sem permissão.</li>
      </ol>
    `,
  },
};

const ordemNavegacao = [
  "orientacoes-gerais",
  "o-que-levar",
  "o-que-nao-levar",
  "regras-acampa",
];

let secaoAtual = "orientacoes-gerais";
let resultadosBusca = [];
let temporizadorContagem;
let temaAtual = localStorage.getItem("tema") || "dark";

const itensNavegacao = document.querySelectorAll(".item-navegacao");
const corpoConteudo = document.getElementById("corpoConteudo");
const barraLateralDireita = document.getElementById("barraLateralDireita");
const campoBusca = document.getElementById("campoBusca");
const modalBusca = document.getElementById("modalBusca");
const containerResultadosBusca = document.getElementById("resultadosBusca");
const botaoMenuToggle = document.getElementById("botaoMenuToggle");
const barraLateralEsquerda = document.querySelector(".barra-lateral-esquerda");
const alternadorTema = document.getElementById("alternadorTema");

function iniciarContagemRegressiva() {
  if (temporizadorContagem) {
    clearInterval(temporizadorContagem);
  }
  const dataAlvo = new Date("2025-10-31T21:00:00").getTime();
  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");
  const relogioEl = document.getElementById("relogioContagem");
  if (!diasEl || !horasEl || !minutosEl || !segundosEl || !relogioEl) {
    return;
  }
  function atualizarRelogio() {
    const agora = new Date().getTime();
    const diferenca = dataAlvo - agora;
    if (diferenca < 0) {
      clearInterval(temporizadorContagem);
      relogioEl.innerHTML =
        "<h3 class='contagem-finalizada'>O ACAMPAMENTO COMEÇOU!</h3>";
      return;
    }
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    diasEl.innerText = dias.toString().padStart(2, "0");
    horasEl.innerText = horas.toString().padStart(2, "0");
    minutosEl.innerText = minutos.toString().padStart(2, "0");
    segundosEl.innerText = segundos.toString().padStart(2, "0");
  }
  atualizarRelogio();
  temporizadorContagem = setInterval(atualizarRelogio, 1000);
}

function inicializar() {
  carregarSecao(secaoAtual);
  configurarEventListeners();
  aplicarTema();
}

function configurarEventListeners() {
  botaoMenuToggle.addEventListener("click", () => {
    barraLateralEsquerda.classList.toggle("ativo");
  });
  document.querySelectorAll(".item-navegacao").forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 1023) {
        barraLateralEsquerda.classList.remove("ativo");
      }
    });
  });
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 1023 &&
      barraLateralEsquerda.classList.contains("ativo") &&
      !e.target.closest(".barra-lateral-esquerda") &&
      !e.target.closest("#botaoMenuToggle")
    ) {
      barraLateralEsquerda.classList.remove("ativo");
    }
  });
  itensNavegacao.forEach((item) => {
    item.addEventListener("click", (e) => {
      const secao = e.currentTarget.dataset.section;
      if (secao) {
        definirItemNavegacaoAtivo(e.currentTarget);
        carregarSecao(secao);
      }
    });
  });
  campoBusca.addEventListener("input", manipularBusca);
  campoBusca.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      fecharModalBusca();
    }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      campoBusca.focus();
    }
    if (e.key === "Escape") {
      fecharModalBusca();
    }
  });
  alternadorTema.addEventListener("click", alternarTema);
  modalBusca.addEventListener("click", (e) => {
    if (e.target === modalBusca) {
      fecharModalBusca();
    }
  });
  window.addEventListener("scroll", atualizarIndiceAtivoConteudo);
}

function criarBotoesNavegacao(idSecaoAtual) {
  const indiceAtual = ordemNavegacao.indexOf(idSecaoAtual);
  const secaoAnterior =
    indiceAtual > 0 ? ordemNavegacao[indiceAtual - 1] : null;
  const proximaSecao =
    indiceAtual < ordemNavegacao.length - 1
      ? ordemNavegacao[indiceAtual + 1]
      : null;
  let htmlNavegacao = '<div class="navegacao-pagina">';
  if (secaoAnterior) {
    const dadosAnterior = dadosRegras[secaoAnterior];
    htmlNavegacao += ` <div class="botao-navegacao anterior" data-section="${secaoAnterior}"> <i class="fas fa-chevron-left"></i> <div class="conteudo-botao-navegacao"> <div class="rotulo-botao-navegacao">Anterior</div> <div class="titulo-botao-navegacao">${dadosAnterior.titulo}</div> </div> </div> `;
  } else {
    htmlNavegacao += "<div></div>";
  }
  if (proximaSecao) {
    const dadosProxima = dadosRegras[proximaSecao];
    htmlNavegacao += ` <div class="botao-navegacao proximo" data-section="${proximaSecao}"> <div class="conteudo-botao-navegacao"> <div class="rotulo-botao-navegacao">Próximo</div> <div class="titulo-botao-navegacao">${dadosProxima.titulo}</div> </div> <i class="fas fa-chevron-right"></i> </div> `;
  } else {
    htmlNavegacao += "<div></div>";
  }
  htmlNavegacao += "</div>";
  return htmlNavegacao;
}

function carregarSecao(idSecao) {
  secaoAtual = idSecao;
  const secao = dadosRegras[idSecao];
  if (!secao) {
    corpoConteudo.innerHTML = "<p>Seção não encontrada.</p>";
    return;
  }
  const botoesNavegacao = criarBotoesNavegacao(idSecao);
  corpoConteudo.innerHTML = ` <div class="secao-conteudo"> <h1><i class="${secao.icone}"></i> ${secao.titulo}</h1> ${secao.conteudo} ${botoesNavegacao} </div> `;
  corpoConteudo.querySelectorAll(".botao-navegacao").forEach((botao) => {
    botao.addEventListener("click", (e) => {
      const secaoDestino = e.currentTarget.dataset.section;
      if (secaoDestino) {
        carregarSecao(secaoDestino);
        definirItemNavegacaoAtivoPorId(secaoDestino);
        document.querySelector(".area-conteudo").scrollTop = 0;
      }
    });
  });
  if (idSecao === "orientacoes-gerais") {
    iniciarContagemRegressiva();
  } else {
    clearInterval(temporizadorContagem);
  }
  if (secao.indiceConteudo) {
    mostrarIndiceConteudo(secao.indiceConteudo);
  } else {
    ocultarBarraLateralDireita();
  }
  document.querySelector(".area-conteudo").scrollTop = 0;
}

function mostrarIndiceConteudo(indiceConteudo) {
  barraLateralDireita.classList.remove("oculto");
  let html = '<div class="cabecalho-indice">ÍNDICE</div>';
  indiceConteudo.forEach((item) => {
    html += `<a href="#${item.id}" class="item-indice" data-target="${item.id}">${item.titulo}</a>`;
  });
  barraLateralDireita.innerHTML = html;
  barraLateralDireita.querySelectorAll(".item-indice").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const idDestino = e.target.dataset.target;
      const elementoDestino = document.getElementById(idDestino);
      if (elementoDestino) {
        elementoDestino.scrollIntoView({ behavior: "smooth", block: "start" });
        definirItemIndiceAtivo(e.target);
      }
    });
  });
  setTimeout(() => {
    atualizarIndiceAtivoConteudo();
  }, 100);
}

function ocultarBarraLateralDireita() {
  barraLateralDireita.classList.add("oculto");
}

function atualizarIndiceAtivoConteudo() {
  if (barraLateralDireita.classList.contains("oculto")) return;
  const itensIndice = barraLateralDireita.querySelectorAll(".item-indice");
  const subsecoes = document.querySelectorAll(".subsecao");
  let secaoAtiva = null;
  const posicaoRolagem = window.scrollY + 150;
  subsecoes.forEach((secao) => {
    const topoSecao = secao.offsetTop;
    const fundoSecao = topoSecao + secao.offsetHeight;
    if (posicaoRolagem >= topoSecao && posicaoRolagem < fundoSecao) {
      secaoAtiva = secao.id;
    }
  });
  itensIndice.forEach((item) => {
    item.classList.remove("ativo");
    if (item.dataset.target === secaoAtiva) {
      item.classList.add("ativo");
    }
  });
}

function definirItemIndiceAtivo(itemAtivo) {
  barraLateralDireita.querySelectorAll(".item-indice").forEach((item) => {
    item.classList.remove("ativo");
  });
  itemAtivo.classList.add("ativo");
}
function definirItemNavegacaoAtivo(itemAtivo) {
  itensNavegacao.forEach((item) => item.classList.remove("ativo"));
  itemAtivo.classList.add("ativo");
}
function definirItemNavegacaoAtivoPorId(idSecao) {
  itensNavegacao.forEach((item) => {
    item.classList.remove("ativo");
    if (item.dataset.section === idSecao) {
      item.classList.add("ativo");
    }
  });
}

function manipularBusca(e) {
  const consulta = e.target.value.trim().toLowerCase();
  if (consulta.length === 0) {
    fecharModalBusca();
    return;
  }
  if (consulta.length < 2) {
    return;
  }
  resultadosBusca = [];
  Object.entries(dadosRegras).forEach(([idSecao, secao]) => {
    const conteudo = secao.conteudo.toLowerCase();
    const titulo = secao.titulo.toLowerCase();
    if (titulo.includes(consulta) || conteudo.includes(consulta)) {
      const textoConteudo = secao.conteudo.replace(/<[^>]*>/g, "");
      const indiceConsulta = textoConteudo.toLowerCase().indexOf(consulta);
      let trecho = "";
      if (indiceConsulta !== -1) {
        const inicio = Math.max(0, indiceConsulta - 50);
        const fim = Math.min(textoConteudo.length, indiceConsulta + 150);
        trecho = textoConteudo.substring(inicio, fim);
        if (inicio > 0) trecho = "..." + trecho;
        if (fim < textoConteudo.length) trecho = trecho + "...";
        const regex = new RegExp(`(${consulta})`, "gi");
        trecho = trecho.replace(regex, "<mark>$1</mark>");
      } else {
        trecho = textoConteudo.substring(0, 150) + "...";
      }
      resultadosBusca.push({
        idSecao,
        titulo: secao.titulo,
        trecho,
        relevancia: titulo.includes(consulta) ? 2 : 1,
      });
    }
  });
  resultadosBusca.sort((a, b) => b.relevancia - a.relevancia);
  mostrarResultadosBusca();
}

function mostrarResultadosBusca() {
  if (resultadosBusca.length === 0) {
    containerResultadosBusca.innerHTML = ` <div class="sem-resultados"> <h3>0 resultados encontrados</h3> <p>Tente usar termos diferentes ou verifique a ortografia.</p> </div> `;
  } else {
    let html = `<h3 style="margin-bottom: 1rem; color: var(--cor-texto-primario);"> ${resultadosBusca.length} resultado(s) encontrado(s)</h3>`;
    resultadosBusca.forEach((resultado) => {
      html += ` <div class="item-resultado-busca" data-section="${resultado.idSecao}"> <div class="titulo-resultado-busca">${resultado.titulo}</div> <div class="conteudo-resultado-busca">${resultado.trecho}</div> </div> `;
    });
    containerResultadosBusca.innerHTML = html;
    containerResultadosBusca
      .querySelectorAll(".item-resultado-busca")
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          const idSecao = e.currentTarget.dataset.section;
          carregarSecao(idSecao);
          definirItemNavegacaoAtivoPorId(idSecao);
          fecharModalBusca();
        });
      });
  }
  modalBusca.classList.add("ativo");
}

function fecharModalBusca() {
  modalBusca.classList.remove("ativo");
  campoBusca.value = "";
}

function alternarTema() {
  temaAtual = temaAtual === "dark" ? "light" : "dark";
  aplicarTema();
  salvarTema();
}
function aplicarTema() {
  document.documentElement.setAttribute("data-theme", temaAtual);
  const icone = alternadorTema.querySelector("i");
  icone.className = temaAtual === "dark" ? "fas fa-moon" : "fas fa-sun";
}
function salvarTema() {
  localStorage.setItem("tema", temaAtual);
}

document.addEventListener("DOMContentLoaded", inicializar);
