import styled from 'styled-components'
import { Oval } from "react-loader-spinner";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Contexto from "./Contexto.js"


export default function Transferencia() {

    const [valor, setValor] = useState('')
    const [descricao, setDescricao] = useState('')
    const [loading, setLoading] = useState(false)
    const { entrada, setEntrada, corSelecionado, setCorSelecionado } = useContext(Contexto);
   
    const navigate = useNavigate()
    console.log(entrada)

    function fazerTransferencia(event) {
        event.preventDefault();
        setLoading(true)
        const requisicao = axios.post("http://localhost:5000/operacao", {
            valor: valor,
            descricao: descricao
        })

        requisicao.then(resposta => {
            setLoading(false)
            //setLoginData(resposta.data)
            const dados = resposta.data
            const dadosSerializados = JSON.stringify(dados)
            localStorage.setItem("listavalor", dadosSerializados);
            console.log(resposta.data)
            if(entrada == true){
        
                const novoArray = [...corSelecionado, dados[0].time]
                setCorSelecionado(novoArray)
            }
            navigate("/home")

        });

        requisicao.catch(erro => {
            alert('erro')
            setLoading(false)
            console.log(erro.response.data);
        });
    

    }

    return (
        <BodyTransferencia>
            <Header>
                {entrada
                    ?
                    <p>Nova entrada</p>
                    :
                    <p>Nova saída</p>
                }
            </Header>
            <Form onSubmit={fazerTransferencia}>
                <Input type="text" placeholder="  Valor" value={valor} onChange={e => setValor(e.target.value)} />
                <Input type="text" placeholder="  Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
                {loading
                    ?
                    <BotaoSalvar type="submit">
                        <Oval
                            height={40}
                            width={40}
                            color="#FFFFFF"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#4fa94d"
                            strokeWidth={2}
                            strokeWidthSecondary={2}

                        />
                    </BotaoSalvar>
                    :(
                        entrada 
                        ? 
                        <BotaoSalvar type="submit">Salvar entrada</BotaoSalvar>
                        :
                        <BotaoSalvar type="submit">Salvar saída</BotaoSalvar>
                    )
                    
                }
            </Form>

        </BodyTransferencia>
    )
}

const BodyTransferencia = styled.div`
margin-left: auto;
margin-right: auto;
display: flex;
flex-direction: column;
width: 326px;
`
const Header = styled.div`
width: 326px;
display: flex;
justify-content: space-between;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 26px;
line-height: 31px;
color: #FFFFFF;
margin-bottom: 22px;
margin-top: 25px;
`
const Input = styled.input`
box-sizing: border-box;
width: 326px;
height: 58px;
margin-bottom: 13px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
::placeholder{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
}
`
const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 24px;
`

const BotaoSalvar = styled.button`
width: 326px;
height: 46px;
background: #A328D6;
border-radius: 5px;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 23px;
color: #FFFFFF;
`