import { Header } from "components/Header"
import { MobileNav } from "components/MobileNav"
import { NotFound } from "components/NotFound"
import { UserCard } from "components/ProfileCard"
import { UserList } from "components/UserList"
import { Profile } from "features/profile/Profile"
import { Route, Routes, useLocation } from "react-router-dom"
import { PrivateRoutes } from "utils/PrivateRoutes"
import { Login } from "./features/users/Login"
import { SignUp } from "./features/users/SignUp"
import { HomePage } from "./pages/HomePage"

function App() {
  const pathName = useLocation().pathname
  return (
    <div className="">
      <Header />
      <div className="mx-auto mt-20 mb-14  flex max-w-7xl items-start justify-between">
        {/* <div
          className={`hidden lg:block ${
            (pathName === "/login" || pathName === "/signup") && `lg:hidden`
          }`}
        >
          <UserList />
        </div> */}
        <div className="mx-auto ">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoutes>
                  <HomePage />
                </PrivateRoutes>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile/:id"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div
          className={`hidden lg:block ${
            (pathName === "/login" || pathName === "/signup") && `lg:hidden`
          }`}
        >
          <UserList />
        </div>
      </div>
      <MobileNav />
    </div>
  )
}

export default App
