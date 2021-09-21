import { AnimatePresence, motion } from "framer-motion"
import { useContext, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { GlobalContext } from "../App"

const Items = [
    {name: "все ТАРИФЫ", subItems: ["для телефонов", "для других устройств"]},
    {name: "выбрать номер", subItems: ["перенести свой", "подключить eSIM"]},
    {name: "услуги", subItems: ["бесплатные", "платные", "роуминг"]},
    {name: "ОРГАНИЗАЦИЯМ", subItems: ["наши партнеры", "малый бизнес", "крупный бизнес"]},
    {name: "поддержка", subItems: ["f.a.q", "карта покрытия", "контакты"]},
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
export default function Menu() {
    const [selected, setSelected] = useState(null);
    const {darkTheme} = useContext(GlobalContext);
    return (
        <>
            {Items.map(({name, subItems}, idx) => <Item idx={idx} selected={selected}
            onMouseEnter={() => setSelected(idx)} onMouseLeave={() => setSelected(null)} key={name}>
                <span>
                    {name}
                    <IoIosArrowDown />
                </span>
                <AnimatePresence>
                    {selected === idx && 
                    <SubItems darkTheme={darkTheme} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        {subItems.map(subItem => <Item key={subItem} as={Link} to="">{subItem}</Item>)}
                    </SubItems>}
                </AnimatePresence>
            </Item>)}
        </>
    )
}
