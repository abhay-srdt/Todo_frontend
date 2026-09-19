import { useState } from "react"
import { loginUser } from "../services/userService"
import { Link, useNavigate } from "react-router-dom"

function Login({ onLogin }) {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error,setError]=useState("");
  function handleChange(event){
    const {name,value}=event.target;
    setFormData((current)=>({
        ...current,
        [name]:value,
    }))
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setError("")
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(formData.email)){
        setError("Please enter valid email.")
        return
    }
    if(formData.password.length<8){
        setError("Password must be at least 8 characters")
        return
    }
    try{
        const user=await loginUser(formData)
        localStorage.setItem("user",JSON.stringify(user))
        onLogin(user)
        navigate("/todos")
    }catch(err){
    setError("Invalid email or password.")
  }
  } 
  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>

      {error && (
        <p className="mb-4 text-red-600">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 text-white"
        >
          Login
        </button>
      </form>
      <button
           type="button"
           onClick={() => navigate("/register")}
           className="text-blue-600"
       >
           Don't have an account? Register
         </button>
    </div>
  )
}

export default Login;