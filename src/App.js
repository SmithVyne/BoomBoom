import React, { createContext, useEffect, useState, Suspense } from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import 'cleave.js/dist/addons/cleave-phone.ru';
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useCookieStorage, useLocalStorage } from "./hooks";

import Preloader from "./globals/Preloader/Preloader"
import LoginForm from "./globals/LoginForm";
import Nav from "./globals/Nav";
import Main from "./pages/Main";




import BuyNumberModal from "./components/BuyNumberModal";
import Footer from "./globals/Footer/Footer";


const TariffPage = React.lazy(() => import('./pages/TariffPage/TariffPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const NumbersPage = React.lazy(() => import('./pages/NumbersPage/NumbersPage'));
const AboutCompany = React.lazy(() => import('./pages/AboutCompany/AboutCompany'));
const OrganisationsPage = React.lazy(() => import('./pages/OrganisationsPage/OrganisationsPage'));
const TariffePage = React.lazy(() => import('./pages/TariffePage/TariffePage'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound/PageNotFound'));
const Services = React.lazy(() => import('./pages/Services/Services'));


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
  const [accessToken, setAccessToken] = useCookieStorage("accessToken");
  const [refreshToken, setRefreshToken] = useCookieStorage("refreshToken");
  
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

  // console.log(userSession.refreshTokenExpire * 1000 < Date.parse(Date()));

  useEffect(() => {
    const watcher = () => setIsMobile(window.innerWidth < 1100);
    window.addEventListener("resize", watcher);
    return () => window.removeEventListener("resize", watcher);
  }, [])

  return (

    <GlobalContext.Provider value={{ darkTheme, setDarkTheme, setLoginForm, userSession, setUserSession, isMobile }}>
      <ThemeProvider theme={whichTheme(darkTheme)}>
        <div className={`app ${darkTheme ? 'app_dark' : ''}`}>
          <Wrapper>
            <Nav />
            <Mainml>
              <Switch>
                <Route exact path="/" component={Main} />

                <Route path="/tariffs/:type">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <TariffPage />
                  </Suspense>
                </Route>

                <Route path="/tariffs">
                  <Redirect to="/tariffs/:all" />
                </Route>

                <Route path="/dashboard" >
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <Dashboard />
                  </Suspense>
                </Route>

                <Route path="/numbers/:button">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <NumbersPage />
                  </Suspense>
                </Route>

                <Route path="/numbers">
                  <Redirect to="/numbers/:все" />
                </Route>

                <Route path="/services/:type">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <Services />
                  </Suspense>
                </Route>

                <Route path="/services">
                  <Redirect to="/services/:paid" />
                </Route>

                <Route path="/organisations/:type">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <OrganisationsPage />
                  </Suspense>
                </Route>

                <Route path="/organisations">
                  <Redirect to="/organisations/:small-biz" />
                </Route>

                <Route path="/tariff-info/:tariff">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <TariffePage />
                  </Suspense>
                </Route>

                <Route path="/support/about-us" >
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <AboutCompany />
                  </Suspense>
                </Route>

                <Route path="/support">
                  <Redirect to="/support/about-us" />
                </Route>

                <Route path="*">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <PageNotFound />
                  </Suspense>
                </Route>
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
