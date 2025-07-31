const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        aplicarFiltro() // aplica o filtro nos novos itens carregados
    })
}

loadPokemonItens(offset, limit)

loadMoreButton?.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

/* --- FILTRO POR NOME E TIPO --- */
const searchInput = document.querySelector('.search-input')
const typeFilter = document.querySelector('.type-filter')

function aplicarFiltro() {
    const nomeFiltro = searchInput.value.toLowerCase()
    const tipoFiltro = typeFilter.value.toLowerCase()
    const pokemons = document.querySelectorAll('.pokemon')

    pokemons.forEach(pokemon => {
        const nome = pokemon.querySelector('.name').textContent.toLowerCase()
        const tipos = Array.from(pokemon.querySelectorAll('.type')).map(el => el.textContent.toLowerCase())

        const combinaNome = nome.includes(nomeFiltro)
        const combinaTipo = tipoFiltro === '' || tipos.includes(tipoFiltro)

        if (combinaNome && combinaTipo) {
            pokemon.style.display = 'flex'
        } else {
            pokemon.style.display = 'none'
        }
    })
}

searchInput.addEventListener('input', aplicarFiltro)
typeFilter.addEventListener('change', aplicarFiltro)
