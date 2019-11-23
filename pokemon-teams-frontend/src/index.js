const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const cardCollection = document.querySelector("main")

//buildCard creates a new card for each trainer.
const buildCard = (arg) => {
  //create the div and set the className
  let div = document.createElement('div')
  div.className = 'card'
  //create fully functioning button to add a new pokemon.
  let btn = document.createElement('button')
  btn.setAttribute('data-trainer-id', arg.attributes.id)
  btn.innerText = 'Add Pokemon'
  btn.addEventListener("click",(event) => {
    addPokemon(event)
  })
  //create the p tag and set the text inside to the trainers name.
  let p = document.createElement('p')
  p.innerText = arg.attributes.name
  //create the ul where all pokemon will be listed.
  let ul = document.createElement('ul')
  //here we iterate over the pokemons array and simultaneously append each to the newly created ul.
  //i can pass in the function because I set it to explicitly return an li.
  arg.attributes.pokemons.forEach(pokemon => {ul.append(listPokemon(pokemon))})
  //here we are adding what we just created to the div. 
  //NOTE: the order of the arguments decides the order in which they appear on screen.
  //i.e. if you want the btn to be on the top of the div you want to make btn the first argument on the argument list.
  div.append(p, btn, ul)
  //here we are adding the div we just filled out to the cardCollection which is the "main" tag in the body of our html.
  cardCollection.appendChild(div)

}

//listPokemon creates > fills > passes an li of a pokemon nickname and species.
const listPokemon = (pokemon) => {
  //create the li and set the contents to a pokemons nickname and species
  let li = document.createElement('li')
  li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
  //create the button to release/delete the individual pokemon.
  let bt = document.createElement('button')
  bt.setAttribute('data-pokemon-id', pokemon.id)
  bt.addEventListener("click", (event) => {
    //when we hear the click on this button we call the deletePokemon function and pass it the event object.
    //we then set the li contents to an empty string to remove the pokemon from the screen without refreshing. 
    deletePokemon(event)
    li.innerHTML = ""
  })
  bt.innerText = 'Release'
  bt.className = "release"
  //add the button to the li
  li.appendChild(bt)
  //explicitly return the li for use in the buildCard function. 
  return li
}

//addPokemon fetches a new pokemon and appends it as a new li via listPokemon.
async function addPokemon(event){
  //get the ul and trainer_id in question
  let ul = event.target.parentNode.querySelector('ul')
  let trainerId = event.target.getAttribute("data-trainer-id")
  //set my configObj to a variable to pass on to stringify.
  //value must be POST to trigger the create method in pokemons_controller.
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({trainer_id: trainerId})
  }
  //here we are getting the pokemon
  let response = await fetch(POKEMONS_URL, configObj)
  let newPokemon = await response.json()
  //here we are passing the new pokemon to the listPokemon funciton to create a new li.
  //since listPokemon returns an li we can pass it as the argument to the append function. 
  ul.append(listPokemon(newPokemon))
}

//deleting a pokemon
async function deletePokemon(pokemon){
  //set my configObj to a variable to pass on to fetch().
  //value must be DELETE to trigger the delete method in pokemons_controller. 
  let configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  //here we are getting a specific pokemon by adding its id to the url using +/+ 
  let response = await fetch(POKEMONS_URL+'/'+pokemon.target.getAttribute('data-pokemon-id'), configObj)
  let obj = await response.json()
  //here we have the individual object so it can be removed. 
  obj.delete

}

//getTrainers runs the fetch and passes the object to the buildCards function.
async function getTrainers() {
//here we try to fetch and catch any errors
  try{

    const resp = await fetch(TRAINERS_URL)
    const trainers = await resp.json()
  
    trainers.data.map(trainer => buildCard(trainer))
 
  } catch (error) {
    cardCollection.innerHTML = 'Something went wrong. Check console.log for more details.'
    console.log(error)
  }

}


document.addEventListener('DOMContentLoaded', function(){
  //Call getTrainers once DOM is loaded to kick things off.
  getTrainers()
})