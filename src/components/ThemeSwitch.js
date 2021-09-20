import sunshine from "../assets/images/sunshine.svg";
import moonshine from "../assets/images/moonshine.svg";
import darksun from "../assets/images/darksun.svg";
import darkmoon from "../assets/images/darkmoon.svg";
import { GlobalContext } from "../App";
import { useContext } from "react";
import styled from "styled-components";

export const Switch = styled.span`
    display: flex;
    width: 104px;
    height: 52px;
    border-radius: 26px;
    background: ${props => props.theme.textColor};
    transition: 0.5s;
    cursor: pointer;
    align-items: center;
    border: none;
    position: relative;
`

const Flick = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 50%;
    padding: 13px;
    transition: 0.5s;
    transform: ${props => props.darkTheme && "translateX(52px)"};
    background: ${props => props.theme.background};
    z-index: 2;
`

const SwitchBackground = styled.img`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    padding: 13px;
    position: absolute;
    top: 0;
    bottom: 0;
    ${({type})=>type} : 0px;
    z-index: 1;
`

export default function ThemeSwitch() {
    const {darkTheme, setDarkTheme} = useContext(GlobalContext);
    return (
        <Switch onClick={() =>setDarkTheme(dark => !dark)}>
            <SwitchBackground type={"left"} src={darksun} />
            <SwitchBackground type={"right"} src={darkmoon} />
            <Flick darkTheme={darkTheme} src={darkTheme ? moonshine : sunshine} />
        </Switch>
    )
}
