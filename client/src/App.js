import { Header } from "components/Header"
import { MobileNav } from "components/MobileNav"
import { NotFound } from "components/NotFound"
import { Route, Routes } from "react-router-dom"
import { Login } from "./features/users/Login"
import { SignUp } from "./features/users/SignUp"
import { HomePage } from "./pages/HomePage"

function App() {
  return (
    <div className="">
      <Header />
      <div className="mt-20 mb-14">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <MobileNav />
    </div>
  )
}

export default App
