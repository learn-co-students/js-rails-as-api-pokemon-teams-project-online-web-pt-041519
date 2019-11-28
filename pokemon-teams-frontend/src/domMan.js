
const loadTrainers = async () => {
    const res = await fetch(TRAINERS_URL)
    const json = await res.json()
    const html = json.map(t => trainerCard(t)).join('')
    const main = document.querySelector('main')
    main.innerHTML = html
}

const removePokemon = async (trainerId, pokemonId) => {

    const trainerCard = getTrainerCard(trainerId)
    const pokemonLi = Array.from(trainerCard.querySelectorAll('li')).find(el => el.children[0].dataset.pokemonId == pokemonId)
    pokemonLi.remove()
    try{
        console.log(pokemonId)
        const json = await removePokemonAPI(trainerId, pokemonId)
    }catch(err){
        const ul = trainerCard.querySelector('ul')
        ul.appendChild(pokemonLi)
        alert('ERROR OCCURRED')
    }
}

const pokePlaceholder = () => {
    const li = document.createElement('li')
    li.innerText = 'Finding new pokemon...'
    const btn = document.createElement('button')
    btn.classList.add('release')
    btn.addEventListener('click', e => e.stopImmediatePropagation())
    btn.innerText = '...'
    li.appendChild(btn)
    return li
}

const addPokemonToTrainer = async (trainerId) => {

    const trainerCard = getTrainerCard(trainerId)
    const pokeList = trainerCard.querySelector('ul')
    const initRender = pokePlaceholder()
    pokeList.appendChild(initRender)
    let optimisticEl
    try{
        const pokemon = await getRandomPokemon()
        const optimisticHTML = pokemonHTML(pokemon)
        initRender.remove()
        pokeList.innerHTML += optimisticHTML
        optimisticEl = getLastPokemonAdded(trainerId)
        await addPokemonAPI(trainerId, pokemon.id)
    }catch(err){
        // alert('ERROR')
        // console.log(optimisticEl)
        if(!!optimisticEl){
            optimisticEl.remove()
        }
    }

}

