import {useContext, useEffect, useState} from 'react'
import { CgClose, CgInfinity } from 'react-icons/cg'
import { RiDeleteBin6Fill} from 'react-icons/ri'
import { BsArrowLeft} from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'
import styled from 'styled-components/macro'
import ReactDOM from 'react-dom'
import { GlobalContext } from '../App'
import SimCardInfo from './SimCardInfo'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { useEscapeKey } from '../hooks'
import { useDispatch } from 'react-redux'
import { HIDE_MODAL, tariffTypesArray } from '../globals/utils';
import { FourGSwitch, switchTypes } from '../globals/TariffCard'
import Cleave from 'cleave.js/react';
import NumbersMobile from './Numbers/NumbersMobile'
import searchIcon_black from '../assets/images/search-black.svg'

const Wrapper = styled(motion.div)`
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
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
    @media(max-width: 601px) {
        padding: 16px;
    }
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
        :nth-of-type(2n){
            margin-bottom: 64px;
        }
    }
    .выберете_номер {
        font-size: 20px;
    }
    .выберете_номер .input {
        width: 300px;
        height: 50px;
        border-radius: 13px;
        padding: 0 15px;
        margin-right: 16px;
        outline: none;
        border: 2px solid rgba(1, 1, 1, 0.16);
        font-weight: 500;
        font-family: Circe;
        :active, :focus {
            border-color: #0E5EF8;
        }
        @media(max-width: 601px) {
            margin-bottom: 16px;
        }
    }
    .выберете_номер button {
        height: 50px;
        width: 176px;
        border-radius: 13px;
        border: none;
        cursor: pointer;
        background: #0E5EF8;
        color: #fff;
        font-weight: 500;
    }
    .ModalNumbers {
        display: flex;
        flex-direction: column;
        gap: 12px;
        .number {
            display: flex;
            gap: 8px;
            align-items: center;
            .left {
                width: 600px;
                padding: 10px;
                border: 3px solid #FF0202;
                border-radius: 12px;
                @media(max-width: 800px) {
                    width: 100%;
                }
            }
        }
    }
    .goBack {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        font-weight: 500;
        font-size: 24px;
    }
    .showNumbers-top {
        width: fit-content;
        margin: 10px auto;
    }
    .servicesModal {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        span {
            font-size: 20px;
            color: #010101AD;
        }
        h2 {
            font-size: 32px;
            font-weight: bold;
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
`

const Switches = styled.span`
    display: flex;
    align-items: stretch;
    gap: 20px;
    font-size: 20px;
    line-height: 29px;
    font-family: Circe, Arial, sans-serif;
    width: 70%;
    @media(max-width: 600px) {
        font-size: 16px;
        width: 100%;
    }
`
const Dropdown = styled.div`    
    border: 2px solid #4B75FC;
    border-radius: 14px;
    height: fit-content;
    width: 300px;
    max-width: 100%;
    margin-bottom: 44px;
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
            transform: ${({drop}) => drop && "rotate(180deg)"};
            transition: ease 0.3s;
        }
    }
    border: ${({selected})=> selected && "2px solid #4B75FC"};
    .bottom {
        font-size: 20px;
        color: black;
    }
    .bottom.first {
        color: #4B75FC;
    }
    .dropdown {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: fit-content;
    }
`

const downArrow = (<svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill='#010101' />
</svg>);

export const spacer = (number) => `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 8)} ${number.slice(8, 10)}`

const TariffsDropDown = memo(({tariffId, modalPosition, setModalPosition}) => {
    const tariff = tariffTypesArray[tariffId];
    const [drop, setDrop] = useState(false);
    return (
        <Dropdown drop={drop} onClick={()=>setDrop(val => !val)}>
            <span className="top">
                <img alt="tariffIcon" src={tariff.icon} />
                {tariff.title}
                {downArrow}
            </span>
            <span className="bottom first">
                <span>{tariff.positions[modalPosition].min}мин , </span>
                <span>{tariff.positions[modalPosition].gb === Infinity ? <CgInfinity />: tariff.positions[modalPosition].gb}гб , </span>
                <span>{tariff.positions[modalPosition].sms}смс</span>
            </span>
            {drop && 
            <div className="dropdown">
                {tariff.positions.map((position, index) => (
                    <span style={position === index ? {opacity: 0.2} : {}} key={index} onClick={() => setModalPosition(index)} className="bottom">
                        <span>{position.min}мин , </span>
                        <span>{position.gb === Infinity ? <CgInfinity />: position.gb}гб , </span>
                        <span>{position.sms}смс</span>
                    </span>
                ))}
            </div>}
        </Dropdown>
    )
})

