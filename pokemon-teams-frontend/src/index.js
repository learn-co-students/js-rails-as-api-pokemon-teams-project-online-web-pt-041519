const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const container = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {

    // Fetch teams, then render cards with current teams
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(trainers => renderCards(trainers))
    
    function renderCards(trainers) {
        trainers.forEach(trainer => {
            // Create card div for each trainer
            const div = document.createElement('div') // let??????
            div.className = 'card'
            div.setAttribute('data-id', trainer.id)
            // Add trainer's name
            const name = document.createElement('p')
            name.innerText = trainer.name
            // Add 'add pokemon' button
            const btn = documet.createElement('button')
            btn.setAttribute('data-trainer-id', trainer.id)
            btn.innerText = 'Add Pokemon'
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                addPokemon(e)
            })
            // Create card ul with current pokemon
            const ul = document.createElement('ul') // let??????
            trainer.pokemons.forEach(poke => ul.append(renderPokemon(poke)))
            // Append card data to card div
            div.append(name, btn, ul)
            // Append card div to the main container 
            container.appendChild(div)
        })
    }

    function addPokemon(poke) {
        // Grab ul for the target card
        const ul = poke.target.parentNode.querySelector('ul') // let?????
        // Set up options for fetch post request
        const method = 'POST'
        const headers = {
            'Content-Type': 'applicaton/json'
        }
        const data = {
            trainer_id: poke.target.getAttribute('data-trainer-id')
        }
        // Turn data into JSON str for fetch
        const body = JSON.stringify(data) 
        // Finish setting up options for fetch
        const opt =  {method, headers, body} // body: data?????
        // Fetch post request 
        fetch(POKEMONS_URL, opt)
            .then(resp => resp.json())
            .then(p => {
                // Populate li for pokemon
                const li = renderPokemon(p)
                // Append li to ul 
                ul.appendChild(li)
            })
            // Reveal error, if any occur
            .catch(error => container.innerHTML = error.message)
    }

    function renderPokemon(e) {
        // Create li for each pokemon el
        const li = document.createElement('li') // let?????
        li.innerText = `${pokemon.nickname} (${pokemon.species})`

        // Create release button
        const release = document.createElement('button')
        release.className = 'release'
        release.setAttribute('data-pokemon-id', pokemon.id)
        release.innerText = 'Release'
        release.addEventListener('click', (e) => {
            e.preventDefault()
            releasePokemon(e)
        })
        // Append release button to each li 
        li.append(release)
        return li
    }

    function releasePokemon(poke) {
        // Set up options for fetch delete request
        const method = 'DELETE'
        const headers = {
            'Content-Type': 'applicaton/json'
        }
        // Finish setting up options for fetch
        const opt =  {method, headers}
        const thisPokeUrl = `${BASE_URL}/pokemons/${poke.target.getAttribute('data-pokemon-id')}`
        // Fetch delete request 
        fetch(thisPokeUrl, opt)
            .then(resp => resp.json())
            .then(p => p.target.parentNode.remove())
            // Reveal error, if any occur
            .catch(error => container.innerHTML = error.message)
    }

})