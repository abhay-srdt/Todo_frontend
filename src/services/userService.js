const BASE_URL = "http://localhost:8080/api/users"


async function handleResponse(response) {
    if (!response.ok) {
        let message = "Something went wrong. Please try again."
        try {
            const errorBody = await response.json()
            if (errorBody?.message) {
                message = errorBody.message
            }
        } catch {
            // response body wasn't JSON (e.g. a raw 500 error page) - keep the fallback message
        }
        throw new Error(message)
    }
    return response.json()
}

export async function loginUser(credentials) {
    const response=await fetch(`${BASE_URL}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(credentials),
    })
    return handleResponse(response)
    
}

export async function registerUser(user) {
    const response=await fetch(`${BASE_URL}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
    })
    return handleResponse(response)
}