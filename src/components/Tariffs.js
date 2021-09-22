import { useLayoutEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import duck from "../assets/images/duck.png";
import star from "../assets/images/star.png";
import goblet from "../assets/images/goblet.png";
import TariffCard from "../globals/TariffCard";
import { useContext } from "react";
import { GlobalContext } from "../App";

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
    z-index: 100;
    top: calc(50% - 22px);
    margin-left: calc(100% + 6px); 
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
    z-index: 100;
`


export default function Tariffs({children}) {
    const ref = useRef();
    const [showScroll, setShowScroll] = useState(false);
    const {isMobile} = useContext(GlobalContext);

    useLayoutEffect(() => {
        const {current} = ref;
        setShowScroll(current.scrollWidth > current.offsetWidth)
    }, [setShowScroll])

    const handleScroll = (type) => {
        const {current} =  ref;
        const {scrollLeft} = current;
        const pixels = isMobile ? 250 : 500;
        switch(type) {
            case "back":
                current.scroll({left: scrollLeft - pixels,  behavior: 'smooth'});
                break;
            default:
                current.scroll({left: scrollLeft + pixels,  behavior: 'smooth'});
        }
    }
    return (
        <WrapScroller>
            { showScroll &&
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
                            <TariffCard scrolling="true" title="Базовый" background="linear-gradient(135deg, #4B74FC 0%, #3039FF 100%)" icon={duck} />
                            <TariffCard scrolling="true" title="Яркий" background="linear-gradient(135deg, #4B5AFD 0%, #4B38FE 100%)" hit icon={star} />
                            <TariffCard scrolling="true" title="Расширенный" background="linear-gradient(135deg, #4B40FE 0%, #4B1EFF 100%);" icon={goblet} />
                            <TariffCard scrolling="true" title="Бизнес" background="radial-gradient(ellipse at center, #324E69 0%, #242424 100%)" icon={star} />
                            <TariffCard scrolling="true" title="VIP" background="radial-gradient(ellipse at center, #D79532 0%, #E1B470 50%, #1B240A 100%)" icon={goblet} />
                        </>
                    )}
                </WrapTariffs>
            </Scroller>
        </WrapScroller>
    )
}
