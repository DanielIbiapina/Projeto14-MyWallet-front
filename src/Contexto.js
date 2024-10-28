import { createContext } from "react";

const Contexto = createContext({
  token: null,
  setToken: () => {},
  setAndPersistToken: () => {},
  logout: () => {},
  entrada: true,
  setEntrada: () => {},
  corSelecionado: [],
  setCorSelecionado: () => {},
});

export default Contexto;
