import Footer from "../globals/Footer";
import styled from "styled-components";
import TariffCard from "../globals/TariffCard";
import duck from "../assets/images/duck.png";
import star from "../assets/images/star.png";
import Tariffs from "../components/Tariffs";

const SiteHeader = styled.h1`
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
    font-size: 1.5%;
    font-weight: 500;
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
                    <Tariffs />
                </div>   
                <div>
                    <SubTitle>Для планшетов и модемов</SubTitle>
                    <Tariffs>
                        <TariffCard scrolling="true" title="Базовый" background="linear-gradient(135deg, #4B74FC 0%, #3039FF 100%)" icon={duck} />
                        <TariffCard scrolling="true" title="Яркий" background="linear-gradient(135deg, #4B5AFD 0%, #4B38FE 100%)" hit icon={star} />
                    </Tariffs>
                </div>
            </Div>
            <Footer />
        </>
    )
}
