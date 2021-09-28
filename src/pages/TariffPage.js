import Footer from "../globals/Footer/Footer";
import styled from "styled-components";
import TariffCard from "../globals/TariffCard";
import duck from "../assets/images/duck.png";
import light from "../assets/images/light.png";
import Tariffs from "../components/Tariffs";

const SiteHeader = styled.h1`
color: ${props => props.theme.textColor};
font-family: Circe, Arial, sans-serif;
    font-size: 3%;
    font-weight: bold;
    line-height: 100%;
    color: inherit;
    margin: 0;
    margin-top: 30px;
    @media(max-width: 1000px) {
        font-size: 8%;
    }
`
const SubTitle = styled.p`
color: ${props => props.theme.textColor};
font-family: Circe, Arial, sans-serif;
font-style: normal;
font-weight: bold;
opacity: 0.68;
    font-size: 1.5%;
    margin: 0;
    margin-bottom: 20px;
    @media(max-width: 1000px) {
        font-size: 4%;
    }
    @media(max-width: 450px) {
        font-size: 5.5%;
    }
`
const Div = styled.div`
    font-size: 100vw;
    display: flex;
    flex-direction: column;
    gap: 35px;
    @media(max-width: 1000px) {
        gap: 25px;
    }
`
const tariffBase = {
    tariffName: 'Базовый',
    position: [{
        min: 500,
        gb: 10,
        sms: 100,
    }, {
        min: 400,
        gb: 20,
        sms: 100,
    }, {
        min: 300,
        gb: 30,
        sms: 100,
    }, {
        min: 200,
        gb: 40,
        sms: 100,
    }],
    price: 350,
}
const tariffBright = {
    tariffName: 'Яркий',
    position: [{
        min: 1000,
        gb: 25,
        sms: 500,
    }, {
        min: 900,
        gb: 35,
        sms: 500,
    }, {
        min: 800,
        gb: 45,
        sms: 500,
    }, {
        min: 700,
        gb: 55,
        sms: 500,
    }],
    price: 500,
}

export default function TariffPage() {
    return (
        <>
            <Div>
                <SiteHeader>Тарифы boom telecom</SiteHeader>
                <div>
                    <SubTitle>Для смартфонов для планшетов</SubTitle>
                    <Tariffs />
                </div>
                <div>
                    <SubTitle>Для планшетов и модемов</SubTitle>
                    <Tariffs>
                        <TariffCard tariff={tariffBase} scrolling="true" title="Базовый" background="linear-gradient(135deg, #4B74FC 0%, #3039FF 100%)" icon={duck} />
                        <TariffCard tariff={tariffBright} scrolling="true" title="Яркий" background="linear-gradient(135deg, #4B5AFD 0%, #4B38FE 100%)" hit icon={light} />
                    </Tariffs>
                </div>
            </Div>
            <Footer />
        </>
    )
}
