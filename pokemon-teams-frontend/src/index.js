const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetch(TRAINERS_URL)
    .then((resp) => resp.json())
    .then(function(json) {
        json.forEach(trainerCard)
    })

fetch(POKEMONS_URL)
    .then((resp) => resp.json())
    .then(function(json) {
        json.data.forEach(pokeBall)
    })

function trainerCard(trainer) {
    let main = document.querySelector('main')
    let div = document.createElement('div')
    div.classList.add('card')
    div.setAttribute('data-id', trainer.id)
    let p = document.createElement('p')
    p.innerHTML = trainer.name
    let btn = document.createElement('button')
    btn.innerHTML = 'Add Pokemon'
    btn.setAttribute('data-trainer-id', trainer.id)
    let ul = document.createElement('ul')
    div.appendChild(p)
    div.appendChild(btn)
    div.appendChild(ul)
    main.appendChild(div)
    btn.addEventListener('click', function() {
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                'trainer_id': trainer.id
            })
        })
        .then((resp) => resp.json())
        .then(function(pokemon) {
            addLi(pokemon.data, div)
        });
    })
}

function pokeBall(pokemon) {
    let divs = document.querySelectorAll('div') 
    divs.forEach(function(trainer) {
        if(pokemon.attributes.trainer_id == trainer.dataset.id) {
            addLi(pokemon, trainer)
        }
    })
}

function addLi(pokemon, div) {
    console.log('inside addLi', div)
    let ul = div.querySelector('ul')
    let li = document.createElement('li')
    li.innerHTML = `${pokemon.attributes.nickname} (${pokemon.attributes.species})`
    let btn = document.createElement('button')
    btn.classList.add('release')
    btn.setAttribute('data-pokemon-id', pokemon.id)
    btn.innerHTML = "Release"
    li.appendChild(btn)
    ul.appendChild(li)
    div.appendChild(ul)
    btn.addEventListener('click', function() {
        fetch(POKEMONS_URL + '/' + pokemon.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                'id': pokemon.id
            })
        })
        .then((resp) => resp.json())
        .then(function() {
            li.removeChild(btn)
            ul.removeChild(li)
        });
    })
}