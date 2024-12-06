import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./modules/Home";
import LoginPage from "./modules/Login";
import RegisterPage from "./modules/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
