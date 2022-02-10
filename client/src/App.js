import { Header } from "components/Header"
import { Route, Routes } from "react-router-dom"
import { Login } from "./features/users/Login"
import { SignUp } from "./features/users/SignUp"
import { HomePage } from "./pages/HomePage"

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
