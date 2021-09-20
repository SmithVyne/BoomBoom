import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../App";
import logo1 from '../assets/images/logo1.svg'
import logo2 from '../assets/images/logo2.svg'
import ThemeSwitch from "../components/ThemeSwitch";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Wrappper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.textColor};
    &  .logo {
        margin-right: 105px;
    }
    & span#helpCenter {
        position: absolute;
        top: 15px;
        right: 80px;
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
    line-height: 0px;
    @media (max-width: 900px) {
        font-size: 17px;
    }
    &:hover {
        color: #fff;
        transform: scale(1.03);
        transition: ease 0.2s;
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
        <Wrappper>
            <Link to="/"><img alt="logo" className="logo" src={darkTheme ? logo1 : logo2} /></Link>
            <div className="menu">
                <NavItem to="/tariffs">ТАРИФЫ</NavItem>
                <NavItem to="/numbers">НОМЕРА</NavItem>
                <NavItem to="/services">услуги</NavItem>
                <NavItem to="/organisation">ОРГАНИЗАЦИЯМ</NavItem>
                <NavItem to="/поддержка">роуминг</NavItem>
            </div>
            <span id="helpCenter">отдел продаж <a href="tel:84951352404">8 495 135 24 04</a>  ежедневно с 9 до 21</span>
            <div className="nav-right">
                <ThemeSwitch />
                <DashboardBtn to={logged_in ? "/" : ""} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</DashboardBtn>
            </div>
        </Wrappper>
    )
}
