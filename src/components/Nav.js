import { useContext } from "react";
import styled from "styled-components";
import { themeContext } from "../App";
import logo1 from '../assets/images/logo1.svg'
import logo2 from '../assets/images/logo2.svg'
import ThemeSwitch from "./ThemeSwitch";

const NavItem = styled.a`
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
                <NavItem href="#">о нас</NavItem>
                <NavItem href="#">услуги</NavItem>
                <NavItem href="#">ТАРИФЫ</NavItem>
                <NavItem href="#">НОМЕРА</NavItem>
                <NavItem href="#">ОРГАНИЗАЦИЯМ</NavItem>
                <NavItem href="#">роуминг</NavItem>
            </div>
            <div className="nav-right">
                <ThemeSwitch />
                <button>личный кабинет</button>
            </div>
        </nav>
    )
}
