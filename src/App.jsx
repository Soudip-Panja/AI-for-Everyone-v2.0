import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home"
import Learn from "./Pages/Learn/Learn"
import Build from "./Pages/Build/Build"
import Invest from "./Pages/Invest/Invest"
import Hire from "./Pages/Hire/Hire"

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
  },
  {
    path: "/hire",
    element: <Hire/>
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
