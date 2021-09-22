import React, { useState } from 'react';
import styled from 'styled-components';
import cool from "../assets/images/cool.png";

const Tinyswitch = styled.span`
    display: flex;
    transition: 0.5s;
    cursor: pointer;
    align-items: center;
    position: relative;
    width: 46px;
    height: 23px;
    padding: 2px;
    border-radius: 11.33px;
    background: ${({checked}) => checked ? "#fff" : "transparent"};
    border: 1px solid #fff;
    box-sizing: border-box;
`

const Flick = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({checked}) => checked ? "linear-gradient(135deg, rgb(255,186,106) 0%, rgb(235,0,255) 100%)" : "#fff"};
    transform: ${({checked}) => checked && "translateX(20px)"};
    z-index: 2;
    transition: 0.2s;
`
const SwitchBg = styled.img`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    position: absolute;
    padding: 3px;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
`

export default function TinySwitch({check}) {
    const [checked, setChecked] = useState(check)
    return (
        <Tinyswitch onClick={()=>setChecked(checked => !checked)} checked={checked}>
            <SwitchBg src={cool} />
            <Flick checked={checked} />
        </Tinyswitch>
    )
}
