import sunshine from "../assets/images/sunshine.svg";
import moonshine from "../assets/images/moonshine.svg";
import { themeContext } from "../App";
import { useContext } from "react";
import styled from "styled-components";

const Switch = styled.span`
    display: flex;
    width: 136px;
    height: 68px;
    border-radius: 34px;
    background: ${props => props.theme.textColor};
    transition: 0.5s;
    cursor: pointer;
    align-items: center;
    border: none;
`

const Flick = styled.img`
    width: 69px;
    height: 69px;
    border-radius: 50%;
    padding: 13px;
    transition: 0.5s;
    transform: ${props => props.darkTheme && "translateX(68px)"};
    background: ${props => props.theme.background};
`

export default function ThemeSwitch() {
    const {darkTheme, setDarkTheme} = useContext(themeContext);

    return (
        <Switch onClick={() =>setDarkTheme(dark => !dark)}>
            <Flick darkTheme={darkTheme} src={darkTheme ? moonshine : sunshine} />
        </Switch>
    )
}
