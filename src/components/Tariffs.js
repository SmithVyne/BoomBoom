import React, { useContext } from 'react';
import { themeContext } from '../App';
import styled from "styled-components";
import TariffCard from '../globals/TariffCard';
import duck from "../assets/images/duck.png";
import star from "../assets/images/star.png";
import goblet from "../assets/images/goblet.png";

const Offers = styled.div`
    width: 100%;
    height: 812px;
    border-radius: 44px;
    background: ${({darkTheme, theme}) => darkTheme ? theme.background : "#fff"};
    padding: 40px 60px;
    height: max-content;
    font-size: 100vw;
    @media(max-width: 700px) {
        padding: 20px 10px;
        border-radius: 28px;
    }

    @media(max-width: 350px) {
        padding: 20px 0;
    }
`;

const Para1 = styled.p`
    color: ${({theme}) => theme.textColor};
    font-size: 2.2%;
    font-weight: bold;
    line-height: 90%;
    @media(max-width: 1000px) {
        font-size: 6%;
    }
    @media(max-width: 350px) {
        padding-left: 10px;
    }
`;
const Select = styled.p`
    color: ${({theme}) => theme.textColor};
    border: 1px solid #4B6CFD;
    padding: 12px 16px;
    border-radius: 22px;
    cursor: pointer;
    font-size: 20px;
    @media(max-width: 1000px) {
        font-size: 12px;
        border-radius: 18px;
    }
`;
const Para2 = styled.div`
    display: flex;
    flex-direction: column;
`;

const Sectitle = styled.p`
    color: ${({theme}) => theme.textColor};
    line-height: 90%;
    font-weight: 400;
    font-size: 2.2%;
    margin: 0;
    margin-bottom: 40px;
    @media(max-width: 1000px) {
        font-size: 6%;
    }
    @media(max-width: 350px) {
        padding-left: 10px;
    }
`;

const SecDetails = styled.span`
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.04)"};
    color: ${({theme}) => theme.textColor};
    width: fit-content;
    border-radius: 15px;
    padding: 5px 10px;
    font-weight: 700;
    margin-bottom: 20px;
    font-size: initial;
    @media(max-width: 350px) {
        margin-left: 10px;
        margin-right: 10px;
    }
`;

export default function Tariffs() {
    const {darkTheme} = useContext(themeContext);
    return (
        <>
            <Offers darkTheme={darkTheme}>
                <div>
                    <Para1>Платите только <br/> за необходимое</Para1>  
                    <div className="tariffTypeSwitch">
                        <Select style={{background: "#4B6CFD", color: "#fff"}}>Тарифы для смартфонов</Select>
                        <Select>Тарифы для планшетов и модемов</Select>
                    </div>
                </div>
                <div className="tariffDivider">
                    <TariffCard title="Базовый" background="linear-gradient(135deg, #4B74FC 0%, #3039FF 100%)" icon={duck} />
                    <TariffCard title="Яркий" background="linear-gradient(135deg, #4B5AFD 0%, #4B38FE 100%)" hit icon={star} />
                    <TariffCard title="Расширенный" background="linear-gradient(135deg, #4B40FE 0%, #4B1EFF 100%);" icon={goblet} />
                </div>
            </Offers>
            <Offers darkTheme={darkTheme}>
                <div className="tariffDivider">
                    <Para2>
                        <Sectitle>Переходите на новый <br/> уровень обслуживания <br/> с премиум тарифами</Sectitle>
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
