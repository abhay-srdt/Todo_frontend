import { useState } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Todos from "./pages/Todos"
import { Routes, Route, Navigate } from "react-router-dom"
import ViewTodo from "./pages/ViewTodo"
function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user")
      return savedUser ? JSON.parse(savedUser) : null
    } catch (e) {
      console.error("Failed to parse saved user, clearing it:", e)
      localStorage.removeItem("user")
      return null
    }
  })

  function logout() {
    localStorage.removeItem("user")
    setUser(null)
  }


  return (
  <Routes>
    <Route
      path="/login"
      element={
        <Login onLogin={setUser} />
      }
    />
    <Route
      path="/viewTodo"
      element={
        <ViewTodo />
      }
    />

    <Route
      path="/register"
      element={
        <Register />
      }
    />

    <Route
      path="/todos"
      element={
        user ? (
          <Todos
            user={user}
            onLogout={logout}
          />
        ) : (
          <Navigate to="/login" />
        )
      }
    />

    <Route
      path="*"
      element={
        <Navigate
          to={user ? "/todos" : "/login"}
        />
      }
    />
  </Routes>
)
}

export default App