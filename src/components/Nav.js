import { useContext } from "react";
import styled from "styled-components";
import { themeContext } from "../App";
import logo1 from '../assets/images/logo1.svg'
import logo2 from '../assets/images/logo2.svg'
import ThemeSwitch from "./ThemeSwitch";
import { Link } from "react-router-dom";

const NavItem = styled(Link)`
    text-transform: lowercase;
    color: ${props => props.theme.textColor};
    font-size: 20px;
    text-decoration: none;
`;

export default function Nav() {
    const {darkTheme} = useContext(themeContext)
    return (
        <nav>
            <img alt="logo" className="logo" src={darkTheme ? logo1 : logo2} />
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
                <button>личный кабинет</button>
            </div>
        </nav>
    )
}