const GarbageCan = styled(RiDeleteBin6Fill)`
    cursor: pointer;
    min-width: 24px;
    min-height: 24px;
    &:hover {
        color: #FF0202;
    }
`;

const NumbersDropDown = ({setShowNumbers, inputNumber, setInputNumber, selectedCategoryID, setSelectedCategoryID}) => {
    const [isSelectCategoryOpen, setIsSelectCategoryOpen] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    function handleCategoryChange(e, category) {
        e.stopPropagation();
        setIsSelectCategoryOpen(false);
        setSelectedCategoryID(category);
    }
    return (
    <div className="showNumbers-top">
        <div onClick={()=>setShowNumbers(false)} className="goBack"><BsArrowLeft /> Назад</div>
        <div className="numbers-for-mobile__inputs modal">
            <div className={`numbers__input-container ${isInputFocused ? "numbers__input-container_focused" : ''}`}>
                <img className="numbers__input-search-icon" src={searchIcon_black} alt="Иконка поиска" />
                <input onBlur={()=>setIsInputFocused(false)} onFocus={()=>setIsInputFocused(true)} className="numbers__input" name="number" type="text" value={inputNumber} onChange={({target})=>setInputNumber(target.value)} placeholder='Поиск номера' maxLength="10"></input>
            </div>
            <div onClick={() => setIsSelectCategoryOpen(val => !val)} className={`numbers-for-mobile__select-button`}>
                {selectedCategoryID === "all" ? <h2 className={`numbers-for-mobile__select-button-category`}>Все</h2> : <></>}
                {selectedCategoryID === 1 ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_bronz`}>Бронзовый</h2> : <></>}
                {selectedCategoryID === 2 ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_silver`}>Серебрянный</h2> : <></>}
                {selectedCategoryID === 3 ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_gold`}>Золотой</h2> : <></>}
                {selectedCategoryID === 6 ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_platina`}>Платиновый</h2> : <></>}
                {selectedCategoryID === 10 ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_briliant`}>Бриллиантовый</h2> : <></>}
                <svg className={`numbers-for-mobile__select-button-tick ${isSelectCategoryOpen ? 'numbers-for-mobile__select-button-tick_rotated' : ''}`} width="21" height="12" viewBox="0 0 21 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" />
                </svg>
                {selectedCategoryID === 'all' ? <></> : <p onClick={(e) => handleCategoryChange(e, 'all')} className={`numbers-for-mobile__select-item`}>Все</p>}
                {<div className={`numbers-for-mobile__select-items ${isSelectCategoryOpen ? 'numbers-for-mobile__select-items_visible' : ''}`}>
                    {selectedCategoryID === 1 ? <></> : <p onClick={(e) => handleCategoryChange(e, 1)} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_bronz`}>Бронзовый</p>}
                    {selectedCategoryID === 2 ? <></> : <p onClick={(e) => handleCategoryChange(e, 2)} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_silver`}>Серебрянный</p>}
                    {selectedCategoryID === 3 ? <></> : <p onClick={(e) => handleCategoryChange(e, 3)} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_gold`}>Золотой</p>}
                    {selectedCategoryID === 6 ? <></> : <p onClick={(e) => handleCategoryChange(e, 6)} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_platina`}>Платиновый</p>}
                    {selectedCategoryID === 10 ? <></> : <p onClick={(e) => handleCategoryChange(e, 10)} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_brilian`}>Бриллиантовый</p>}
                </div>}
            </div>
        </div>
    </div>
    )
}

