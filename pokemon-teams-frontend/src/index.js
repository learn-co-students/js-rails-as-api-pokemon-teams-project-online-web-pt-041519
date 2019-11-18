const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//on page load
document.addEventListener('DOMContentLoaded', function() {
  fetchPokemons()
})

// When a user loads the page
// 'GET' request to fetch all the toy objects
function fetchPokemons() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json))
  }

// show all trainers with team of Pokemon
function renderTrainers(json) {

  // for each trainer
  for(const trainer in json) {

    // make a div w/class=card + data-id=trainer.id
    const divCard = document.createElement('div')
    divCard.setAttribute("class", "card")
    divCard.setAttribute("data-id", `${json[trainer]["id"]}`)
    
    // p tag with the trainer's name
    const p = document.createElement('p')
    p.innerText = json[trainer]["name"]
    divCard.appendChild(p)

    // add pokemon button 
    const addPokemonButton = document.createElement('button')
    const buttonText = document.createTextNode('Add Pokemon')
    addPokemonButton.appendChild(buttonText)
    addPokemonButton.setAttribute("data-trainer-id", `${json[trainer]["id"]}`)
    addPokemonButton.addEventListener('click', event => {
      addPokemonPost(event)
    })
    divCard.appendChild(addPokemonButton)

    // list each pokemon + release button
    let ul = document.createElement('ul')   

    for (let i = 0; i < json[trainer].pokemons.length; i++) {
      let li = document.createElement('li')

      li.innerText = `${json[trainer].pokemons[i]["nickname"]} (${json[trainer].pokemons[i]["species"]})`
      
      let releaseButton = document.createElement('button')
      let buttonText = document.createTextNode('Release')
      releaseButton.appendChild(buttonText)
      releaseButton.setAttribute("class", "release")
      releaseButton.setAttribute("data-pokemon-id", `${json[trainer].pokemons[i]["id"]}`)
      releaseButton.addEventListener('click', event => {
        removePokemon(event)
      })

      li.appendChild(releaseButton)
      ul.appendChild(li)      
    }
    divCard.appendChild(ul)
    
    // add it to the main section
    const trainerCollection = document.body.querySelector("main")
    trainerCollection.appendChild(divCard)
  }
}

// add pokemon
// 'POST' request to create new pokemon objects
function addPokemonPost(event) {
  return fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      nickname: event.name, 
      species: event.species, 
      trainer_id: event.target.getAttribute("data-trainer-id")
    })
  })
}

// delete pokemon
// 'DELETE' request to destroy selected pokemon objects
function removePokemon(event) {
  return fetch(`${POKEMONS_URL}/${event.target.getAttribute("data-pokemon-id")}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      id: event.target.getAttribute("data-pokemon-id")
    })
  })
}
