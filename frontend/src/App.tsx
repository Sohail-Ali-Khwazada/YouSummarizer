import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import HomeLayout from "@/layouts/HomeLayout";
import LearnLayout from "@/layouts/LearnLayout";
import LandingPage from "@/pages/LandingPage";
import Signup from "@/pages/Signup";
import LoginPage from "@/pages/LoginPage";
import SearchPage from "@/pages/SearchPage";
import LearningPage from "@/pages/LearningPage";
import TestPage from "@/components/TestPage";
import { GlobalContextProvider } from "@/context/GlobalContext";
import { Toaster } from "react-hot-toast";

const authCheck = () => {
  const userData = localStorage.getItem("you-user");
  const user = userData ? JSON.parse(userData) : null;

  if(!user) return redirect("/login");
}

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
    loader: authCheck,
    children: [
      { index: true, Component: SearchPage },
      { path: "content", Component: LearningPage },
    ],
  },
  {
    path: "/test",
    Component: TestPage
  }

]);

function App() {
  return (
    <GlobalContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </GlobalContextProvider>
  );
}

export default App;
