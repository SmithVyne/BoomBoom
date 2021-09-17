import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../App";
import logo1 from '../assets/images/logo1.svg'
import logo2 from '../assets/images/logo2.svg'
import ThemeSwitch from "../components/ThemeSwitch";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const NavItem = styled(Link)`
    text-transform: lowercase;
    color: ${props => props.theme.textColor};
    font-size: 20px;
    text-decoration: none;
`;

const DashboardBtn = styled(Link)`
    font-size: 37px;
    background-color: #4B75FC;
    border-radius: 34px;
    border: none;
    outline: none;
    padding: 0 24px;
    color: #fff;
    cursor: pointer;
    font-weight: 500;
    height: 68px;
    display: flex;
    transition: 0.3s;
    @media (max-width: 900px) {
        font-size: 17px;
        height: 52px;
        align-items: center;
    }
    &:hover {
        color: #fff;
        transform: scale(1.02);
        transition: 0.2s;
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
    return (
        <nav>
            <Link to="/"><img alt="logo" className="logo" src={darkTheme ? logo1 : logo2} /></Link>
            <div className="menu">
                <NavItem to="/">о нас</NavItem>
                <NavItem to="/services">услуги</NavItem>
                <NavItem to="/tariffs">ТАРИФЫ</NavItem>
                <NavItem to="/numbers">НОМЕРА</NavItem>
                <NavItem to="/organisation">ОРГАНИЗАЦИЯМ</NavItem>
                <NavItem to="/roaming">роуминг</NavItem>
            </div>
            <div className="nav-right">
                <ThemeSwitch />
                <DashboardBtn to={logged_in ? "/" : ""} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</DashboardBtn>
            </div>
        </nav>
    )
}
