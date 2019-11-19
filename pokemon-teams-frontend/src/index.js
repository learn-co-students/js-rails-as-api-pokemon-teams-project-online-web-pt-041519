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

        addButton.addEventListener("click", createNewPokemon)

        let ul = document.createElement("ul")
            for (let n = 0; n < object[i].pokemons.length; n++) {
                let li = document.createElement("li")
                li.textContent = `${object[i].pokemons[n].nickname} (${object[i].pokemons[n].species})`
                let button = document.createElement("button")
                button.className = "release"
                button.textContent = "Release"
                button.setAttribute('data-pokemon-id', object[i].pokemons[n].id)
                li.appendChild(button)
                newDiv.appendChild(li)
            }
        newDiv.appendChild(ul)
        let main = document.getElementsByTagName("main")[0]
        main.appendChild(newDiv)
    }
}

function createNewPokemon() {
    let form = document.getElementsByTagName("form")[0]
    form.submit()

    let pokemonData = {
        trainer_id: "1"
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
    .then(object => console.log(object))
}
