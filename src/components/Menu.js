import { IoIosArrowDown } from "react-icons/io"
import styled from "styled-components"

const Items = [
    {name: "все ТАРИФЫ", subItems: ["", ""]},
    {name: "выбрать номер"},
    {name: "услуги"},
    {name: "ОРГАНИЗАЦИЯМ"},
    {name: "поддержка"},
]
const Item = styled.div`
    display: flex;
    font-size: 24px;
    gap: 10px;
    align-items: center;
    text-transform: lowercase;
    line-height: 0px;
    /* cursor: pointer; */
`
export default function Menu() {
    return (
        <>
            {Items.map(({name}) => <Item>
                {name}
                <IoIosArrowDown style={{lineHeight: "0px"}} alignmentBaseline="bottom" />
            </Item>)}
        </>
    )
}
