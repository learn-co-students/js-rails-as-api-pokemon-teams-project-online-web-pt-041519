const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetch(TRAINERS_URL)
.then(response => response.json())
.then(object => createCards(object))

function createCards(object) {

    let newForm = document.createElement("form")
        newForm.action = POKEMONS_URL
        newForm.method = "post"
        newForm.style.display = 'hidden'
        document.body.appendChild(newForm)

    for (let i = 0; i < object.length; i++) {

        let newDiv = document.createElement("div")
        newDiv.className = "card"
        newDiv.setAttribute('data-id', object[i].id)

        let addButton = document.createElement("button")
        addButton.setAttribute('data-trainer-id', object[i].id)
        addButton.textContent = "Add Pokemon"

        let p = document.createElement("p")
        p.textContent = object[i].name

        newDiv.appendChild(p)
        newDiv.appendChild(addButton)

        let ul = document.createElement("ul")
        ul.setAttribute('ul-trainer-id', object[i].id)
            for (let n = 0; n < object[i].pokemons.length; n++) {
                let li = document.createElement("li")
                li.textContent = `${object[i].pokemons[n].nickname} (${object[i].pokemons[n].species})`
                li.setAttribute('li-pokemon-id', object[i].pokemons[n].id)
                let button = document.createElement("button")
                button.className = "release"
                button.textContent = "Release"
                button.setAttribute('data-pokemon-id', object[i].pokemons[n].id)

                button.addEventListener("click", function(event){
                    event.preventDefault
                    releasePokemon(button.attributes[1].value)
                })

                li.appendChild(button)
                ul.appendChild(li)
            }
        
            addButton.addEventListener("click", function(){
                if (document.querySelectorAll(`[ul-trainer-id="${object[i].id}"] li`).length < 6) {
                    createNewPokemon(object[i].id)
                }
            })


        newDiv.appendChild(ul)
        let main = document.getElementsByTagName("main")[0]
        main.appendChild(newDiv)
    }
}

function createNewPokemon(id) {
    let form = document.getElementsByTagName("form")[0]
    form.addEventListener('submit', function(event) {
        event.preventDefault()
    })

    let pokemonData = {
        trainer_id: id
    }

    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(pokemonData)
    }

    fetch(POKEMONS_URL, configObject)
    .then(res => res.json())
    .then(object => addNewPokemon(object))
}

function addNewPokemon(object){
    let ul = document.querySelector(`[ul-trainer-id = '${object.trainer_id}']`)
    let li = document.createElement("li")
    li.textContent = `${object.nickname} (${object.species})`
    let releaseButton = document.createElement("button")
    releaseButton.className = "release"
    releaseButton.textContent = "Release"
    releaseButton.setAttribute('data-pokemon-id', object.id)
    li.appendChild(releaseButton)
    ul.appendChild(li)
}


function releasePokemon(id) {

    let pokemonData = {
        pokemon_id: id
    }

    let configObject = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(pokemonData)
    }

    fetch(`http://localhost:3000/pokemons/${id}`, configObject)
    .then(res => res.json())
    .then(object => deletePokemon(object))
}

function deletePokemon(object) {
    let element = document.querySelectorAll(`[li-pokemon-id="${object.id}"]`)[0]
    element.parentNode.removeChild(element)
}