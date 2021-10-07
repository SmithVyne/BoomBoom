import { useContext, useState } from "react";
import styled from "styled-components/macro";
import { GlobalContext } from "../App";
import logo1 from '../assets/images/logo1.svg'
import logo2 from '../assets/images/logo2.svg'
import burgerMenu from '../assets/images/burgerMenu.png'
import burgerMenuWhite from '../assets/images/burgerMenuWhite.png'
import ThemeSwitch from "../components/ThemeSwitch";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MobileNav from "../components/MobileNav";
import Menu from "../components/Menu";

const Wrappper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.textColor};
    & .menu {
        display: flex;
        flex-wrap: wrap;
        gap: 35px;
        margin-right: auto;
    }
    & .nav-right {
        margin: 14px 0 0;
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        justify-content: flex-end;
    }
    @media (max-width: 1325px) {
        justify-content: flex-start;
        & .menu {
            display: none;
        }
    }
    @media(max-width: 500px) {
        justify-content: space-between;
    }
    &  .logo {
        display: flex;
        align-items: center;
        margin: 0;
        margin-right: 106px;
        @media(max-width: 1500px) {
            margin-right: 61px;
        }
        @media(max-width: 1325px) {
            margin-right: auto;
        }
        &  img {
            height: 84px;
            width: 187px;
            @media (max-width: 1400px) {
                height: 60px;
                width: 134px;
            }
        }
    }
    & #helpCenter {
        position: absolute;
        top: 15px;
        right: 80px;
        text-decoration: underline;
        color: inherit;
        font-weight: 500;
        font-size: 26px;
        @media (max-width: 1500px) {
            right: 40px;
            font-size: 22px;
        }
        @media (max-width: 720px) {
            top: 0px;
            right: 5vw;
        }
        @media (max-width: 500px) {
            top: 5px;
            font-size: 13px;
        }
    }
    
`

const DashboardBtn = styled(Link)`
    font-size: 24px;
    background-color: #4B75FC;
    color: #fff;
    font-weight: 500;
    height: 52px;

    border-radius: 26px;
    display: flex;
    align-items: center;
    text-align: center;   
    border: none;
    padding: 0 24px 5px;
    cursor: pointer;
    width: max-content;
    @media(max-width: 1325px) {
        margin-right: 35px;
        font-size: 20px;
    }
    @media(max-width: 500px) {
        margin-right: 0px;
        width: fit-content;
        flex-wrap: wrap;
        font-size: 16px;
    }
    @media(max-width: 400px) {
        padding: 0 10px 5px;
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        width: 88px;
    }
    &:hover {
        color: #fff;
        transform: scale(1.03);
        transition: ease 0.2s;
    }
`;
const MenuBtn = styled.img`
    cursor: pointer;
    display: none;
    @media (max-width: 1325px) {
        display: block;
    }
`;

export default function Nav() {
    const {darkTheme, setLoginForm, userSession, setUserSession, isMobile} = useContext(GlobalContext);
    const {pathname} = useLocation();
    const logged_in = pathname === "/dashboard" && userSession;
    const handleButton = () => {
        if(logged_in) setUserSession(null)
        else setLoginForm(true)
    }
    const [showMobileNav, setShowMobileNav] = useState(false);
    return (
        <Wrappper>
            <Link className="logo" to="/"><img alt="logo" src={darkTheme ? logo1 : logo2} /></Link>
            <div className="menu">
                <Menu />
            </div>
            <a id="helpCenter" href="tel:+7 495 795 95 66">+7 495 795 95 66</a>
            <div className="nav-right">
                {isMobile || <ThemeSwitch />}
                <DashboardBtn to={logged_in ? "/" : pathname} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</DashboardBtn>
            </div>
            <MenuBtn onClick={() => setShowMobileNav(true)} src={darkTheme ? burgerMenuWhite : burgerMenu} />
            <AnimatePresence>
                {showMobileNav && <MobileNav setShowMobileNav={setShowMobileNav} />}
            </AnimatePresence>
        </Wrappper>
    )
}
