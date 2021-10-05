import { AnimatePresence, motion } from "framer-motion"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { GlobalContext } from "../App"

const Items = [
    {name: "все ТАРИФЫ", subItems: ["для телефонов", "для других устройств"], route: "tariffs"},
    {name: "выбрать номер", subItems: ["перенести свой", "подключить eSIM"], route: "numbers/:все"},
    {name: "услуги", subItems: ["бесплатные", "платные", "роуминг"], route: "roaming"},
    {name: "ОРГАНИЗАЦИЯМ", subItems: ["наши партнеры", "малый бизнес", "крупный бизнес"], route: "organisations"},
    {name: "поддержка", subItems: ["f.a.q", "карта покрытия", "контакты"], route: "поддержка"},
];
const Item = styled.div`
    display: flex;
    font-size: 21px;
    gap: 10px;
    align-items: center;
    text-transform: lowercase;
    cursor: pointer;
    position: relative;
    color: inherit;
    & svg {
        transform: ${({selected, idx}) => selected === idx && "rotate(180deg)"};
        transition: ease 0.3s;
        margin-left: 5px;
    }
    @media (max-width: 1100px) {
        flex-direction: column;
        align-items: flex-start;
        font-size: 23px;
    }
`
const SubItems = styled(motion.div)`
    position: absolute;
    top: 35px;
    background: #fff;
    color: #121212;
    z-index: 3;
    width: max-content;
    padding: 15px;
    border-radius: 10px;
    @media (max-width: 1100px) {
        position: static;
        left: 0px;
        top: 0px;
    }
`
export default function Menu({setShowMobileNav}) {
    const [selected, setSelected] = useState(null);
    const {darkTheme, isMobile} = useContext(GlobalContext);
    const Gesture = (idx) => {
        return isMobile ? 
            {onClick: () => {setSelected(id => id === idx ? null : idx)}} : 
            {onMouseEnter: () => setSelected(idx)}
    }
    return (
        <>
            {Items.map(({name, subItems, route}, idx) => <Item idx={idx} selected={selected}
            onMouseLeave={() => setSelected(null)} {...Gesture(idx)} key={name}>
                <span>
                    {name}
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill={darkTheme ? '#F8F8F8' : '#010101'} />
                    </svg>
                </span>
                <AnimatePresence>
                    {selected === idx && 
                    <SubItems onClick={(e)=>e.stopPropagation()} darkTheme={darkTheme} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        {subItems.map(subItem => <Item onClick={()=>setShowMobileNav && setShowMobileNav(false)} key={subItem} as={Link} to={`${route}`}>{subItem}</Item>)}
                    </SubItems>}
                </AnimatePresence>
            </Item>)}
        </>
    )
}
