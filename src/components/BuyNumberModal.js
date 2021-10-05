import {useContext, useState} from 'react'
import { CgClose, CgInfinity } from 'react-icons/cg'
import styled from 'styled-components/macro'
import ReactDOM from 'react-dom'
import { GlobalContext } from '../App'
import SimCardInfo from './SimCardInfo'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { useEscapeKey } from '../hooks'
import { useDispatch } from 'react-redux'
import { HIDE_MODAL, CATEGORIES, tariffTypesArray } from '../globals/utils';
import { FourGSwitch } from '../globals/TariffCard'

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
    section {
        margin-bottom: 44px;
        p {
            margin-bottom: 15px; 
            color: inherit;
        }
        :first-of-type{
            margin-bottom: 64px;
        }
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
        
    }
`

const Switches = styled.span`
    display: flex;
    align-items: stretch;
    gap: 20px;
    font-size: 20px;
    line-height: 29px;
    font-family: Circe, Arial, sans-serif;
    width: 70%;
    @media(max-width: 450px) {
        font-size: 16px;
        width: 100%;
    }
`
const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    border: 2px solid #4B75FC;
    border-radius: 14px;
    width: fit-content;
    margin-bottom: 44px;
    .absolute {
        position: absolute;
        left: 0;
        top: calc(100% + 4px);
        z-index: 10;
        background: #fff;
        width: fit-content;
        border: 2px solid rgba(18, 18, 18, 0.12);
        border-radius: 0 0 14px 14px;  
    }
`
const Item = styled.span`
    width: 300px;
    height: fit-content;
    padding: 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .top {
        display: flex;
        gap: 10px;
        align-items: flex-end;
        font-size: 20px;
        font-weight: bold;
        img {
            width: 24px;
            height: 24px;
        }
        svg {
            margin-bottom: 9px;
        }
    }
    border: ${({selected})=> selected && "2px solid #4B75FC"};
    .bottom {
        color: #4B75FC;
        font-size: 20px;
    }
`

const downArrow = (<svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill='#010101' />
</svg>);

// const spacer = (number) => `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 8)} ${number.slice(8, 10)}`

const TariffsDropDown = () => {
    const [selected, setSelected] = useState(0);
    // const [show, setShow] = useState(false);
    return (
        <Dropdown>
            <Item>
                <span className="top">
                    <img alt="tariffIcon" src={tariffTypesArray[selected].icon} />
                    {tariffTypesArray[selected].title}
                    {downArrow}
                </span>
                <span className="bottom">
                    <span className="rate">{tariffTypesArray[selected].position[0].min}мин, </span>
                    <span className="rate">{tariffTypesArray[selected].position[0].gb === Infinity ? <CgInfinity />: tariffTypesArray[selected].position[0].gb}гб, </span>
                    <span className="rate">{tariffTypesArray[selected].position[0].sms}смс</span>
                </span>
            </Item>
            {/* <div className="absolute">
                {tariffTypesArray.map(({title, icon}, idx) => (
                    <Item onClick={() => setSelected(idx)} selected={selected === idx}>
                        <span className="top">
                            <img src={icon} />
                            {title}
                        </span>
                        <span className="bottom">
                            
                        </span>
                    </Item>
                ))}
            </div> */}
        </Dropdown>
    )
}

const options = ["Купить новую SIM", "Перенести номер в BOOM"]
export default memo(function BuyNumberModal({numbers, buy}) {
    const {darkTheme} = useContext(GlobalContext);
    const [selectedOption, setSelectedOption] = useState(0);
    // const [purchaseType, setPurchaseType] = useState(0);
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
                    
                </>
                :
                <>
                    <h1>Подключение тарифа</h1>
                    <TariffsDropDown />
                    <section>
                        <p>Дополнительные опции</p>
                        <Switches>
                            <FourGSwitch modal={true} title="Безлимитный 4G" price="150" />
                            <FourGSwitch modal={true} title="Раздача интернета" price="50" />
                        </Switches>
                    </section>
                    <section>
                        <p>Способ получения</p>
                        <div className="options first">
                            {options.map((option, idx) => <Option className="first" key={option} selected={selectedOption} idx={idx} onClick={()=>setSelectedOption(idx)}>{option}</Option>)}
                        </div>
                    </section>
                    <section>
                        <p>Выберете номер</p>
                        <div className="выберете_номер">
                            <input type="text" />
                            <button>Найти</button>
                        </div>
                    </section>
                </>}
                <SimCardInfo selected={buy ? 0 : selectedOption} Option={Option} buy={buy} />
            </Modal>
        </Wrapper>,
        document.getElementById("modal")
    )
})