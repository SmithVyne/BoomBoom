import {useContext, useState} from 'react'
import { CgClose } from 'react-icons/cg'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import { GlobalContext } from '../App'
import SimCardInfo from './SimCardInfo'
import { motion } from 'framer-motion'

const Wrapper = styled(motion.div)`
    position: fixed;
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.7)"};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
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
    cursor: pointer
`
const Modal = styled.div`
    background-color: white;
    position: relative;
    width: 800px;
    height: fit-content;
    padding: 28px 40px 32px;
    font-size: 24px;
    border-radius: 32px;
    & h1 {
        font-weight: bold;
        font-size: 32px;
    }
    & .options {
        display: flex;
        align-items: center;
        gap: 12px;
    }
`

const Option = styled.span`
    padding: 19.5px 16px;
    border: 3px solid ${({selected, idx}) => selected === idx ? "#0E5EF8" : "rgba(1, 1, 1, 0.16)"};
    border-radius: 12px;
    cursor: pointer;
`

const options = ["Купить новую SIM", "Перенести номер в BOOM"]
export default function TariffModal({setShowTariffModal, name}) {
    const {darkTheme} = useContext(GlobalContext);
    const [selectedOption, setSelectedOption] = useState(0);
    return ReactDOM.createPortal (
        <Wrapper
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.3}}
        onClick={()=>setShowTariffModal(false)} darkTheme={darkTheme}>
            <Modal onClick={(e)=>e.stopPropagation()}>
                <Close onClick={()=>setShowTariffModal(false)}><CgClose strokeWidth={1.5} size={29} /></Close>
                <h1>Подключение тарифа "{name}"</h1>
                <div className="options">
                    {options.map((option, idx) => <Option key={option} selected={selectedOption} idx={idx} onClick={()=>setSelectedOption(idx)}>{option}</Option>)}
                </div>
                <SimCardInfo selected={selectedOption} Option={Option} />
            </Modal>
        </Wrapper>,
        document.getElementById("modal")
    )
}
