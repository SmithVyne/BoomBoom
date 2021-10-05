import Footer from "../globals/Footer/Footer";
import styled from "styled-components/macro";
import TariffCard from "../globals/TariffCard";
import Tariffs from "../components/Tariffs";
import {  tariffBase,  tariffBright, tariffTypesArray} from "../globals/utils";
import { DefaultTariffs } from "./Main";

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
                        {tariffTypesArray.map(tariff => <TariffCard tariff={tariff} />)}
                    </Tariffs>
                </div>
                <div>
                    <SubTitle>Для планшетов и модемов</SubTitle>
                    <Tariffs>
                        {tariffTypesArray.slice(0, 2).map(tariff => <TariffCard tariff={tariff} />)}
                    </Tariffs>
                </div>
            </Div>
            <Footer />
        </>
    )
}
