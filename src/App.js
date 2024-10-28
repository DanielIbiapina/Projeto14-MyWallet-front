import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Transferencia from "./pages/Transferencia";
import Contexto from "./Contexto";
import { useState, useNavigate, useEffect } from "react";

export default function App() {
  const [token, setToken] = useState(null);
  const [corSelecionado, setCorSelecionado] = useState([]);
  const [entrada, setEntrada] = useState(true);
  const tokenOnLocalStorage = localStorage.getItem("token");
  const listaSerializada = localStorage.getItem("lista");
  const lista = JSON.parse(listaSerializada);

  function setAndPersistToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <Contexto.Provider
      value={{
        token,
        setToken,
        setAndPersistToken,
        entrada,
        setEntrada,
        corSelecionado,
        setCorSelecionado,
        logout,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/cadastro"
            element={token ? <Navigate to="/home" /> : <Cadastro />}
          />
          <Route
            path="/home"
            element={token ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/transferencia"
            element={token ? <Transferencia /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </Contexto.Provider>
  );
}
