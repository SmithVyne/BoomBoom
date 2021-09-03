import { AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";
import Hit from "../assets/images/hit.svg";
import infinity from "../assets/images/infinity.png";
import globe from "../assets/images/globe.png";
import info from "../assets/images/info-icon.png";
import beeline from "../assets/images/beeline.png";
import TinySwitch from "../components/TinySwitch";
import TariffCardModal from "./TariffCardModal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TariffBar from "./TariffBar";

const Wrapper = styled.div`
    background: ${({background}) => background};
    background-size: ${({title}) => title === "VIP" && "600%"};
    width: fit-content;
    max-width: ${({scrolling}) => scrolling ? '90vw' : '100%'};
    height: 100%;
    color: #fff;
    border-radius: 28px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    font-size: initial;
    position: relative;
    overflow: hidden;
`;

const Title = styled.p`
    font-size: 34px;
    font-weight: bold;
    color: #fff;
    margin: 0;
    word-break: break-all;
`;

const SubScribeBtn = styled.button`
    box-shadow: none;
    color: #121212;
    background: #fff;
    width: 260px;
    height: 76px;
    border-radius: 38px;
    border: none;
    outline: none;
    margin: 0;
    font-size: 24px;
    font-weight: semi-bold;
    cursor: pointer;
`
const Sub = styled.small`
    font-weight: light;
    font-size: 21px;
`
const Details = styled.small`
    display: flex;
    gap: 10px;
    align-items: center;
`

const MiniIcon = styled.img`
    width: 14px;
    margin: 5px 0;
    &:hover {
        cursor: ${({pointer}) => pointer && "pointer"}
    }
`

export default function TariffCard({background, title, hit, icon, scrolling}) {
    const [showDropdown, setShowDropDown] = useState(false);

    return (
        <Wrapper title={title} background={background} scrolling={scrolling}>
            <AnimatePresence>
                {showDropdown && <TariffCardModal showDropdown={showDropdown} setShowDropDown={setShowDropDown} />}
            </AnimatePresence>
            <span className="card-top">
                <img alt="card-icon" style={{width: 44}} src={icon} />
                <Title>{title}</Title>
                {hit && <img alt="hit" src={Hit} />}
            </span>
            <span className="card-body">
                <small>Настроить тариф</small>
                <span className="tarif-settings">
                    <span className="item">40<Sub>ГБ</Sub></span>
                    <span className="item">300<Sub>МИН</Sub></span>
                    <span className="item">100<Sub>СМС</Sub></span>
                </span>
                <TariffBar />
                <span className="_4Gswitch">
                    Безлимитный 4G
                    <TinySwitch />
                    +100 Р
                </span>
                <span style={{marginTop: "40px"}}>
                    <Details>
                        <MiniIcon src={infinity} />безлимитные соц сети и мессенджеры<MiniIcon onMouseOver={(e)=>{
                            e.stopPropagation()
                            setShowDropDown(true)
                        }} pointer src={info} />
                    </Details>
                    <Details><MiniIcon src={globe} />+300 мин в роуминге</Details>
                    <Details style={{opacity: 0.5}}><MiniIcon src={beeline} />безлимитное общение <br /> с абонентами внутри сети Билайн</Details>
                </span>
            </span>
            <span className="priceInfo">
                350 руб./мес
                <SubScribeBtn>Подключить <AiOutlineRight style={{transform: "translateY(20%)"}} /></SubScribeBtn>
            </span>
        </Wrapper>
    )
}
