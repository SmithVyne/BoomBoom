import Footer from "../globals/Footer";
import styled from "styled-components";
import TariffCard from "../globals/TariffCard";
import duck from "../assets/images/duck.png";
import star from "../assets/images/star.png";
import goblet from "../assets/images/goblet.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLayoutEffect, useRef, useState } from "react";

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
const Offers = styled.div`
    position: relative;
    & div.scroller {
        height: fit-content;
        width: 100%;
        overflow-x: scroll;
        ::-webkit-scrollbar {
            width: 0px;
        }
    }
`
const Tariffs = styled.div`
    display: flex;
    width: max-content;
    gap: 40px;
`;

const WrapCtrls = styled.span`
    position: absolute;
    display: flex;
    width: calc(100% + 100px);
    margin-left: -50px;
    z-index: 100;
    top: calc(50% + 20px);
`;

const Ctrl = styled.span`
    position: sticky;
    left: 0;
    color: #0E5EF8;
    background-color: #fff;
    box-shadow: 0px 0px 14px 0px #0101011F;
    border-radius: 100%;
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const handleScroll = ({current}, type) => {
    const {scrollLeft} = current;
    switch(type) {
        case "back":
            current.scroll({left: scrollLeft - 500,  behavior: 'smooth'});
            break;
        default:
            current.scroll({left: scrollLeft + 500,  behavior: 'smooth'});
    }
}

export default function TariffPage() {
    const ref1 = useRef();
    const ref2 = useRef();
    const [showScroll, setShowScroll] = useState(false);
    useLayoutEffect(() => {
        const {current} = ref2;
        setShowScroll(current.scrollWidth > current.offsetWidth)
    }, [setShowScroll])
    return (
        <>
            <Div>
                <SiteHeader>Тарифы boom telecom</SiteHeader>
                <Offers>
                    <SubTitle>Для смартфонов для планшетов</SubTitle>
                    <WrapCtrls>
                        <Ctrl onClick={() => handleScroll(ref1, "back")}><IoIosArrowBack strokeLinecap="square" size={26} /></Ctrl>
                        <Ctrl onClick={() => handleScroll(ref1)} style={{left: "100%"}}><IoIosArrowForward strokeLinecap="square" size={26} /></Ctrl>
                    </WrapCtrls>
                    <div ref={ref1} className="scroller">
                        <Tariffs>
                                <TariffCard scrolling="true" title="Базовый" background="linear-gradient(135deg, #4B74FC 0%, #3039FF 100%)" icon={duck} />
                                <TariffCard scrolling="true" title="Яркий" background="linear-gradient(135deg, #4B5AFD 0%, #4B38FE 100%)" hit icon={star} />
                                <TariffCard scrolling="true" title="Расширенный" background="linear-gradient(135deg, #4B40FE 0%, #4B1EFF 100%);" icon={goblet} />
                                <TariffCard scrolling="true" title="Бизнес" background="radial-gradient(ellipse at center, #324E69 0%, #242424 100%)" icon={star} />
                                <TariffCard scrolling="true" title="VIP" background="radial-gradient(ellipse at center, #D79532 0%, #E1B470 50%, #1B240A 100%)" icon={goblet} />
                        </Tariffs>
                    </div>
                </Offers>   
                <Offers>
                    <SubTitle>Для планшетов и модемов</SubTitle>
                    {showScroll &&
                    <WrapCtrls>
                        <Ctrl onClick={() => handleScroll(ref2, "back")}><IoIosArrowBack strokeLinecap="square" size={26} /></Ctrl>
                        <Ctrl onClick={() => handleScroll(ref2)} style={{left: "100%"}}><IoIosArrowForward strokeLinecap="square" size={26} /></Ctrl>
                    </WrapCtrls>}
                    <div ref={ref2} className="scroller">
                        <Tariffs>
                            <TariffCard scrolling="true" title="Базовый" background="linear-gradient(135deg, #4B74FC 0%, #3039FF 100%)" icon={duck} />
                            <TariffCard scrolling="true" title="Яркий" background="linear-gradient(135deg, #4B5AFD 0%, #4B38FE 100%)" hit icon={star} />
                        </Tariffs>
                    </div>
                </Offers>
            </Div>
            <Footer />
        </>
    )
}
