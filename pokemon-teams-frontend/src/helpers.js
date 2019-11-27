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