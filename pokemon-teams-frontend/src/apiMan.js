const modify_ownership_opts = {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

const patchURL = (tid, pid) => {
    return `${BASE_URL}/trainers/${tid}/pokemon/${pid}`
}

const removePokemonAPI = async (tid, pid) => {

    const opts = { ...modify_ownership_opts, body: JSON.stringify({act: 'remove'}) }
    return await performPatch(patchURL(tid, pid), opts)
}

const addPokemonAPI = async (tid, pid) => {
    const opts = { ...modify_ownership_opts, body: JSON.stringify({act: 'add'}) }
    return await performPatch(patchURL(tid, pid), opts)
}

const getRandomPokemon = async () => {
    const res = await fetch(`${BASE_URL}/pokemon/rand`)
    checkRes(res)
    return await res.json()
}


const performPatch = async (url, opts) => {
    const res = await fetch(url, opts)
    checkRes(res)
    const json = await res.json()
    return json
}

const checkRes = res => {
    if(res.status < 200 || res.status > 299){
        throw new Error(res.status)
    }
}