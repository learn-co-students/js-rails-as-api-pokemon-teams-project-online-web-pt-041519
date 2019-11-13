const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(e) {
    const mainContent = document.querySelector('main');

    function createPokemonListNode(pokemon) {
        const pokemonLi = document.createElement('li');
        const deletePokemonBtn = document.createElement('button');

        deletePokemonBtn.className = "release";
        deletePokemonBtn.dataset.pokemonId = pokemon.id;
        deletePokemonBtn.innerText = "Release";
        deletePokemonBtn.addEventListener("click", deletePokemon);

        pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
        pokemonLi.appendChild(deletePokemonBtn);

        return pokemonLi;
    }

    function createTrainerCard(trainer) {
        const trainerCard = document.createElement('div');
        const trainerName = document.createElement('p');
        const addPokemonBtn = document.createElement('button');
        const teamList = document.createElement('ul');
        
        trainerCard.className = "card";
        trainerCard.dataset.id = trainer.id;
        trainerName.innerText = trainer.name;
        addPokemonBtn.dataset.trainerId = trainer.id;
        addPokemonBtn.innerText = "Add Pokemon";
        addPokemonBtn.addEventListener("click", addPokemon);

        trainerCard.appendChild(trainerName);
        trainerCard.appendChild(addPokemonBtn);
        trainerCard.appendChild(teamList);

        for (ea of trainer.pokemons) {
            teamList.appendChild(createPokemonListNode(ea));
        }

        if (teamList.childElementCount == 6) {
            addPokemonBtn.className = "add_button_hidden";
        }

        return trainerCard;
    }


    function addPokemon() {

        let trainerId = this.dataset.trainerId

        let configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({trainer_id: trainerId})
        };

        async function addNewPokemon() {
            const targetBtn = document.querySelector(`button[data-trainer-id="${trainerId}"]`);
            const pokeList = targetBtn.parentElement.querySelector('ul');

            let resp = await fetch(POKEMONS_URL, configObj);
            let newPoke = await resp.json();

            pokeList.appendChild(createPokemonListNode(newPoke));

            if (pokeList.childElementCount == 6) {
                targetBtn.className = "add_button_hidden";
            }
        }

        addNewPokemon();
    }


    function deletePokemon() {
        // console.log(this.dataset.pokemonId);
        fetch(`${POKEMONS_URL}/${this.dataset.pokemonId}`, {
            method: 'delete'
          })
          .then(response => response.json())
          .then(function(data) {
              let pokeToRemove = document.querySelector(`button[data-pokemon-id="${data.id}"]`).parentElement
              let pokeList = pokeToRemove.parentElement
              let targetBtn = pokeList.parentElement.querySelector('button')
              pokeToRemove.remove()

              if (pokeList.childElementCount < 6) {
                  targetBtn.removeAttribute("class");
                }
          });
        
    }


    async function getAllTrainers() {
        let response = await fetch(TRAINERS_URL);
        let data = await response.json();

        for(trainer of data) {
            mainContent.appendChild(createTrainerCard(trainer));
        }
    }

    getAllTrainers();


})



// GET ALL TRAINERS WITH .then
// function thenGetAllTrainers() {
//     fetch(TRAINERS_URL)
//         .then(resp => resp.json())
//         .then(obj => {
//             for(trainer of obj) {
//                 mainContent.appendChild(createTrainerCard(trainer));
//             }
//         }
//     );
// }

// thenGetAllTrainers();