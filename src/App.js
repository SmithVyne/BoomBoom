import React, { createContext, useEffect, useState, Suspense, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import 'cleave.js/dist/addons/cleave-phone.ru';
import { useSelector } from "react-redux";
import { Switch, Route, Redirect, withRouter, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import urlUtmParams from 'url-utm-params'
import { useLocalStorage } from "./hooks";

import Preloader from "./globals/Preloader/Preloader"
import LoginForm from "./globals/LoginForm";
import Nav from "./globals/Nav";
import Main from "./pages/Main";
import BuyNumberModal from "./components/BuyNumberModal";
import Footer from "./globals/Footer/Footer";
import Scrollbar from 'smooth-scrollbar';


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

export default withRouter(function App({ location }) {
  const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme");


  darkTheme === null && setDarkTheme(false)
  const [loginForm, setLoginForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 600);
  const [scrollY, setScrollY] = useState(0);
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
    
    let utmParams = urlUtmParams.utm(window.location.href)

    if (Object.keys(utmParams).length > 0) {
      let utm = {}

      if (utmParams.utm_source) {
        utm.utm_source = decodeURI(utmParams.utm_source)
      }
      if (utmParams.utm_medium) {
        utm.utm_medium = decodeURI(utmParams.utm_medium)
      }
      if (utmParams.utm_campaign) {
        utm.utm_campaign = decodeURI(utmParams.utm_campaign)
      }
      if (utmParams.utm_term) {
        utm.utm_term = decodeURI(utmParams.utm_term)
      }
      if (utmParams.utm_content) {
        utm.utm_content = decodeURI(utmParams.utm_content)

      }
      localStorage.setItem('utm', JSON.stringify(utm));
      
    }

  }, [location])

  useEffect(() => {
    const watcher = () => {
      setIsMobile(window.innerWidth < 1100); 
      setIsPhone(window.innerWidth <= 600);
    };
    const watcher2 = () => window.scrollY && setScrollY(window.scrollY)
    window.addEventListener("resize", watcher);
    window.addEventListener("scroll", watcher2);
    return () => {
      window.removeEventListener("resize", watcher);
      window.removeEventListener("scroll", watcher2);
    };
  }, [])

  const scrollbar = useMemo(() => {
    if(isPhone && !(buyNumberModal.show || loginForm)) {
      return Scrollbar.init(document.body, {damping: 0.1})
    }
  }, [buyNumberModal.show, isPhone, loginForm])
  useEffect(() => {
    if(scrollbar) {
      const listener = ({offset}) => setScrollY(offset.y);
      scrollbar.addListener(listener);
      return () => {
        scrollbar.removeListener(listener)
      }
    }
  }, [scrollbar])

  const { pathname } = useLocation();

  useEffect(() => {
    if(buyNumberModal.show || loginForm || pathname === "/dashboard"){
      Scrollbar.destroy(document.body)
      window.scrollTo(0, scrollY)
    } 
    else if(isPhone) {
      window.scrollTo(0, 0)
      scrollbar.scrollTop = scrollY;
    }
    else if(!isPhone) {
      Scrollbar.destroy(document.body)
    }
  }, [buyNumberModal.show, isPhone, loginForm, scrollY, scrollbar, pathname])
  
  
  return (
    <GlobalContext.Provider value={{ darkTheme, setDarkTheme, setLoginForm, isMobile, isPhone, scrollbar }}>
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
)
