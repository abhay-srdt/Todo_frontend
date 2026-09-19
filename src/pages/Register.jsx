import { useState } from "react"
import { registerUser } from "../services/userService"
import { useNavigate } from "react-router-dom"
function Register() {
   const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError("")
    setSuccess("")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters")
      return
    }

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    try {
      await registerUser(formData)

      setSuccess("Registration successful. Please login.")
         setTimeout(() => {
           navigate("/login")
         }, 1500)

      setFormData({
        name: "",
        email: "",
        password: "",
      })
    } catch(err) {
      setError(err.message || "Registration failed")
    }
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">
        Register
      </h2>

      {error && (
        <p className="mb-4 text-red-600">{error}</p>
      )}

      {success && (
        <p className="mb-4 text-green-600">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

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
          className="w-full rounded bg-green-600 p-2 text-white"
        >
          Register
        </button>
      </form>

      <button
        type="button"
        onClick={() => navigate("/login")}
        className="mt-4 text-blue-600"
      >
        Already have an account? Login
      </button>
    </div>
  )
}

export default Register