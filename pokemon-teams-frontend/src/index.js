const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemon`
const RAND_POKEMON_URL = `${BASE_URL}/pokemon/rand`

document.addEventListener('DOMContentLoaded', () => {
    
    document.addEventListener('click', e => {
        if(e.target.tagName === 'BUTTON'){
            const div = getParentDiv(e.target)
            if(e.target.classList.contains('release')){
                const pokemonId = e.target.dataset.pokemonId
                
                const trainerId = div.dataset.id
                removePokemon(trainerId, pokemonId)
            }else{
                addPokemonToTrainer(trainerId)
            }   
        }
    })

    loadTrainers()


})


