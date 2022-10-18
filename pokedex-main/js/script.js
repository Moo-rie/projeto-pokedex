const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokeGif = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')
const shiny = document.querySelector('.shiny')

let searchPokemon = 1


const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon)

        if(data) {
            pokeGif.style.display = 'block'
            pokemonName.innerHTML = data.name
            pokemonNumber.innerHTML = data.id
            if(shiny.checked){
                pokeGif.src = data['sprites']['versions'] ['generation-v']['black-white']['animated']['front_shiny']
                input.value = ''
                searchPokemon = data.id
            }else{
                pokeGif.src = data['sprites']['versions'] ['generation-v']['black-white']['animated']['front_default']
                input.value = ''
                searchPokemon = data.id
            }
        } else {
            pokeGif.style.display = 'none'
            pokemonName.innerHTML = 'Não Encontrado D:'
            pokemonNumber.innerHTML = ''
        }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
})

prev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon--
        renderPokemon(searchPokemon) 
    }
})

next.addEventListener('click', () => {
    if(searchPokemon < 649){
        searchPokemon++
        renderPokemon(searchPokemon) 
    }
})

shiny.addEventListener('click', () => {
    renderPokemon(searchPokemon) 
})

renderPokemon(searchPokemon); 