import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./modules/Home";
import LoginPage from "./modules/Login";
import RegisterPage from "./modules/Register";
import AuthGuard from "./components/guards/AuthGuard";
import FriendsPage from "./modules/Friends";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<AuthGuard requireAuth={false} redirectTo="/" />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<AuthGuard requireAuth={true} redirectTo="/login" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/friends" element={<FriendsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
