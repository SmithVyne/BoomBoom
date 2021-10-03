import {useContext, useState} from 'react'
import { CgClose } from 'react-icons/cg'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import { GlobalContext } from '../App'
import SimCardInfo from './SimCardInfo'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { useEscapeKey } from '../hooks'
import { useDispatch } from 'react-redux'
import { HIDE_MODAL, CATEGORIES } from '../globals/utils';
import duck from "../assets/images/duck.png";
import star from "../assets/images/star.png";
import goblet from "../assets/images/goblet.png";

const Wrapper = styled(motion.div)`
    position: fixed;
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: 100vh;
    z-index: 20;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0;
    }
`
const Close = styled.span`
    position: absolute;
    top: 28px;
    right: 40px;
    cursor: pointer;
    @media(max-width: 960px) {
        top: 12px;
        right: 12px;
    }
`
const Modal = styled.div`
    background-color: white;
    position: relative;
    width: 800px;
    max-width: 100%;
    height: fit-content;
    padding: 28px 40px 32px;
    font-size: 24px;
    border-radius: 32px;
    margin: 20px;
    & h1 {
        font-weight: bold;
        font-size: 32px;
    }
    & h1 span {
        @media(max-width: 601px) {
        display: block;
        }
    }
    & .options {
        display: flex;
        align-items: center;
        gap: 12px;
        @media(max-width: 960px) {
            font-size: 16px;
        }
        @media(max-width: 601px) {
            flex-wrap: wrap;
        }
    }
    & .options.first {
        @media(max-width: 601px) {
            flex-direction: column;
            align-items: flex-start;
        }
    }
    & .left {
        span {
            display: flex;
            align-items: center;
            font-family: "Circe";
            .number{
                font-weight: 600;
                font-size: 36px;
            }
            @media(max-width: 500px){
                flex-direction: column-reverse;
                align-items: flex-start;
            }
        }
    }
    & .left h1 {
        color: #0E5EF8;
        margin-bottom: 10px;
    }
    .right {
        font-size: 36px;
        font-weight: 500;
        @media(max-width: 600px) {
            display: none;
        }
    }
    & .buyNumberTop {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 40px;
        @media(max-width: 600px){
            margin-bottom: 20px;
        }
    }
    & .options.buyOptions {
        width: 70%;
        flex-wrap: wrap;
        .tariffs {
            font-size: 28px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 10px;
            @media(max-width: 600px){
                font-size: 12px;
                img {
                    width: 28px;
                }
            }
        }
        @media(max-width: 700px){
            width: 100%
        }
    }
    & .Доступные_тарифы {
        font-size: 24px;
        font-weight: normal;
    }
    & .desktopPrices {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-weight: bold;
        .discount {
            font-size: 20px;
        }
    }
    & .mobilePrices {
        display: none;
        @media(max-width: 600px){
            display: block;
            margin-bottom: 20px;
        }
        div {
            display: flex;
            gap: 10px;
            height: fit-content;
        }
    }
    del.discount {
        color: red;
    }
    @media(max-width: 960px) {
        padding: 28px 12px;
    }
`

const Option = styled.span`
    padding: 19.5px 16px;
    border: 3px solid ${({selected, idx}) => selected === idx ? "#0E5EF8" : "rgba(1, 1, 1, 0.16)"};
    border-radius: 12px;
    cursor: pointer;
    &.first {
        @media(max-width: 601px) {
            width: 100%;
            text-align: center;
            max-width: 296px;
        }
    }
    &.purchaseType {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
        font-size: 16px;
        min-height: 100%;
        span {
            font-size: 20px;
            font-weight: bold;
        }
    }
`

const Tag = styled.span`
    padding: 10px;
    border-radius: calc(height);
    font-size: 16px;
    border-radius: 36px;
    background-color: ${({bg}) => bg};
    margin-right: 10px;
    height: fit-content;
    cursor: pointer;
`
const spacer = (number) => `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 8)} ${number.slice(8, 10)}`
const options = ["Купить новую SIM", "Перенести номер в BOOM"]
const tariffOptions = [
    {name: "Базовый", icon: duck}, {name: "Яркий", icon: star}, {name: "Расширенный", icon: goblet}, {name: "Бизнес", icon: star}, {name: "VIP", icon: goblet}
];
export default memo(function BuyNumberModal({name, buy, number}) {
    const {darkTheme} = useContext(GlobalContext);
    const [selectedOption, setSelectedOption] = useState(0);
    const [purchaseType, setPurchaseType] = useState(0);
    const dispatch = useDispatch();
    useEscapeKey(() => dispatch({type: HIDE_MODAL}))
    
    return ReactDOM.createPortal (
        <Wrapper
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.3}}
        onClick={()=>dispatch({type: HIDE_MODAL})} darkTheme={darkTheme}>
            <Modal onClick={(e)=>e.stopPropagation()}>
                <Close onClick={()=>dispatch({type: HIDE_MODAL})}><CgClose strokeWidth={1.5} size={29} /></Close>
                {buy ?
                <>
                    <div className="buyNumberTop">
                        <span className="left">
                            <h1>Оформить номер</h1>
                            <span>
                                <Tag bg={CATEGORIES[number.category].bg}>{CATEGORIES[number.category].name}</Tag>
                                <span className="number">{spacer(number.ctn)}</span>
                            </span>
                        </span>
                        <span className="right">
                            <span className="desktopPrices">
                                {number.category === 1 && <del className="discount">10 000 руб.</del>}
                                {CATEGORIES[number.category].rentPrice}
                            </span>
                        </span>
                    </div>

                    <div className="mobilePrices">
                        Способ покупки
                        <div>
                            <Option className="purchaseType" selected={purchaseType} idx={0} onClick={()=>setPurchaseType(0)}>
                                Арендовать 
                                <span>{CATEGORIES[number.category].rentPrice}</span>
                                {number.category === 1 && <del className="discount">10 000 руб.</del>}
                            </Option>
                            <Option className="purchaseType" selected={purchaseType} idx={1} onClick={()=>setPurchaseType(1)}>
                                Выкупить
                                <span>{CATEGORIES[number.category].purchasePrice}</span>
                            </Option>
                        </div>
                    </div>

                    <h2 className="Доступные_тарифы">Доступные тарифы</h2>
                    <div className="options buyOptions">
                        {tariffOptions.map(({name, icon}, idx) => <Option className="tariffs" key={name} selected={selectedOption} idx={idx} onClick={()=>setSelectedOption(idx)}>
                            <img alt="tariffIcon" src={icon} />
                            {name}
                        </Option>)}
                    </div>
                </>
                :
                <>
                    <h1>Подключение <span>тарифа "{name}"</span></h1>
                    <div className="options first">
                        {options.map((option, idx) => <Option className="first" key={option} selected={selectedOption} idx={idx} onClick={()=>setSelectedOption(idx)}>{option}</Option>)}
                    </div>
                </>}
                <SimCardInfo selected={buy ? 0 : selectedOption} Option={Option} buy={buy} />
            </Modal>
        </Wrapper>,
        document.getElementById("modal")
    )
})