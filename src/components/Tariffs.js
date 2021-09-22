import { useLayoutEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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

export const WrapCtrl = styled.span`
    position: absolute;
    z-index: 100;
    top: calc(50% - 22px);
    margin-left: calc(100% + 6px); 
`;

export const Ctrl = styled.span`
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

export default function Tariffs({children}) {
    const ref = useRef();
    const [showScroll, setShowScroll] = useState(false);

    useLayoutEffect(() => {
        const {current} = ref;
        setShowScroll(current.scrollWidth > current.offsetWidth)
    }, [setShowScroll])

    return (
        <WrapScroller>
            { showScroll &&
                <>
                    <Ctrl onClick={() => handleScroll(ref, "back")} style={{marginLeft: "-50px", marginRight: "6px"}} ><IoIosArrowBack strokeLinecap="square" size={26} /></Ctrl>
                    <WrapCtrl>
                        <Ctrl onClick={() => handleScroll(ref)} ><IoIosArrowForward strokeLinecap="square" size={26} /></Ctrl>
                    </WrapCtrl>
                </>
            }
            <Scroller ref={ref} className="scroller">
                <WrapTariffs>
                        {children}
                </WrapTariffs>
            </Scroller>
        </WrapScroller>
    )
}
