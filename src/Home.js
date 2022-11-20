import styled from 'styled-components'
import { useState } from "react";
import { Link } from "react-router-dom";
import Contexto from "./Contexto.js"
import { useContext } from "react";

export default function Home() {
    const {  entrada, setEntrada } = useContext(Contexto);
    console.log(entrada)
    return (
        <BodyHome>
            <Header>
                <p>Olá, Fulano</p>
                icon
            </Header>
            <Registros>
                Não há registros de entrada ou saída
            </Registros>
            <Footer>
                <Link to={"/transferencia"}>
                    <Buttons onClick={()=> setEntrada(true) }>
                        icon
                        <p>Nova entrada</p>
                    </Buttons>
                </Link>
                <Link to={"/transferencia"}>
                    <Buttons onClick={()=> setEntrada(false) } >
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
display: flex;
justify-content: center;
align-items: center;
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