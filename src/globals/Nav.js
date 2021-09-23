import { useContext, useState } from "react";
import styled from "styled-components";
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
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        justify-content: flex-end;
    }
    @media (max-width: 1100px) {
        justify-content: flex-start;
        & .menu {
            display: none;
        }
    }
    @media(max-width: 500px) {
        justify-content: space-between;
    }
    &  .logo {
        margin-right: 50px;
        @media(max-width: 1100px) {
            margin-right: auto;
        }
        @media(max-width: 500px) {
            display: none;
        }
    }
    & span#helpCenter {
        position: absolute;
        top: 15px;
        right: 80px;
        @media (max-width: 1100px) {
            display: none;
        }
        a {
            text-decoration: underline;
            color: inherit;
            margin: 0 2px;
            font-weight: 500;
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
    border: none;
    padding: 0 24px 5px;
    cursor: pointer;
    width: max-content;
    @media(max-width: 1100px) {
        margin-right: 35px;
    }
    @media(max-width: 500px) {
        margin-right: 0px;
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
    @media (max-width: 1100px) {
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
            <span id="helpCenter">отдел продаж <a href="tel:84951352404">8 495 135 24 04</a>  ежедневно с 9 до 21</span>
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
