


const removePokemonAPI = async (id) => {

    const opts = {
        method: 'DELETE',
        headers: {
            'Application-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    const res = await fetch(`${BASE_URL}/pokemon/${id}`, opts)
    checkRes(res)
    const json = await res.json()
    return json


}


const checkRes = res => {
    if(res.status < 200 || res.status > 299){
        throw new Error(res.status)
    }
}