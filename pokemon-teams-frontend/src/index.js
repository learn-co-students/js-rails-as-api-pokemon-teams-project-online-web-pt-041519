const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName("main")[0]

// fetch all trainers
// render all the trainers
//  -create the cards
//  -put the trainer in the card
//  -put the pokemon to each trainer
// THEN create
// THEN destroy

document.addEventListener("DOMContentLoaded", function(event){
    fetchTrainers()    
})


function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers=> renderAllTrainers(trainers))
    .catch(error => console.log(error))
}

function renderAllTrainers(trainers) {
    trainers.forEach(trainer => {
        const trainerUL = pokemonUl(trainer)
        const trainerCard = createTrainerCard(trainer)

        main.appendChild(trainerCard)

        function createTrainerCard(newTrainer) {
            const newTrainerCard = document.createElement("div")
            newTrainerCard.className = "card"
            newTrainerCard.setAttribute("data-id", newTrainer.id)
            newTrainerCard.innerHTML = `<p>${newTrainer.name}</p>`

            const pokemonBtn = document.createElement("button")
            pokemonBtn.setAttribute("data-trainer-id", newTrainer.id)
            pokemonBtn.textContent = "Add Pokemon"
            pokemonBtn.addEventListener("click", fetchPokemons)

            newTrainerCard.appendChild(pokemonBtn)
            newTrainerCard.appendChild(pokemonUl)
            return newTrainerCard
        }
    })
}

function createPokemon(pokemon) {
    const li = document.createElement("li")
    li.innerHTML = `${pokemon.species} (${pokemon.nickname})`

    const releaseBtn = document.createElement("button")
    releaseBtn.className = "release"
    releaseBtn.setAttribute= ("data-pokemon-id", pokemon.id)
    releaseBtn.textContent= (Release)
    releaseBtn.addEventListener("click", releasePokemon)

    li.appendChild(releaseBtn)
    return li
}

function pokemonUl() {
    const pokeArr = trainer.pokemons
    const ul = document.createElement("ul")
    pokeArr.forEach(pokemon => {
        const pokemonElement = createPokemon(pokemon)
        ul.appendChild(pokemonElement)
    })
    return ul
}

function fetchPokemons(event) {
    const trainerCard = this.parentElement
    const trainerId = trainerCard.getAttribute("data-id")
    const ul = trainerCard.getElementsByTagName("ul")    
 
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Accepts": 'application/json'
        },
        body: JSON.stringify({pokemon: {
            trainer_id: trainerId
        }})
    }

    fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(addPokemon => {
        PokemanAdded(addPokemon)
    })
    .catch(error => console.log(error))

    function PokemonAdded(pokemonObject) {
        const addToTrainersPokemon = createPokemon(pokemonObject)
        ul.appendChild(addToTrainersPokemon)
    }
}

function releasePokemon(e) {
    const trainerCard = this.parentElement.parentElement.parentElement
    const trainerId = trainerCard.getAttribute("data-id")
    const li = this.parentElement
    const pokemonId = this.getAttribute("data-pokemon-id")

    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify({pokemon: {
            trainer_id: trainerId}
        })
    }

    fetch(POKEMONS_URL + `/${pokemonId}`, configObj)
    .then(resp => resp.json())
    .then(deletePokemon => {
        deletePokeFn()
    })
    .catch(error => console.log(error))

    function deletePokeFn()
    {
        li.remove()
        console.log("Pokemon released!")
    }
}



    
    
        
    