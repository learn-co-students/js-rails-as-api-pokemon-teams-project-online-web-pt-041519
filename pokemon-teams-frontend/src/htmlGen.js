

const pokemonHTML = (json) => {
    const { nickname, species, id } = json
    return (`
    <li>${nickname} (${species}) <button class="release" data-pokemon-id="${id}">Release</button></li>
    `)
}

const trainerCard = (json) => {
    const {id, name, pokemons} = json
    return (`
    <div class="card" data-id="${id}"><p>${name}</p>
    <button data-trainer-id="${id}">Add Pokemon</button>
    <ul>
      ${pokemons.map( p => pokemonHTML(p)).join('')}
    </ul>
  </div>
    `)
}