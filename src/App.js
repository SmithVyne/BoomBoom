import React, { createContext, useEffect, useState } from "react";
import Nav from "./globals/Nav";
import Main from "./pages/Main";
import styled, { ThemeProvider } from "styled-components/macro";
import { Switch, Route, Redirect } from "react-router-dom";
import TariffPage from "./pages/TariffPage/TariffPage";
import LoginForm from "./globals/LoginForm";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import { useLocalStorage } from "./hooks";
import NumbersPage from "./pages/NumbersPage/NumbersPage";
import AboutCompany from "./pages/AboutCompany/AboutCompany";

import OrganisationsPage from "./pages/OrganisationsPage/OrganisationsPage";
import TariffePage from "./pages/TariffePage/TariffePage";
import PageNotFound from './components/PageNotFound/PageNotFound'
import BuyNumberModal from "./components/BuyNumberModal";
import Footer from "./globals/Footer/Footer";
import 'cleave.js/dist/addons/cleave-phone.ru';
import { useSelector } from "react-redux";
import Services from "./pages/Services/Services";

export const GlobalContext = createContext();


const Wrapper = styled.div`
position: relative;
  max-width: 100%;
  min-height:100vh;
  max-width: 2560px;
  margin: 0 auto;
  height: fit-content;
  background: ${props => props.theme.background};
  padding: 48px 80px 0 80px;
  overflow: hidden;
  @media(max-width: 1500px) {
    padding: 48px 40px 0 40px;
  }
  @media(max-width: 720px) {
    padding: 7vw 5vw 0 5vw;
  }
`;
const Mainml = styled.main`
  display: flex;
  flex-direction: column;
  color:  ${props => props.theme.textColor};
`

export default function App() {
  const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme");
  const [userSession, setUserSession] = useLocalStorage("userSession");
  darkTheme === null && setDarkTheme(false)
  const [loginForm, setLoginForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  const buyNumberModal = useSelector(store => store.buyNumberModal);

  const whichTheme = (darkTheme) => {
    if (darkTheme) {
      return {
        background: "#010101",
        textColor: "#ffffff",
        darkTheme
      }
    } else {
      return {
        background: "#F8F8F8",
        textColor: "#121212",
        darkTheme
      }
    }
  }


  useEffect(() => {
    const watcher = () => setIsMobile(window.innerWidth < 1100);
    window.addEventListener("resize", watcher);
    return () => window.removeEventListener("resize", watcher);
  }, [])

  return (

    <GlobalContext.Provider value={{ darkTheme, setDarkTheme, setLoginForm, userSession, setUserSession, isMobile }}>
      <ThemeProvider theme={whichTheme(darkTheme)}>
        <div className={`app ${darkTheme? 'app_dark': ''}`}>
          <Wrapper>
            <Nav />
            <Mainml>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/tariffs/:type" component={TariffPage} />
                <Route path="/tariffs">
                  <Redirect to="/tariffs/:all" />
                </Route>
                <Route path="/dashboard" component={Dashboard} />

                <Route path="/numbers/:button" component={NumbersPage} />
                <Route path="/numbers">
                  <Redirect to="/numbers/:все" />
                </Route>
                <Route path="/services/:type" component={Services} />
                <Route path="/services">
                  <Redirect to="/services/:paid" />
                </Route>
                <Route path="/organisations/:type" component={OrganisationsPage} />
                <Route path="/organisations">
                  <Redirect to="/organisations/:small-biz" />
                </Route>
                <Route path="/tariff-info/:tariff" component={TariffePage} />

                <Route path="/support/about-us" component={AboutCompany} />
                <Route path="/support">
                  <Redirect to="/support/about-us" />
                </Route>
                <Route path="*" component={PageNotFound} />
              </Switch>
            </Mainml>
            <Footer />
          </Wrapper>
          <AnimatePresence>
            {loginForm && <LoginForm />}
            {buyNumberModal.show && <BuyNumberModal buy={buyNumberModal.buy} numbers={buyNumberModal.numbers} payload={buyNumberModal.payload} />}
          </AnimatePresence>
        </div>

      </ThemeProvider>
    </GlobalContext.Provider>
  )
}
