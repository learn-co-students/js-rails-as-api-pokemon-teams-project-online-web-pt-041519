const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


// 1. When a user loads the page, they should see all trainers, with their current team of Pokemon.
document.addEventListener('DOMContentLoaded', function() {
   alert('DOM Content Loaded!')

   fetchTeams().then(teams => {
      teams.forEach(trainer => {
         createCard(trainer)
      })
   })
})

// Return JSON object with trainer data

function fetchTeams() {
   return fetch(`${BASE_URL}/trainers`)
      .then(function(response) {
      return response.json()
   })
}

// Function to insert info into cards for individual trainers 

function createCard(trainer) {
   let main = document.querySelector('main')
   let trainerDiv = document.createElement('div')
   trainerDiv.className = 'card'
   trainerDiv.setAttribute('data-id', trainer.id)

   // display trainer's name on card
   let name = document.createElement('p')
   name.innerText = trainer.name

   // create add pokemon button
   let button = document.createElement('button')
   button.setAttribute('data-id', trainer.id)
   button.innerText = 'Add Pokemon'


   // Display trainer's pokemon
   let ul = document.createElement('ul')
   trainer.pokemons.forEach(pokemon => {
      ul.append(displayPokemon(pokemon))
   })


   // append the card information to the card
   trainerDiv.append(name, button, ul)
   
   // append the div to main
   main.appendChild(trainerDiv)
}

// li for each pokemon
function displayPokemon(pokemon) {
   let li = document.createElement('li')
   li.innerText = `${pokemon.nickname} (${pokemon.species})`


   // create release pokemon button
   let releaseButton = document.createElement('button')
   releaseButton.className = 'release'
   releaseButton.setAttribute('data-pokemon-id', pokemon.id)
   releaseButton.innerText = 'Release'
   releaseButton.addEventListener('click', function(event) {
      deletePokemon(event)
   })

   // add release button to the li
   li.append(releaseButton)
   return li
}

// delete a pokemon
function deletePokemon(data) {
   let configObj = {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
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