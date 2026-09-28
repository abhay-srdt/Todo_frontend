import { useState } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Todos from "./pages/Todos"
import { Routes, Route, Navigate } from "react-router-dom"
import ViewTodo from "./pages/ViewTodo"
import Callback from "./pages/Callback"

function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user")
      const savedAuth = localStorage.getItem("auth")
      return savedUser && savedAuth ? JSON.parse(savedUser) : null
    } catch (e) {
      console.error("Failed to parse saved user, clearing it:", e)
      localStorage.removeItem("user")
      localStorage.removeItem("auth")
      return null
    }
  })

  function logout() {
  localStorage.removeItem("user")
  localStorage.removeItem("auth")
  setUser(null)
  window.location.href = "http://localhost:9000/logout"
}
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/viewTodo" element={<ViewTodo />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/todos"
        element={
          user ? <Todos user={user} onLogout={logout} /> : <Navigate to="/login" />
        }
      />
      <Route path="/callback" element={<Callback onLogin={setUser} />} />
      <Route
        path="*"
        element={<Navigate to={user ? "/todos" : "/login"} />}
      />
    </Routes>
  )
}

export default App