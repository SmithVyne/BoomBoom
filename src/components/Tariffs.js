import React, { useContext } from 'react';
import { themeContext } from '../App';
import styled from "styled-components";
import TariffCard from './TariffCard';

const Offers = styled.div`
    width: 100%;
    height: 812px;
    border-radius: 44px;
    background: ${({darkTheme, theme}) => darkTheme ? theme.background : "#fff"};
    padding: 40px 60px;
`;

const Para1 = styled.p`
    color: ${({theme}) => theme.textColor};
    font-weight: bold;
    width: 350px;
    font-size: 40px;
    margin: 0;
`
const Select = styled.p`
    border: 1px solid #4B6CFD;
    color: ${({theme}) => theme.textColor};
    padding: 12px 16px;
    border-radius: 22px;
    margin: 20px 0 32px 0;
    cursor: pointer;
`


export default function Tariffs() {
    const {darkTheme} = useContext(themeContext);
    return (
        <>
        <Offers darkTheme={darkTheme}>
            <offerHeading>
                <Para1>Платите только за необходимое</Para1>  
                <div className="tariffTypeSwitch">
                    <Select style={{background: "#4B6CFD", color: "#fff"}}>Тарифы для смартфонов</Select>
                    <Select>Тарифы для планшетов и модемов</Select>
                </div>
            </offerHeading>
            <div className="tariffDivider">
                <TariffCard background="#121212" />
                <TariffCard background="#121212" />
                <TariffCard background="#121212" />
            </div>
        </Offers>
        <Offers style={{height: "fit-content"}} darkTheme={darkTheme}>
            
        </Offers>
        </>
    )
}
