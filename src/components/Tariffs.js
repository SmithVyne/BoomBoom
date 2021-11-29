import  React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styled from 'styled-components/macro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useContext } from "react";
import { GlobalContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "lodash";
import smoothscroll from 'smoothscroll-polyfill';

const WrapScroller = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`
const Scroller = styled(motion.div)`
    height: fit-content;
    width: 100%;
    overflow-x: scroll;
    ::-webkit-scrollbar {
        width: 0px;
    }
    @media(max-width: 600px){
        touch-action: none;
        overflow-x: hidden;
    }
`

const WrapTariffs = styled.div`
    display: flex;
    width: max-content;
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
    margin-left: calc(100% -10px);
    @media(max-width: 600px) {
        display: none;
    }
    left: 0;
    color: #0E5EF8;    
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
    background: ${({ darkTheme }) => darkTheme ? "rgba(255, 255, 255, 0.24)" : "#D6D6D6"};
    border-radius: 6px;
    & div {
        height: 6px;
        width: 50%;
        background: #0E5EF8;
        border-radius: inherit;
        margin-left: ${({ percentage }) => percentage + "%"};
    }
    @media(max-width: 600px){
        display: none;
    }
`

const MobileTracker = styled.div`
    position: absolute;
    top: calc(100% + 10px);
    left: calc(50% - 46px);
    height: 8px;
    display: none;
    @media(max-width: 600px) {
        display: flex;
    }
`
const Ellipses = styled.div`
    height: 8px;
    width: 8px;
    background: ${({ position, idx }) => position === idx ? "#0E5EF8" : "transparent"};
    border: 1px solid #0E5EF8;
    border-radius: 100%;
    margin-right: 7px;
    &:last-of-type {
        margin-right: 0;
    }
`
smoothscroll.polyfill();

export default function Tariffs({ children }) {
    const ref = useRef();
    const { darkTheme, isPhone, scrollbar } = useContext(GlobalContext);
    const [showScroll, setShowScroll] = useState(false);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [offsetWidth, setOffSetWidth] = useState(1);
    const [scrollWidth, setScrollWidth] = useState(2);
    const [percentage, setPercentage] = useState(0);
    const [position, setPosition] = useState(0);

    useLayoutEffect(() => {
        const { current } = ref;
        function init() {
            setShowScroll(current.scrollWidth > current.offsetWidth);
            setOffSetWidth(current.offsetWidth);
            setScrollWidth(current.scrollWidth);
        }
        init();
        window.addEventListener("resize", init)
        return () => {
            window.removeEventListener("resize", init);
        }
    }, [])

    const func = useMemo(() => debounce((scrollLeft, scrollWidth, offsetWidth) => setPercentage(scrollLeft / (scrollWidth - offsetWidth) * 50), 20), [])
    useEffect(() => {
       func(scrollLeft, scrollWidth, offsetWidth)
    }, [scrollLeft, scrollWidth, offsetWidth, func])
    
    useEffect(() => {
        setPosition(Math.floor(scrollLeft / offsetWidth))
    }, [scrollLeft, offsetWidth])

    const handleScroll = (type) => {
        const { current } = ref;
        const { scrollLeft } = current;
        let pixels = window.innerWidth < 720 ? 500 : 800;
        switch (type) {
            case "back":
                current.scroll({ left: scrollLeft - pixels, behavior: 'smooth' });
                break;
            default:
                current.scroll({ left: scrollLeft + pixels, behavior: 'smooth' });
        }
    }

    const handlePanStart = (e, info) => {
        const { current } = ref;
        const {x, y} = info.offset;
        if(isPhone && Math.abs(x) > Math.abs(y)) {
            scrollbar.scrollTop += y;
            if(x < 0) {
                current.scroll({ left: scrollLeft + current.offsetWidth + 40, behavior: 'smooth' });
            } else {
                current.scroll({ left: scrollLeft - current.offsetWidth - 40, behavior: 'smooth' });
            }
        }
    }

    return (
        <>
            <WrapScroller>
                {showScroll &&
                    <>
                        <Ctrl onClick={() => handleScroll("back")} style={{ marginLeft: "-45px", marginRight: "6px" }} >
                            <IoIosArrowBack strokeLinecap="square" size={26} />
                        </Ctrl>
                        <WrapCtrl>
                            <Ctrl onClick={() => handleScroll()} ><IoIosArrowForward strokeLinecap="square" size={26} /></Ctrl>
                        </WrapCtrl>
                    </>
                }
                <Scroller onPanStart={handlePanStart} onScroll={({target}) => setScrollLeft(target.scrollLeft)} ref={ref}>
                    <WrapTariffs>
                        <AnimatePresence>
                            {children}
                        </AnimatePresence>
                    </WrapTariffs>
                </Scroller>
                {showScroll &&
                    <>
                        <Tracker darkTheme={darkTheme} percentage={percentage}><div></div></Tracker>
                    </>
                }
                <MobileTracker>
                    {Array(children.length).fill(null).map((_, idx) => <Ellipses key={idx} position={position} idx={idx}></Ellipses>)}
                </MobileTracker>
            </WrapScroller>
        </>
    )
}
