import styled from "styled-components";

const Aside = styled.aside`
    font-size: 22px;
    display: flex;
    flex-direction: column;
    line-height: 30px;
    gap: 9px;
    font-weight: 600;
`;
const Items = styled.a`
    text-decoration: none;
    color: ${({theme}) => theme.textColor};
    &:hover, &:active {
        color: ${({theme}) => theme.textColor};
        &::before{
            content: "-";
            color: #4B75FC;
            margin-left: -9px;
        }
    }
`
const Div = styled.div`
    padding-top: 50px;
    display: flex;
`
const MainSection = styled.section``;
export default function Dashboard() {
    return (
        <Div>
            <Aside>
                <Items href="#tariff">Мой тариф</Items>
                <Items href="#delails">Детализация</Items>
                <Items href="#roaming">Роуминг</Items>
                <Items href="#groups">Группы</Items>
                <Items href="#services">Услуги</Items>
            </Aside>
            <MainSection>
dcfd
            </MainSection>          
        </Div>
    )
}
