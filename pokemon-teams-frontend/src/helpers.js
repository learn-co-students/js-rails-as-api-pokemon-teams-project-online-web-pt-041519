const getParentDiv = (el) => {
    let currEl = el
    while(currEl.tagName !== 'DIV'){
        if(currEl.tagName === "MAIN"){
            return null
        }
        currEl = currEl.parentElement
       
    }
    return currEl
}

const getTrainerCard = (trainerId) => {
    const cards = Array.from(document.querySelectorAll('.card'))
    return cards.find(el => el.dataset.id == trainerId)
}

const getLastPokemonAdded = tid => {
    const card = getTrainerCard(tid)
    const lis = Array.from(card.querySelectorAll('li'))
    const lastLi = lis[lis.length - 1]
    return lastLi
}