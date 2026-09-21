import api from "./api"


function getErrorMessage(error){
    return error.response?.data?.message || "Something went wrong.Please try again."
}

export async function loginUser(credentials) {
    try{
        const response = await api.post("/users/login", credentials)
        return response.data
    }catch(error){
         throw new Error(getErrorMessage(error))
    }
    
}

export async function registerUser(user) {
    try{
        const response=await api.post("/users/register",user)
        return response.data
    }catch(error) {
        throw new Error(getErrorMessage(error))
    }  

}