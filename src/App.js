import { createContext, useState } from "react";
import Nav from "./globals/Nav";
import Main from "./pages/Main";
import styled, { ThemeProvider } from "styled-components";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TariffPage from "./pages/TariffPage";
import LoginForm from "./globals/LoginForm";

export const themeContext = createContext();
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
  const [darkTheme, setDarkTheme] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  return (
    <themeContext.Provider value={{darkTheme, setDarkTheme, setLoginForm}}>
      <ThemeProvider theme={whichTheme(darkTheme)}>
        <Router>
          <Wrapper>
            <Nav />
            <Mainml>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/tariffs" component={TariffPage} />
              </Switch>
            </Mainml>
          </Wrapper>
          {loginForm && <LoginForm />}
        </Router>
      </ThemeProvider>
    </themeContext.Provider>
  )
}
