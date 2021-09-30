import Footer from "../globals/Footer/Footer";
import styled from "styled-components";
import TariffCard from "../globals/TariffCard";
import Tariffs from "../components/Tariffs";
import duck from "../assets/images/duck.png";
import light from "../assets/images/light.png";
import star from "../assets/images/star.png";
import jula from "../assets/images/jula.png";
import goblet from "../assets/images/goblet.png";
import { tariffAdvanced, tariffBase, tariffBiz, tariffBright, tariffVip } from "../globals/utils";

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
export default function TariffPage() {
    return (
        <>
            <Div>
                <SiteHeader>Тарифы boom telecom</SiteHeader>
                <div>
                    <SubTitle>Для смартфонов для планшетов</SubTitle>
                    <Tariffs>
                        <TariffCard tariff={tariffBase} scrolling="true" title="Базовый" background="linear-gradient(99.98deg, #4B74FC 0%, #3039FF 98.9%)" icon={duck} />
                        <TariffCard tariff={tariffBright} scrolling="true" title="Яркий" background="linear-gradient(99.98deg, #4B74FC 0%, #3039FF 98.9%)" hit icon={light} />
                        <TariffCard tariff={tariffAdvanced} scrolling="true" title="Расширенный" background="linear-gradient(99.98deg, #4B74FC 0%, #3039FF 98.9%)" icon={jula} />
                        <TariffCard tariff={tariffBiz} scrolling="true" title="Бизнес" background="radial-gradient(ellipse at center, #324E69 0%, #242424 100%)" icon={star} />
                        <TariffCard tariff={tariffVip} scrolling="true" title="VIP" background="radial-gradient(ellipse at center, #D79532 0%, #E1B470 50%, #1B240A 100%)" icon={goblet} />
                    </Tariffs>
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
