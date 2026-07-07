import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home"
import Learn from "./Pages/Learn/Learn"
import Build from "./Pages/Build/Build"
import Invest from "./Pages/Invest/Invest"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/learn",
    element: <Learn/>
  },
  {
    path: "/build",
    element: <Build/>
  },
  {
    path: "/invest",
    element: <Invest/>
  }
])

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
