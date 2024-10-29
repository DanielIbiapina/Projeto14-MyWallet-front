import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Contexto from "../Contexto.js";
import dayjs from "dayjs";

export default function Transferencia() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const { entrada, token } = useContext(Contexto);
  const navigate = useNavigate();

  function fazerTransferencia(event) {
    event.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const valorNumerico = Number(valor).toFixed(2);

    const body = {
      valor: valorNumerico,
      descricao: descricao,
      positivo: entrada ? "positivo" : "negativo",
      data: dayjs().format("DD/MM"),
    };

    console.log("Dados sendo enviados:", body);

    axios
      .post(`${process.env.REACT_APP_API}/operacao`, body, config)
      .then((res) => {
        setLoading(false);
        navigate("/home");
      })
      .catch((erro) => {
        console.error("Erro completo:", erro);
        setLoading(false);
        if (erro.response) {
          alert(erro.response.data);
        } else {
          alert("Erro ao conectar com o servidor");
        }
      });
  }

  return (
    <BodyTransferencia>
      <Header>{entrada ? <p>Nova entrada</p> : <p>Nova saída</p>}</Header>
      <Form onSubmit={fazerTransferencia}>
        <Input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        {loading ? (
          <BotaoSalvar disabled>
            <Oval
              height={40}
              width={40}
              color="#FFFFFF"
              wrapperStyle={{}}
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </BotaoSalvar>
        ) : (
          <BotaoSalvar type="submit">
            {entrada ? "Salvar entrada" : "Salvar saída"}
          </BotaoSalvar>
        )}
      </Form>
    </BodyTransferencia>
  );
}

const BodyTransferencia = styled.div`
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
const Input = styled.input`
  box-sizing: border-box;
  width: 326px;
  height: 58px;
  margin-bottom: 13px;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  ::placeholder {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const BotaoSalvar = styled.button`
  width: 326px;
  height: 46px;
  background: #a328d6;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;
`;
