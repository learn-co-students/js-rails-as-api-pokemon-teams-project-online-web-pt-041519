const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

// set variable for the main container
const mainContainer = document.querySelector('main');

// console.log(mainContainer)

// after the page loads, we do this
document.addEventListener("DOMContentLoaded", (e) => {
    // let trainers = fetchTrainers();
    // console.log(trainers)
    // trainers.forEach(trainer => {
    //     renderTrainers(trainer);
    // });
   fetchTrainers().then(trainers => {
        trainers.forEach(trainer => {
            // console.log(trainer);
            renderTrainers(trainer);
        });
    })
    .catch(error => mainContainer.innerHTML = error.message);
});

// fetches and returns the json of all the trainers with their pokemans
async function fetchTrainers(){
    const res = await fetch(TRAINERS_URL);
    const trainerJson = await res.json();
    // console.log(trainerJson);
    return trainerJson;
};

// builds the card for the individual trainer
function renderTrainers(trainer){
    const pokeContainer = document.createElement('div');
    pokeContainer.className = "card";
    pokeContainer.setAttribute("data-id", `${trainer.id}`); 
    pokeContainer.innerHTML = `<p>${trainer.name}</p><button data-trainer-id="${trainer.id}">Add Pokemon</button><ul></ul>`;
    let pokeList = pokeContainer.querySelector("ul");
    // renderPokemons(trainer, pokeList);
    trainer.pokemons.forEach(pokemon => {
        const pokeLi = renderPokemon(pokemon);
        pokeList.appendChild(pokeLi);
    });
    // trainer.pokemons.forEach(pokemon => {
    //     console.log(pokemon);
    //     const pokeLi = document.createElement("li");
    //     pokeLi.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
    //     pokeList.appendChild(pokeLi);
    // });


    const addBtn = pokeContainer.querySelector("button");
    addBtn.addEventListener("click", (e) => {
        addPokemon(e).then(p => {
            const pokeLi = renderPokemon(p);
            pokeList.appendChild(pokeLi);
        });
        // console.log(p)
    });

    // trainer.pokemons.forEach(pokemon => {
    //     const pokeLi = document.createElement("li");
    //     pokeLi.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`

    //     const deleteBtn = pokeLi.querySelector("button");
    //     // console.log(deleteBtn);
    //     deleteBtn.addEventListener("click", (e) => {
    //         bootFromTeam(e);
    //     });
        
    //     pokeList.appendChild(pokeLi)
    
    mainContainer.appendChild(pokeContainer);
    // });
};

// add pokemons to trainer container
function renderPokemon(pokemon){
    // trainer.pokemons.forEach(pokemon => {
        const pokeLi = document.createElement("li");
        pokeLi.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`;
        const deleteBtn = pokeLi.querySelector("button");
        // console.log(deleteBtn);
        deleteBtn.addEventListener("click", (e) => {
            bootFromTeam(e);
        });
        // list.appendChild(pokeLi);
        return pokeLi
    // });
};

// Remove pokemon from team
async function bootFromTeam(event){
    // console.log(event.target.getAttribute("data-pokemon-id"))
    const pokeId = event.target.getAttribute("data-pokemon-id");
    // console.log(POKEMONS_URL + '/' + pokeId)
    try {
        fetch(POKEMONS_URL + '/' + pokeId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(pokeId)
        });
        alert("This pokemon is sent to daycare.");
        event.target.parentNode.remove();
    } catch(error) {
        event.target.parentNode.parentNode.innerHTML = "<h1>something went wrong</h1>"
    };

};

// post request to add a new pokemon
async function addPokemon(event){
    const trainerId = event.target.getAttribute("data-trainer-id")
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: trainerId})
    };
    let response = await fetch(POKEMONS_URL, configObj);
    let pokeJson = await response.json();
    return pokeJson;
};
// let pokeFormData = {
//     id: 
//     name: 
//     species: 
//     trainer_id:
// };

function newPokemon(){
    let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(pokeFormData)
};

fetch(POKEMONS_URL, configObj)
.then(res => res.json)
.then(json)
}