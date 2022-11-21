import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./Cadastro";
import Login from "./Login";
import Home from "./Home"
import Transferencia from "./Transferencia";
import Contexto from "./Contexto";
import { useState, useNavigate, useEffect } from "react";


export default function App() {
    const [token, setToken] = useState(null);
    const [corSelecionado, setCorSelecionado] = useState([]);
    const [entrada, setEntrada] = useState(true)
    const tokenOnLocalStorage = localStorage.getItem("token");
    const listaSerializada = localStorage.getItem("lista");
    const lista = JSON.parse(listaSerializada);
    console.log(lista)
    console.log(tokenOnLocalStorage)
  
    function setAndPersistToken(token) {
		setToken(token);
		localStorage.setItem("token", token);
	}
    

console.log(token)

    return(
       <Contexto.Provider value={{token, setToken, setAndPersistToken, entrada, setEntrada, corSelecionado, setCorSelecionado}}>
        <BrowserRouter>
            <Routes>
            <Route path="/"  element= {<Home/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/transferencia" element={<Transferencia/>} />
            </Routes>
        </BrowserRouter>
        </Contexto.Provider>
        
    );
    
}

//consertar array registros
//baixar dayjs pra usar como id na hora de selecionar a cor