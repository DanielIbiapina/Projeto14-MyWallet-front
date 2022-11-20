import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Contexto from "./Contexto.js"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const { setAndPersistToken} = useContext(Contexto);
    const navigate = useNavigate()
    


    function fazerLogin(event) {
        event.preventDefault();
        setLoading(true)
        const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", {
            email: email,
            password: senha
        })

        requisicao.then(resposta => {
            setLoading(false)
            console.log(`Bem-vindo ${resposta.data.name}, login foi um sucesso`)
            //setLoginData(resposta.data)
            setAndPersistToken(resposta.data.token);
            const dados = resposta.data
            const dadosSerializados = JSON.stringify(dados)
            localStorage.setItem("lista", dadosSerializados);
            console.log(resposta.data)
            //if(resposta.data.membership == null){
            //    navigate("/subscriptions")
            //} else navigate("/home")

        });

        requisicao.catch(erro => {
            alert('erro')
            setLoading(false)
            console.log(erro.response.data);
        });

    }

    return(
        <BodyLogin>
        <Logo>
            MyWallet
        </Logo>
        <Form onSubmit={fazerLogin}>
                <Input type="email" placeholder="  E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                <Input type="password" placeholder="  Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                {loading
                    ?
                    <BotaoEntrar type="submit">
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
                    </BotaoEntrar>
                    :
                    <BotaoEntrar type="submit">Entrar</BotaoEntrar>
                }
            </Form>

            <Link to={"/cadastro"}>

                <BotaoNaoTenhoConta>
                    Primeira vez? Cadastre-se
                </BotaoNaoTenhoConta>


            </Link>
        </BodyLogin>
    );
}

const BodyLogin = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const Logo = styled.div`
margin-top: 159px;
font-family: 'Saira Stencil One';
font-style: normal;
font-weight: 400;
font-size: 32px;
line-height: 50px;
color: #FFFFFF;
`
const BotaoEntrar = styled.button`
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
const BotaoNaoTenhoConta = styled.div`
width: 191px;
height: 18px;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 18px;
color: #FFFFFF;
display: flex;
justify-content: center;
align-items: center;
text-decoration-line: none;
margin-top: 36px;
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