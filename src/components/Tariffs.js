import { useLayoutEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import duck from "../assets/images/duck.png";
import light from "../assets/images/light.png";
import star from "../assets/images/star.png";
import jula from "../assets/images/jula.png";
import goblet from "../assets/images/goblet.png";
import TariffCard from "../globals/TariffCard";
import { useContext } from "react";
import { GlobalContext } from "../App";

const tariffBase = {
    tariffName: 'Базовый',
    position: [{
        min: 500,
        gb: 10,
        sms: 100,
    },{
        min: 400,
        gb: 20,
        sms: 100,
    },{
        min: 300,
        gb: 30,
        sms: 100,
    },{
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
    },{
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
const tariffAdvanced = {
    tariffName: 'Расширенный',
    position: [{
        min: 2000,
        gb: 35,
        sms: 1000,
    },{
        min: 1800,
        gb: 45,
        sms: 1000,
    },{
        min: 1600,
        gb: 75,
        sms: 1000,
    },{
        min: 1400,
        gb: 95,
        sms: 1000,
    }],
    price: 800,
}
const tariffBiz = {
    tariffName: 'Бизнес',
    position: [{
        min: 4000,
        gb: 50,
        sms: 1000,
    },{
        min: 3800,
        gb: 70,
        sms: 1000,
    },{
        min: 3600,
        gb: 90,
        sms: 1000,
    },{
        min: 3400,
        gb: 110,
        sms: 1000,
    }],
    price: 1000,
}
const tariffVip = {
    tariffName: 'VIP',
    position: [{
        min: 7000,
        gb: 100,
        sms: 1000,
    },{
        min: 6800,
        gb: 120,
        sms: 1000,
    },{
        min: 6600,
        gb: 140,
        sms: 1000,
    },{
        min: 6400,
        gb: 160,
        sms: 1000,
    }],
    price: 1500,
}


const WrapScroller  = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`
const Scroller = styled.div`
    height: fit-content;
    width: 100%;
    overflow-x: scroll;
    ::-webkit-scrollbar {
        width: 0px;
    }
`

const WrapTariffs = styled.div`
    display: flex;
    width: max-content;
    gap: 40px;
`;

const WrapCtrl = styled.span`
    position: absolute;
    z-index: 4;
    top: calc(50% - 22px);
    margin-left: calc(100% + 6px);
    @media(max-width: 720px) {
        margin-left: calc(100% - calc(44px - 5vw));
    }
`;

const Ctrl = styled.span`
    position: sticky;
    position: absolute;
    z-index: 4;
    top: calc(50% - 22px);
    margin-left: calc(100% + 6px);
    @media(max-width: 720px) {
        margin-left: calc(100% - calc(44px - 5vw));
    }
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
    z-index: 4;
`

const Tracker = styled.div`
    position: absolute;
    top: calc(100% + 10px);
    left: calc(50% - 46px);
    width: 92px;
    height: 6px;
    background: ${({darkTheme})=> darkTheme ? "rgba(255, 255, 255, 0.24)" : "#D6D6D6"};
    border-radius: 6px;
    & div {
        height: 6px;
        width: 50%;
        background: #0E5EF8;
        border-radius: inherit;
        margin-left: ${({percentage})=>percentage + "%"};
    }
    @media(max-width: 721px){
        display: none;
    }
`


export default function Tariffs({children}) {
    const ref = useRef();
    const {darkTheme} = useContext(GlobalContext);
    const [showScroll, setShowScroll] = useState(false);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [offsetWidth, setOffSetWidth] = useState(1);
    const [tarrifPosition, setTarrifPosition] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(2);
    const percentage = (scrollLeft/(scrollWidth-offsetWidth)) * 50;

    useLayoutEffect(() => {
        const {current} = ref;
        setShowScroll(current.scrollWidth > current.offsetWidth);
        setOffSetWidth(current.offsetWidth);
        setScrollWidth(current.scrollWidth);
        current.addEventListener("scroll", () => {
            setScrollLeft(current.scrollLeft);
        })
    }, [])

    const handleScroll = (type) => {
        const {current} =  ref;
        console.log(tarrifPosition)
        const {scrollLeft} = current;
        let pixels 
        if (tarrifPosition === 0){
            pixels = 550
        } else if (tarrifPosition === 1){
            pixels = 650
        }
        else if (tarrifPosition === 2){
            pixels = 700
        }
        else if (tarrifPosition === 3){
            pixels = 700
        }
        else if (tarrifPosition === 4){
            pixels = 680
        }
        else if (tarrifPosition === 5){
            pixels = 700
        }
        switch(type) {
            case "back":
                current.scroll({left: scrollLeft - pixels,  behavior: 'smooth'});
                if (tarrifPosition > 0){
                    setTarrifPosition(tarrifPosition - 1)
                }
                break;
            default:
                current.scroll({left: scrollLeft + pixels,  behavior: 'smooth'});
                if (tarrifPosition < 5){
                    setTarrifPosition(tarrifPosition + 1)
                }
        }
    }
    return (
            <WrapScroller>
                {  window.innerWidth >= 721 && showScroll &&
                    <>
                        <Ctrl onClick={() => handleScroll("back")} style={{marginLeft: "-50px", marginRight: "6px"}} >
                            <IoIosArrowBack strokeLinecap="square" size={26} />
                        </Ctrl>
                        <WrapCtrl>
                            <Ctrl onClick={() => handleScroll()} ><IoIosArrowForward strokeLinecap="square" size={26} /></Ctrl>
                        </WrapCtrl>
                    </>
                }
                <Scroller ref={ref} className="scroller">
                    <WrapTariffs>
                        {children ? children : (
                            <>
                                <TariffCard tariff={tariffBase} scrolling="true" title="Базовый" background="linear-gradient(99.98deg, #4B74FC 0%, #3039FF 98.9%)" icon={duck} />
                                <TariffCard tariff={tariffBright} scrolling="true" title="Яркий" background="linear-gradient(99.98deg, #4B74FC 0%, #3039FF 98.9%)" hit icon={light} />
                                <TariffCard tariff={tariffAdvanced} scrolling="true" title="Расширенный" background="linear-gradient(99.98deg, #4B74FC 0%, #3039FF 98.9%)" icon={jula} />
                                <TariffCard tariff={tariffBiz} scrolling="true" title="Бизнес" background="radial-gradient(ellipse at center, #324E69 0%, #242424 100%)" icon={star} />
                                <TariffCard tariff={tariffVip} scrolling="true" title="VIP" background="radial-gradient(ellipse at center, #D79532 0%, #E1B470 50%, #1B240A 100%)" icon={goblet} />
                            </>
                        )}
                    </WrapTariffs>
                </Scroller>
                { showScroll && <Tracker darkTheme={darkTheme} percentage={percentage}><div></div></Tracker> }
            </WrapScroller>
    )
}
