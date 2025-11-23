let cardConteiner = document.querySelector(".card-conteiner");
// Assumindo que você tenha um campo de busca com id="campo-busca" no seu HTML
let campoBusca = document.querySelector("#campo-busca"); 
let dados = [];

async function carregarDados() {
    try {
        const resposta = await fetch("teste.json");
        dados = await resposta.json();
        renderizarCards(dados); // Renderiza todos os cards inicialmente
    } catch (error) {
        console.error("Falha ao buscar dados:", error);
    }
}

function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descrição.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardConteiner.innerHTML = "";

    if (dados.length === 0) {
        cardConteiner.innerHTML = `<p class="sem-resultados">Nenhum resultado encontrado.</p>`;
        return;
    }
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>Ano: ${dado.ano}</p>
            <p>${dado.descrição}</p>
        `;
        cardConteiner.appendChild(article);
    }
}

// Adiciona um "ouvinte" para o evento de digitação no campo de busca
campoBusca.addEventListener('input', iniciarBusca);

// Carrega os dados e exibe os filmes quando a página é carregada
carregarDados();
