import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  function setAndPersistToken(token) {
    setToken(token);
    localStorage.setItem("token", token);
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
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transferencia" element={<Transferencia />} />
        </Routes>
      </BrowserRouter>
    </Contexto.Provider>
  );
}

//consertar array registros
//baixar dayjs pra usar como id na hora de selecionar a cor
