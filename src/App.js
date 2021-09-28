import { createContext, useEffect, useState } from "react";
import Nav from "./globals/Nav";
import Main from "./pages/Main";
import styled, { ThemeProvider } from "styled-components";
import {Switch, Route} from "react-router-dom";
import TariffPage from "./pages/TariffPage";
import LoginForm from "./globals/LoginForm";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import {useLocalStorage} from "./hooks";
import NumbersPage from "./pages/NumbersPage/NumbersPage";
import RoamingPage from "./pages/RoamingPage/RoamingPage";
import OrganisationsPage from "./pages/OrganisationsPage/OrganisationsPage";
import TariffePage from "./pages/TariffePage/TariffePage";
import BuyNumberModal from "./components/BuyNumberModal";
import 'cleave.js/dist/addons/cleave-phone.ru';
import { useSelector } from "react-redux";

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
  overflow: hidden;
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  const buyNumberModal = useSelector(store => store.buyNumberModal);

  useEffect(() => {
      const watcher = () => setIsMobile(window.innerWidth < 1100);
      window.addEventListener("resize", watcher);
      return () => window.removeEventListener("resize", watcher);
  }, [])
  
  return (
    <GlobalContext.Provider value={{darkTheme, setDarkTheme, setLoginForm, userSession, setUserSession, isMobile}}>
      <ThemeProvider theme={whichTheme(darkTheme)}>
        <Wrapper>
          <Nav />
          <Mainml>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/tariffs" component={TariffPage} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/numbers" component={NumbersPage} />
              <Route path="/roaming" component={RoamingPage} />
              <Route path="/organisations" component={OrganisationsPage} />
              <Route path="/tariff-info/:tariff" component={TariffePage} />
            </Switch>
          </Mainml>
        </Wrapper>
        <AnimatePresence>
          {loginForm && <LoginForm />}
          {buyNumberModal.show && <BuyNumberModal name={buyNumberModal.title} buy={buyNumberModal.buy} number={buyNumberModal.number} />}
        </AnimatePresence>
      </ThemeProvider>
    </GlobalContext.Provider>
  )
}
