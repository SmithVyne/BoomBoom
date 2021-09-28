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
import { HIDE_MODAL } from '../globals/utils'

const Wrapper = styled(motion.div)`
    position: fixed;
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.3)"};
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
    margin: 20px 0;
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
`

const options = ["Купить новую SIM", "Перенести номер в BOOM"]
export default memo(function BuyNumberModal({name, buy, number}) {
    const {darkTheme} = useContext(GlobalContext);
    const [selectedOption, setSelectedOption] = useState(0);
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
                {buy ? <h1>Купить номер <span>{number}</span></h1> : <h1>Подключение <span>тарифа "{name}"</span></h1>}
                <div className="options first">
                    {options.map((option, idx) => <Option className="first" key={option} selected={selectedOption} idx={idx} onClick={()=>setSelectedOption(idx)}>{option}</Option>)}
                </div>
                <SimCardInfo selected={selectedOption} Option={Option} buy={buy} />
            </Modal>
        </Wrapper>,
        document.getElementById("modal")
    )
})
