import { AiOutlineRight } from "react-icons/ai";
import { CgInfinity } from "react-icons/cg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Hit from "../assets/images/hit.svg";
import infinity from "../assets/images/infinity.png";
import headphones from "../assets/images/headphones.png";
import info from "../assets/images/info-icon.png";
import beeline from "../assets/images/beeline.png";
import TinySwitch from "../components/TinySwitch";
import TariffCardModal from "./TariffCardModal";
import { memo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import TariffBar from "./TariffBar";
import { SHOW_MODAL } from "./utils";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
    background: ${({ background }) => background};
    background-size: ${({ title }) => title === "VIP" && "600%"};
    width: 520px;
    color: #fff;
    border-radius: 28px;
    padding: 20px 28px;
    display: flex;
    flex-direction: column;
    font-size: initial;
    position: relative;
    overflow: hidden;
    @media(max-width: 600px) {
        width: 90vw;
    }
    .detailsWrapper {
        width: 70%;
    }
`;

const Title = styled.p`
    font-family: Circe, Arial, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 44px;
    color: #fff;
    margin: 0;
    word-break: break-all;
    @media(max-width: 720px) {
        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        line-height: 100%;
    }
`;

const SubScribeBtn = styled.button`
    font-family: Circe, Arial, sans-serif;
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
    @media(max-width: 720px) {
        width: 100%;
        height: 64px;
    }
`
const Sub = styled.small`
    font-family: Circe, Arial, sans-serif;
    font-style: normal;
    font-weight: 350;
    font-size: 28px;
    line-height: 41px;
    @media(max-width: 720px) {
        font-style: normal;
        font-weight: 350;
        font-size: 12px;
        line-height: 18px;
    }
`
const Details = styled.span`
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-top: 22px;
    font-size: 16px;
    opacity: 0.3;
    transition: opacity 0.3s ease-in-out;
    &:first-of-type {
        opacity: 1;
        margin-top: 28px;
    }
`

const MiniIcon = styled.img`
    width: 14px;
    margin: 5px 0;
    &:hover {
        cursor: ${({ pointer }) => pointer && "pointer"}
    }
`
const Switches = styled.span`
    display: flex;
    align-items: center;
    gap: 10px;
`
const More = styled(Link)`
    font-family: Circe, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 100%;
    margin-top: 18px;
    width: fit-content;
    cursor: pointer;
    border-bottom: 1px solid;
    color: inherit; 
    &:hover {
        color: inherit; 
    }
    @media(max-width: 720px) {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 100%;
    }
`

export default memo(function TariffCard({ tariff, background, title, hit, icon, scrolling }) {
    const [showDropdown, setShowDropDown] = useState(false);
    const [positionValue, setPositionValue] = useState(0);
    const dispatch = useDispatch();

    function handlePositionChange(position) {
        setPositionValue(position)
    }
    return (
        <Wrapper title={title} background={background} scrolling={scrolling}>
            <AnimatePresence>
                {showDropdown && <TariffCardModal showDropdown={showDropdown} setShowDropDown={setShowDropDown} />}
            </AnimatePresence>
            <span className="card-top">
                <img alt="card-icon" className='card-title-icon' src={icon} />
                <Title>{title}</Title>
                {hit && <img alt="hit" src={Hit} />}
            </span>
            <span className="card-body">
                <span className="tarif-settings">
                    <span className="item">{tariff.position[positionValue].min}<Sub>мин</Sub></span>
                    <span className="item">{tariff.position[positionValue].gb === Infinity ? <CgInfinity />: tariff.position[positionValue].gb}<Sub>гб</Sub></span>
                    <span className="item">{tariff.position[positionValue].sms}<Sub>смс</Sub></span>
                </span>
                <TariffBar vip={title.toLowerCase() === "vip"} handlePositionChange={handlePositionChange} />
                <Switches>
                    <span className="_4Gswitch">
                        Безлимитный 4G
                        <span>
                            <TinySwitch />
                            +100 Р
                        </span>
                    </span>
                    <span className="_4Gswitch">
                        Раздача интернета
                        <span>
                            <TinySwitch />
                            +50 Р
                        </span>
                    </span>
                </Switches>
                <span className="detailsWrapper" >
                    <Details>
                        <MiniIcon src={infinity} /><p className='infinity-text'>безлимитные соц сети и мессенджеры</p><MiniIcon onMouseOver={(e) => {
                            e.stopPropagation()
                            setShowDropDown(true)
                        }} pointer src={info} />
                    </Details>
                    <Details style={{ opacity: `${positionValue === 2 ? '1' : '0.3'}` }}><MiniIcon src={beeline} /><p className='beeline-text'>безлимитное общение <br /> с абонентами внутри сети Билайн</p></Details>
                    <Details><MiniIcon src={headphones} /><p className='infinity-text'>выделенная линия поддержки</p></Details>
                </span>
                <More to={`/tariff-info/:${tariff.tariffName}`}>Подробнее про тариф</More>
            </span>
            <span className="priceInfo">
                {tariff.price} руб./мес
                <SubScribeBtn onClick={() => dispatch({type: SHOW_MODAL, title})}>Подключить <AiOutlineRight style={{transform: "translateY(20%)"}} /></SubScribeBtn>
            </span>
        </Wrapper>
    )
})
