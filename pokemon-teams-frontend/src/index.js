const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName("main")[0]

function getAllTeams()
{
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => displayAllTeams(trainers))
    .catch(error => console.log(error))
}

function displayAllTeams(trainers)
{
    trainers.forEach(trainer => {
        const trainerPokemonsHTML = makeTrainerPokemonsHTML(trainer)
        const trainerCard = makeTrainerCard(trainer)
        main.appendChild(trainerCard)

        function makeTrainerCard(aTrainer)
        {
            const newTrainerCard = document.createElement("div")
            newTrainerCard.className = "card"
            newTrainerCard.setAttribute("data-id", aTrainer.id)
            newTrainerCard.innerHTML = `<p>${aTrainer.name}</p>`

            const addPokemonBtn = document.createElement("button")
            addPokemonBtn.setAttribute("data-trainer-id", aTrainer.id)
            addPokemonBtn.textContent = "Add Pokemon"
            addPokemonBtn.addEventListener("click", addPokemonToTrainer)

            newTrainerCard.appendChild(addPokemonBtn)
            newTrainerCard.appendChild(trainerPokemonsHTML)
            return newTrainerCard
        }
    })
}

function makeTrainerPokemonsHTML(trainer)
{
    const pokemones = trainer.pokemons
    const pokemonUl = document.createElement("ul")
    pokemones.forEach(pokemon => {
        const aPokemon = makeAPokemon(pokemon)
        pokemonUl.appendChild(aPokemon)
    })
    return pokemonUl
}

function makeAPokemon(pokemon)
{
    const aPokemonLi = document.createElement("li")
    aPokemonLi.innerHTML = `${pokemon.species} (${pokemon.nickname})`

    const releasePokemonBtn = document.createElement("button")
    releasePokemonBtn.className = "release"
    releasePokemonBtn.setAttribute = ("data-pokemon-id", pokemon.id)
    releasePokemonBtn.textContent = "Release"
    releasePokemonBtn.addEventListener("click", releasePokemonFromTrainer)

    aPokemonLi.appendChild(releasePokemonBtn)
    return aPokemonLi
}

function addPokemonToTrainer(event)
{
    const trainerCard = this.parentElement
    const trainerId = trainerCard.getAttribute("data-id")
    const trainerPokemonsUl = trainerCard.getElementsByTagName("ul")[0]

    const postOptionsObj = 
    {
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/json'
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: trainerId
        })
    }

    fetch(POKEMONS_URL, postOptionsObj)
    .then(resp => resp.json())
    .then(newPoke => {
        newPokemonAddedActions(newPoke)
    })
    .catch(error => console.log(error))

    function newPokemonAddedActions(newPokeObj)
    {
        const newTrainerPokemon = makeAPokemon(newPokeObj)
        trainerPokemonsUl.appendChild(newTrainerPokemon)
    }
}

function releasePokemonFromTrainer(event)
{
    const trainerCard = this.parentElement.parentElement.parentElement
    const trainerId = trainerCard.getAttribute('data-id')
    const pokemonLi = this.parentElement
    const pokemonId = this.getAttribute('data-pokemon-id')

    const deleteOptionsObj = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({pokemon: {
            trainer_id: trainerId
        }})
    }

    fetch (POKEMONS_URL + `/${pokemonId}`, deleteOptionsObj)
    .then(resp => resp.json())
    .then(deletedPokemon => {
        deletePokemonAction()
    })
    .catch(e => console.log(e))

    function deletePokemonAction()
    {
        pokemonLi.remove()
        console.log("Pokemon was released successfully")
    }
}

document.addEventListener("DOMContentLoaded", function(){
    getAllTeams()
})
