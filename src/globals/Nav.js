import { useContext, useEffect, useState } from "react";
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

const Wrappper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.textColor};
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
        margin-right: 105px;
        @media(max-width: 1100px) {
            margin-right: auto;
        }
        @media(max-width: 500px) {
            display: none;
        }
        /* img {
            height: 36px;
        } */
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

const NavItem = styled(Link)`
    text-transform: lowercase;
    color: inherit;
    font-size: 20px;
    text-decoration: none;
`;

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
    @media (max-width: 1100px) {
        margin-right: 35px;
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
    const {darkTheme, setLoginForm, userSession, setUserSession} = useContext(GlobalContext);
    const {pathname} = useLocation();
    const logged_in = pathname === "/dashboard" && userSession;
    const handleButton = () => {
        if(logged_in) setUserSession(null)
        else setLoginForm(true)
    }
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    useEffect(() => {
        window.innerWidth < 1100 && setIsMobile(true);
    }, [])
    return (
        <Wrappper>
            <Link className="logo" to="/"><img alt="logo" src={darkTheme ? logo1 : logo2} /></Link>
            <div className="menu">
                <NavItem to="/tariffs">ТАРИФЫ</NavItem>
                <NavItem to="/numbers">НОМЕРА</NavItem>
                <NavItem to="/services">услуги</NavItem>
                <NavItem to="/organisation">ОРГАНИЗАЦИЯМ</NavItem>
                <NavItem to="/поддержка">роуминг</NavItem>
            </div>
            <span id="helpCenter">отдел продаж <a href="tel:84951352404">8 495 135 24 04</a>  ежедневно с 9 до 21</span>
            <div className="nav-right">
                {isMobile || <ThemeSwitch />}
                <DashboardBtn to={logged_in ? "/" : ""} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</DashboardBtn>
            </div>
            <MenuBtn onClick={() => setShowMobileNav(true)} src={darkTheme ? burgerMenuWhite : burgerMenu} />
            <AnimatePresence>
                {showMobileNav && <MobileNav setShowMobileNav={setShowMobileNav} />}
            </AnimatePresence>
        </Wrappper>
    )
}
