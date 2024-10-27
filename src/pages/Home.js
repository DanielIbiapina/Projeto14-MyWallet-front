import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Contexto from "../Contexto.js";
import axios from "axios";
import { MdOutlineLogout } from "react-icons/md";

export default function Home() {
  const { entrada, setEntrada, corSelecionado, setCorSelecionado, token } =
    useContext(Contexto);
  const tokenOnLocalStorage = localStorage.getItem("token");
  const [registros, setRegistros] = useState([]);
  const [pessoa, setPessoa] = useState("");
  let saldo = [];
  let sum = 0;
  const [soma, setSoma] = useState(0);

  function atualizarRegistros(dadosSerializados) {
    const lista = JSON.parse(dadosSerializados);

    const novoArray = [...registros, lista];
    setRegistros(novoArray);
  }
  function somarSaldo(dadosSerializados) {
    const lista = JSON.parse(dadosSerializados);

    lista.map((registro) => {
      if (registro.positivo == "positivo") {
        saldo.push(Number(registro.valor));
      } else {
        saldo.push(-1 * Number(registro.valor));
      }
    });

    for (let i = 0; i < saldo.length; i++) {
      sum = sum + saldo[i];
    }
    setSoma(sum);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${tokenOnLocalStorage}`,
    },
  };

  useEffect(() => {
    const promises = axios.get(`http://localhost:5000/meus-dados`, config);
    promises.then((resposta) => {
      const dadoss = resposta.data;
      const dadosSerializadoss = JSON.stringify(dadoss);

      setPessoa(dadoss.name);
    });

    const promise = axios.get(`http://localhost:5000/registros`);
    promise.then((resposta) => {
      const dados = resposta.data;
      const dadosSerializados = JSON.stringify(dados);

      atualizarRegistros(dadosSerializados);
      somarSaldo(dadosSerializados);
    });
  }, []);

  if (registros[0] === undefined) {
    return "carregando...";
  }

  return (
    <BodyHome>
      <Header>
        <p>Olá, {pessoa}</p>
        <Link to={"/"} style={{ color: "inherit", cursor: "pointer" }}>
          <MdOutlineLogout />
        </Link>
      </Header>
      <Registros>
        <div>
          {registros[0].length != 0
            ? registros[0].map((registro, key) => {
                return (
                  <ContainerRegistro>
                    <RegistroDia> {registro.time} </RegistroDia>
                    <div>
                      <RegistroTexto> {registro.descricao} </RegistroTexto>
                    </div>
                    <RegistroPreço
                      cor={
                        registro.positivo == "positivo" ? "#03AC00" : "#C70000"
                      }
                    >
                      {" "}
                      R$ {registro.valor}{" "}
                    </RegistroPreço>
                  </ContainerRegistro>
                );
              })
            : "Não há registros de entrada ou saída"}
        </div>
        <ContainerSaldo cor={soma > 0 ? "#03AC00" : "#C70000"}>
          <p>SALDO</p>
          <h1>R${soma} </h1>
        </ContainerSaldo>
      </Registros>
      <Footer>
        <Link to={"/transferencia"} style={{ textDecoration: "none" }}>
          <Buttons onClick={() => setEntrada(true)}>
            <div>
              <h2 style={{ marginTop: "3px" }}>+</h2>
            </div>
            <p>Nova entrada</p>
          </Buttons>
        </Link>
        <Link to={"/transferencia"} style={{ textDecoration: "none" }}>
          <Buttons onClick={() => setEntrada(false)}>
            <div>
              <h2 style={{ marginBottom: "5px" }}>-</h2>
            </div>
            <p>Nova saída</p>
          </Buttons>
        </Link>
      </Footer>
    </BodyHome>
  );
}

const BodyHome = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  width: 326px;
`;
const Header = styled.div`
  width: 326px;
  display: flex;
  justify-content: space-between;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  color: #ffffff;
  margin-bottom: 22px;
  margin-top: 25px;
`;
const Registros = styled.div`
  box-sizing: border-box;
  width: 326px;
  height: 446px;
  background: #ffffff;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #868686;
  border-radius: 5px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const ContainerRegistro = styled.div`
  width: 300px;
  height: 35px;
  margin-bottom: 4px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ContainerSaldo = styled.div`
  width: 300px;
  height: 35px;
  margin-bottom: 4px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-weight: 800;
  }
  h1 {
    color: ${(props) => props.cor};
  }
`;
const RegistroDia = styled.div`
  color: #c6c6c6;
`;
const RegistroTexto = styled.div`
  width: 145px;
`;
const RegistroPreço = styled.div`
  color: ${(props) => props.cor};
`;
const Footer = styled.div`
  width: 326px;
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
`;

const Buttons = styled.div`
  width: 155px;
  height: 114px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  color: #ffffff;
  background: #a328d6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  p {
    width: 64px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 25px;
    height: 25px;
    border-radius: 50%;
    font-size: 30px;
    font-weight: 400;
    border: solid 2px white;
  }
`;
