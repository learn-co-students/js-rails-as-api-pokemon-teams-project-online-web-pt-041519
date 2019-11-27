
const loadTrainers = async () => {
    const res = await fetch(TRAINERS_URL)
    const json = await res.json()
    const html = json.map(t => trainerCard(t)).join('')
    const main = document.querySelector('main')
    main.innerHTML = html
}

const removePokemon = async (trainerId, pokemonId) => {
    // console.log(`trainer id: ${trainer_id}, pokemon_id: ${pokemon_id}`)
    const cards = Array.from(document.querySelectorAll('.card'))
    const trainerCard = cards.find(el => el.dataset.id == trainerId)
    const pokemonLi = Array.from(trainerCard.querySelectorAll('li')).find(el => el.children[0].dataset.pokemonId == pokemonId)
    pokemonLi.remove()
    try{
        console.log(pokemonId)
        const json = await removePokemonAPI(pokemonId)
    }catch(err){
        const ul = trainerCard.querySelector('ul')
        ul.appendChild(pokemonLi)
        alert('ERROR OCCURRED')
    }
}