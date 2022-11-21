import styled from 'styled-components'
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Contexto from "./Contexto.js"
import axios from 'axios';


export default function Home() {
    const { entrada, setEntrada, corSelecionado, setCorSelecionado  } = useContext(Contexto);
    const [registros, setRegistros] = useState([])
    let saldo = []
    let sum = 0
    const [soma, setSoma] = useState(0)
    

    function atualizarRegistros(dadosSerializados) {
        console.log(dadosSerializados)
        const lista = JSON.parse(dadosSerializados);
        console.log(lista)
        const novoArray = [...registros, lista]
        setRegistros(novoArray)
        
    }
    function somarSaldo(dadosSerializados){
        const lista = JSON.parse(dadosSerializados);
        
        lista.map((registro) => {
            console.log(registro.valor)
            if (registro.positivo == 'positivo'){
                saldo.push(Number(registro.valor))
            } else {
                saldo.push((-1)* Number(registro.valor) )
            }
            
           
        })
        
        for(let i=0; i<saldo.length; i++){
            sum = sum + saldo[i] 
           }
           setSoma(sum)
    }
    
    console.log(entrada)

    useEffect(() => {

        const promise = axios.get(`http://localhost:5000/registros`)
        promise.then(resposta => {
            const dados = resposta.data
            const dadosSerializados = JSON.stringify(dados)
            console.log('registros resgatados')
            console.log(dadosSerializados)
            atualizarRegistros(dadosSerializados);
            somarSaldo(dadosSerializados);
            console.log(saldo)
            console.log(sum)
        });
    }, []);

    if (registros[0] === undefined) {
        return 'carregando...';
    }

    console.log(registros)
    


    return (
        <BodyHome>
            <Header>
                <p>Olá, Fulano</p>
                icon
            </Header>
            <Registros>
                <div>
                {registros[0].map((registro, key) => {
                    return (

                        <ContainerRegistro>
                            <RegistroDia> {registro.time} </RegistroDia>
                            <div>
                            <RegistroTexto> {registro.descricao} </RegistroTexto>
                            </div>
                            <RegistroPreço cor = {registro.positivo == 'positivo' ? '#03AC00' : "#C70000"}> R$ {registro.valor} </RegistroPreço>
                        </ContainerRegistro>

                    )
                }
                )}
                </div>
                <ContainerSaldo cor = {soma > 0 ? '#03AC00' : "#C70000"}>
                    <p>SALDO</p>
                    <h1  >{soma} </h1>
                </ContainerSaldo>
            </Registros>
            <Footer>
                <Link to={"/transferencia"}>
                    <Buttons onClick={() => setEntrada(true)}>
                        icon
                        <p>Nova entrada</p>
                    </Buttons>
                </Link>
                <Link to={"/transferencia"}>
                    <Buttons onClick={() => setEntrada(false)} >
                        icon
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
const Registros = styled.div`
box-sizing: border-box;
width: 326px;
height: 446px;
background: #FFFFFF;
font-family: 'Raleway';
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
`
const ContainerRegistro = styled.div`
width: 300px;
height: 35px;
margin-bottom: 4px;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: #000000;
display: flex;
justify-content: space-between;
align-items: center;
background-color: blue;

`
const ContainerSaldo = styled.div`
width: 300px;
height: 35px;
margin-bottom: 4px;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: #000000;
display: flex;
justify-content: space-between;
align-items: center;
background-color: blue;
h1{
    color: ${props => props.cor};
}
`
const RegistroDia = styled.div`

`
const RegistroTexto = styled.div`
width: 145px;


`
const RegistroPreço = styled.div`
color: ${props => props.cor};
`
const Footer = styled.div`
width: 326px;
display: flex;
justify-content: space-between;
margin-top: 13px;
`

const Buttons = styled.div`
width: 155px;
height: 114px;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 20px;
color: #FFFFFF;
background: #A328D6;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: space-between;
p{
    width: 64px;
    margin-left: 10px;
    margin-bottom: 9px;
}
`