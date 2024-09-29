import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import About from "./pages/about";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import SignUpBiz from "./pages/signUpBiz";
import SignOut from "./pages/signOut";
import MyCards from "./pages/my-cards";
import CreateCard from "./pages/createCard";
import FavCards from "./pages/fav-cards";
import CardPage from "./components/cardPage";
import { useState } from "react";
import NavBar from "./components/navbar";
import useLocalStorage from "use-local-storage";
import DarkModeToggle from "./components/darkModeToggle";

function App() {
  const [isDark, setIsDark] = useLocalStorage(false);
  const [search, setSearch] = useState("");
  const darkMode = () => {
    return (
      <DarkModeToggle
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
      />
    );
  };

  return (
    <div
      data-theme={isDark ? "dark" : "light"}
      className="app min-vh-100 d-flex flex-column gap-2"
      style={{
        background: "var(--background-color)",
      }}
    >
      <NavBar setSearch={setSearch} darkMode={darkMode} />
      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home searchValue={search} />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up-biz" element={<SignUpBiz />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="/create-card" element={<CreateCard />} />
          <Route path="/fav-cards" element={<FavCards />} />
          <Route path="/cardPage/:id" element={<CardPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
