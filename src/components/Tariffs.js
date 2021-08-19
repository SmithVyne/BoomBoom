import React, { useContext } from 'react';
import { themeContext } from '../App';
import styled from "styled-components";
import TariffCard from './TariffCard';
import duck from "../assets/images/duck.png";
import star from "../assets/images/star.png";
import goblet from "../assets/images/goblet.png";

const Offers = styled.div`
    width: 100%;
    height: 812px;
    border-radius: 44px;
    background: ${({darkTheme, theme}) => darkTheme ? theme.background : "#fff"};
    padding: 40px 60px;
    height: fit-content;
`;

const Para1 = styled.p`
    color: ${({theme}) => theme.textColor};
    font-weight: bold;
    width: 350px;
    font-size: 40px;
    margin: 0;
`;
const Select = styled.p`
    border: 1px solid #4B6CFD;
    color: ${({theme}) => theme.textColor};
    padding: 12px 16px;
    border-radius: 22px;
    margin: 20px 0 32px 0;
    cursor: pointer;
`;
const Para2 = styled.div`
    display: flex;
    flex-direction: column;
`;

const Sectitle = styled.p`
    font-size: 40px;
    font-weight: 400;
    line-height: 40px;
    margin: 0;
    margin-bottom: 31px;
    color: ${({theme}) => theme.textColor}
`;

const SecDetails = styled.span`
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.04)"};
    color: ${({theme}) => theme.textColor};
    width: fit-content;
    border-radius: 15px;
    padding: 5px 10px;
    font-weight: 700;
    margin-bottom: 20px;
`;

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
                    <TariffCard title="Базовый" background="linear-gradient(135deg, #4B74FC 0%, #3039FF 100%)" icon={duck} />
                    <TariffCard title="Яркий" background="linear-gradient(135deg, #4B5AFD 0%, #4B38FE 100%)" hit icon={star} />
                    <TariffCard title="Расширенный" background="linear-gradient(135deg, #4B40FE 0%, #4B1EFF 100%);" icon={goblet} />
                </div>
            </Offers>
            <Offers darkTheme={darkTheme}>
                <div className="tariffDivider">
                    <Para2>
                        <Sectitle>Переходите на новый уровень обслуживания с премиум тарифами</Sectitle>
                        <SecDetails darkTheme={darkTheme}>премиум обслуживание</SecDetails>
                        <SecDetails darkTheme={darkTheme}>выделенная линия поддержки</SecDetails>
                        <SecDetails darkTheme={darkTheme}>классный дизайн личного кабинета</SecDetails>
                        <SecDetails darkTheme={darkTheme}>1 месяц в подарок при оплате на год</SecDetails>
                        <SecDetails darkTheme={darkTheme}>Личный секретарь</SecDetails>
                    </Para2>
                    <TariffCard title="Бизнес" background="radial-gradient(ellipse at center, #324E69 0%, #242424 100%)" icon={star} />
                    <TariffCard title="VIP" background="radial-gradient(ellipse at center, #D79532 0%, #E1B470 50%, #1B240A 100%)" icon={goblet} />
                </div>
            </Offers>
        </>
    )
}
