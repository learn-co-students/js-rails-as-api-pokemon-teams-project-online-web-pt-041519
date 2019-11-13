const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')


// Display all trainers with current team of Pokemon
document.addEventListener("DOMContentLoaded", function() {
  // alert("Document loaded!")
  
  // Get trainer data and display cards
  fetchTeams().then(teams => {
    teams.forEach(trainer => {
      addCard(trainer)
    })
  })
  .catch(function(error) {
    main.innerHTML = error.message
  })

});


// Return JSON object with trainer data
function fetchTeams() {
  return fetch(`${BASE_URL}/trainers`)
  .then(function(response) {
    return response.json()
  })
}

// Add card for each trainer
function addCard(trainer) {

  let cardDiv = document.createElement('div')
  cardDiv.className = "card"
  cardDiv.setAttribute('data-id', trainer.id)

  let name = document.createElement('p')
  name.innerText = trainer.name

  let btn = document.createElement('button')
  btn.setAttribute('data-trainer-id', trainer.id)
  btn.innerText = "Add Pokemon"
  btn.addEventListener('click', (event) => {
    event.preventDefault()
    addPokemon(event)
  })

  let ul = document.createElement('ul')

  // Create li for each pokemon
  trainer.pokemons.forEach(pokemon => { ul.append(displayPokemon(pokemon))})
  
  // Assemble card
  cardDiv.append(name, btn, ul)

  // Add card to collection
  main.appendChild(cardDiv)
}


// Display li for each pokemon
function displayPokemon(pokemon) {
  let li = document.createElement('li')
  li.innerText = `${pokemon.nickname} (${pokemon.species})`

  let releaseBtn = document.createElement('button')
  releaseBtn.className = "release"
  releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
  releaseBtn.innerText = "Release"
  releaseBtn.addEventListener('click', (event) => {
    event.preventDefault()
    releasePokemon(event)
  })

  li.append(releaseBtn)
  return li
}


// `Add Pokemon` button adds Pokemon to team if they have < 6 pokemon
function addPokemon(data){
  let ul = data.target.parentNode.querySelector('ul')

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "trainer_id": data.target.getAttribute('data-trainer-id')
    })
  }

  fetch(POKEMONS_URL, configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    // Build pokemon li    
    let li = displayPokemon(object)
    ul.appendChild(li)
  })  
  .catch(function(error) {
    main.innerHTML = error.message
  })  
}


// 'Release Pokemon' removes specific Pokemon from team
function releasePokemon(data) {
  // console.log(data.target.getAttribute('data-pokemon-id'))
  // console.log(data.target.parentNode)

  let configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  }

  fetch(POKEMONS_URL+'/'+data.target.getAttribute('data-pokemon-id'), configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    data.target.parentNode.remove()
  })  
  .catch(function(error) {
    main.innerHTML = error.message
  })  

}