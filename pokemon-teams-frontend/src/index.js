const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

// set variable for the main container
const mainContainer = document.querySelector('main');

// after the page loads, we do this
document.addEventListener("DOMContentLoaded", (e) => {
   fetchTrainers().then(trainers => {
        trainers.forEach(trainer => {
            renderTrainers(trainer);
        });
    })
});

// fetches and returns the json of all the trainers with their pokemans
async function fetchTrainers(){
    try {
        const res = await fetch(TRAINERS_URL);
        const trainerJson = await res.json();
        return trainerJson;
    } catch (error) {
        mainContainer.innerHTML = `<h1>${error.message} <br> Run the server!</h1> `
    };
};

// builds the card for the individual trainer
function renderTrainers(trainer){
    const pokeContainer = document.createElement('div');
    pokeContainer.className = "card";
    pokeContainer.setAttribute("data-id", `${trainer.id}`); 
    pokeContainer.innerHTML = `<p>${trainer.name}</p><button data-trainer-id="${trainer.id}">Add Pokemon</button><ul></ul>`;
    let pokeList = pokeContainer.querySelector("ul");
    // Iterate over each pokemon and render them on the card
    trainer.pokemons.forEach(pokemon => {
        const pokeLi = renderPokemon(pokemon);
        pokeList.appendChild(pokeLi);
    });
    // Give button joining feature
    const addBtn = pokeContainer.querySelector("button");
    addBtn.addEventListener("click", (e) => {
        addPokemon(e).then(p => {
            const pokeLi = renderPokemon(p);
            let pokeName = pokeLi.innerText.split(' ')[0];
            alert(`${pokeName} has joined your team`);
            pokeList.appendChild(pokeLi);
        });
    });
    // Append to main to build each trainer card
    mainContainer.appendChild(pokeContainer);
};

// Add pokemons to trainer container
function renderPokemon(pokemon){
    const pokeLi = document.createElement("li");
    pokeLi.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`;
    // Give button delete feature
    const deleteBtn = pokeLi.querySelector("button");
    deleteBtn.addEventListener("click", (e) => {
        bootFromTeam(e);
    });
    return pokeLi;
};

// Remove pokemon from team
async function bootFromTeam(event){
    const pokeId = event.target.getAttribute("data-pokemon-id");
    const pokeName = event.target.parentNode.innerText.split(' ')[0];
    try {
        fetch(POKEMONS_URL + '/' + pokeId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(pokeId)
        });
        alert(`${pokeName} is sent to the daycare.`);
        event.target.parentNode.remove();
    } catch (error) {
        event.target.parentNode.parentNode.innerHTML = "<h1>Something went wrong. The Pokemon is too clingy to leave.</h1>";
    };

};

// post request to add a new pokemon
async function addPokemon(event){
    const trainerId = event.target.getAttribute("data-trainer-id");
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: trainerId})
    };
    try {
        let response = await fetch(POKEMONS_URL, configObj);
        let pokeJson = await response.json();
        return pokeJson;
    } catch (error) {
        event.parentNode.innerHTML =`<h2>Run the server you ding dong.</h2> ${error.message}`;
    };
};
