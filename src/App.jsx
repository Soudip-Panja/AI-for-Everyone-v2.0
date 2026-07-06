import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home"
import Learn from "./Pages/Learn/Learn"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/learn",
    element: <Learn/>
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
