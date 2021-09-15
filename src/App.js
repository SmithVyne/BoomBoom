import { createContext, useState } from "react";
import Nav from "./globals/Nav";
import Main from "./pages/Main";
import styled, { ThemeProvider } from "styled-components";
import {Switch, Route} from "react-router-dom";
import TariffPage from "./pages/TariffPage";
import LoginForm from "./globals/LoginForm";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import useLocalStorage from "./hooks/useLocalStorage";

export const GlobalContext = createContext();
const whichTheme = (darkTheme) => {
  if(darkTheme) {
    return {
      background: "#010101",
      textColor: "#ffffff",
    }
  } else {
    return {
      background: "#F8F8F8",
      textColor: "#121212",
    }
  }
};

const Wrapper = styled.div`
  max-width: 100%;
  min-height:100vh;
  height: fit-content;
  background: ${props => props.theme.background};
  padding: 48px 80px;
  @media(max-width: 720px) {
    padding: 5vw;
  }
`;
const Mainml = styled.main`
  display: flex;
  flex-direction: column;
  gap: 60px;
  color:  ${props => props.theme.textColor};
`

export default function App() {
  const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme");
  const [userSession, setUserSession] = useLocalStorage("userSession");
  darkTheme === null && setDarkTheme(false)
  const [loginForm, setLoginForm] = useState(false);

  return (
    <GlobalContext.Provider value={{darkTheme, setDarkTheme, setLoginForm, userSession, setUserSession}}>
      <ThemeProvider theme={whichTheme(darkTheme)}>
        <Wrapper>
          <Nav />
          <Mainml>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/tariffs" component={TariffPage} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </Mainml>
        </Wrapper>
        <AnimatePresence>{loginForm && <LoginForm />}</AnimatePresence>
      </ThemeProvider>
    </GlobalContext.Provider>
  )
}
