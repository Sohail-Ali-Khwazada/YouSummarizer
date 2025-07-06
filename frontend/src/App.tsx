import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "@/layouts/HomeLayout";
import LearnLayout from "@/layouts/LearnLayout";
import LandingPage from "@/pages/LandingPage";
import Signup from "@/pages/Signup";
import LoginPage from "@/pages/LoginPage";
import SearchPage from "@/pages/SearchPage";
import LearningPage from "@/pages/LearningPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "signup", Component: Signup },
      { path: "login", Component: LoginPage },
    ],
  },
  {
    path: "/learn",
    Component: LearnLayout,
    children: [
      { index: true, Component: SearchPage },
      { path: "content", Component: LearningPage },
    ],
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
