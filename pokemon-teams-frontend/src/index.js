const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const cardCollection = document.querySelector("main")


const buildCard = (arg) => {

  let div = document.createElement('div')
  div.className = 'card'

  let btn = document.createElement('button')
  btn.setAttribute('data-trainer-id', arg.attributes.id)
  btn.innerText = 'Add Pokemon'
  btn.addEventListener("click",(event) => {
    addPokemon(event)
  })

  let p = document.createElement('p')
  p.innerText = arg.attributes.name

  let ul = document.createElement('ul')

  arg.attributes.pokemons.forEach(pokemon => {ul.append(listPokemon(pokemon))})

  div.append(p, btn, ul)
  cardCollection.appendChild(div)

}


const listPokemon = (pokemon) => {
  
  let li = document.createElement('li')
  li.innerHTML = `${pokemon.nickname} (${pokemon.species})`

  let bt = document.createElement('button')
  bt.setAttribute('data-pokemon-id', pokemon.id)
  bt.addEventListener("click", (event) => {
 
    deletePokemon(event)
    li.innerHTML = ""
  })
  bt.innerText = 'Release'
  bt.className = "release"

  li.appendChild(bt)

  return li
}

async function addPokemon(event){
  let ul = event.target.parentNode.querySelector('ul')
  let trainerId = event.target.getAttribute("data-trainer-id")
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({trainer_id: trainerId})
  }
  let response = await fetch(POKEMONS_URL, configObj)
  let newPokemon = await response.json()
  ul.append(listPokemon(newPokemon))
}

async function deletePokemon(pokemon){
  let configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  let response = await fetch(POKEMONS_URL+'/'+pokemon.target.getAttribute('data-pokemon-id'), configObj)
  let obj = await response.json()
  obj.delete

}

async function getTrainers() {
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
  getTrainers()
})