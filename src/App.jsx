import { useEffect } from "react"
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration, useLocation } from "react-router-dom"
import Home from "./Pages/Home"
import Learn from "./Pages/Learn/Learn"
import Build from "./Pages/Build/Build"
import Invest from "./Pages/Invest/Invest"
import Hire from "./Pages/Hire/Hire"
import AboutUs from "./Pages/About Us/About Us"
import ContactUs from "./Pages/Contact Us/ContactUs"
import Gallery from "./Pages/Gallery/Gallery"

const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    // Select elements we want to animate on scroll
    const selectors = [
      "section",
      ".about-mission-section",
      ".about-founder-container",
      ".contact-info-card",
      ".contact-form-card",
      ".learn-lms-card",
      ".invest-lms-card",
      ".hire-step-card",
      ".build-card"
    ];

    const elements = document.querySelectorAll(selectors.join(", "));

    // Initialize state
    elements.forEach((el) => {
      if (!el.classList.contains("reveal-active")) {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target); // Reveal once
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [location.pathname]); // Re-run when path changes
}

const RootLayout = () => {
  useScrollReveal(); // Call scroll reveal on all pages
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "learn",
        element: <Learn />
      },
      {
        path: "build",
        element: <Build />
      },
      {
        path: "invest",
        element: <Invest />
      },
      {
        path: "hire",
        element: <Hire />
      },
      {
        path: "about-us",
        element: <AboutUs />
      },
      {
        path: "contact-us",
        element: <ContactUs />
      },
      {
        path: "gallery",
        element: <Gallery />
      }
    ]
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