const Thanks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .thanksTop {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .thanksBody {
        margin-bottom: 24px;
    }
    button {
        background: #010101;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 60px;
        border-radius: 60px;
        border: none;
        color: white;
        cursor: pointer;
    }
`
const ThankYouModal = () => {
    const dispatch = useDispatch();
    return (
        <Thanks>
            <div className="thanksTop">
                <h2>Спасибо за заявку</h2>
                <FaCheckCircle size={32} color="#79FFD7" />
            </div>
            <span className="thanksBody">Мы с вами свяжемся в ближайшее время</span>
            <button onClick={() => dispatch({type: HIDE_MODAL})}>Хорошо</button>
        </Thanks>
    )
}

const options = ["Купить новую SIM", "Перенести номер в BOOM"]
export default memo(function BuyNumberModal({numbers, buy, payload}) {
    const {darkTheme} = useContext(GlobalContext);
    const [selectedOption, setSelectedOption] = useState(0);
    const [deletedNumbers, setDeletedNumbers] = useState([]);
    const [showNumbers, setShowNumbers] = useState(false);
    const [chosenNumber, setChosenNumber] = useState({});
    const [inputNumber, setInputNumber] = useState("");
    const [submit, setSubmit] = useState(false);
    const [selectedCategoryID, setSelectedCategoryID] = useState("all");
    const dispatch = useDispatch();
    const {position, tariffId, service, switches} = payload;
    const [modalSwitches, setModalSwitches] = useState(switches);
    const [modalPosition, setModalPosition] = useState(position);
    useEscapeKey(() => dispatch({type: HIDE_MODAL}));
    const handleSubmit = () => {
        setSubmit(true);
    }

    useEffect(() => {
        chosenNumber.ctn && setInputNumber(chosenNumber.ctn)
    }, [chosenNumber])
    
    return ReactDOM.createPortal (
        <Wrapper
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.3}}
        onClick={()=>dispatch({type: HIDE_MODAL})} darkTheme={darkTheme}>
            <Modal onClick={(e)=>e.stopPropagation()}>
                <Close onClick={()=>dispatch({type: HIDE_MODAL})}><CgClose strokeWidth={1.5} size={29} /></Close>
                { submit ? 
                    <ThankYouModal /> : 
                    <>
                        { showNumbers ? 
                        <> 
                            <NumbersDropDown setShowNumbers={setShowNumbers} inputNumber={inputNumber} setInputNumber={setInputNumber} selectedCategoryID={selectedCategoryID} setSelectedCategoryID={setSelectedCategoryID} />
                            <NumbersMobile
                                selectedCategoryID={selectedCategoryID}
                                inputValue={inputNumber}
                                selectedNumbers={[chosenNumber]}
                                handleCtnClick={(number) => {console.log(number);setChosenNumber(number); setShowNumbers(false)}}
                                darkTheme={{val: false}}
                            />
                        </> : 
                        buy ?
                        <>
                            <h1>Приобретение номера</h1>
                            <section>
                                <p>Выберете тарифы для номера</p>
                                <div className="ModalNumbers">
                                    {numbers.filter(number => !deletedNumbers.includes(number.ctn)).map(number => (
                                        <span key={number.ctn} className="number">
                                            <span className="left">{spacer(number.ctn)}</span>
                                            <GarbageCan onClick={()=>setDeletedNumbers(numbers => [...numbers, number.ctn])} />
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </>
                        :
                        service ? 
                        <>
                            <div className="servicesModal">
                                <span>Подключение услуги</span>
                                <h2>{service.title}</h2>
                            </div>
                        </> :
                        <>
                            <h1>Подключение тарифа</h1>
                            <TariffsDropDown modalPosition={modalPosition} setModalPosition={setModalPosition} tariffId={tariffId} />
                            <section>
                                <p>Дополнительные опции</p>
                                <Switches>
                                    {switchTypes.map(title => <FourGSwitch key={title} modal={true} checked={modalSwitches[title]} setSwitches={setModalSwitches} title={title} price={tariffTypesArray[tariffId].positions[modalPosition][title]} />)}
                                </Switches>
                            </section>
                            <section>
                                <p>Способ получения</p>
                                <div className="options first">
                                    {options.map((option, idx) => <Option className="first" key={option} selected={selectedOption} idx={idx} onClick={()=>setSelectedOption(idx)}>{option}</Option>)}
                                </div>
                            </section>
                            {selectedOption === 0 && <section>
                                <p>Выберете номер</p>
                                <div className="выберете_номер">
                                    <Cleave className="input" options={{
                                        phone: true,
                                        phoneRegionCode: 'RU'
                                    }} type="tel" placeholder="Ваш новый номер" value={inputNumber} onChange={({target}) => setInputNumber(target.value.replace(" ", ""))} />
                                    <button onClick={()=>setShowNumbers(true)}>Найти</button>
                                </div>
                            </section>}
                        </>
                        }
                        <SimCardInfo handleSubmit={handleSubmit} selected={buy ? 0 : selectedOption} Option={Option} buy={buy} service={service} />
                    </>
                }
            </Modal>
        </Wrapper>,
        document.getElementById("modal")
    )
})