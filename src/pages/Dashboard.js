import { useContext } from "react";
import styled from "styled-components";
import { themeContext } from "../App";
import Aside from "../components/Aside";

const Div = styled.div`
    padding-top: 50px;
    display: flex;
    gap: 0px 100px;
    width: 100%;
`;
const MainSection = styled.div`
    padding-right: 100px;
    width: 100%;
`;
const TopCards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 31px;
    width: 100%;
`;
const TopCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: fit-content;
    color: ${({color, theme}) => color ? color : theme.textColor};
    background: ${({background}) => background};
    height: 250px;
    max-height: fit-content;
    border-radius: 32px;
    padding: 20px;
    padding-bottom: 15px;
`;
const Button = styled.button`
    color: ${({color}) => color ? color : "#121212"};
    background: ${({background}) => background};
    font-size: ${({fontSize}) => fontSize};
    font-weight: ${({fontWeight}) => fontWeight};
    width: ${({width}) => width};
    height: ${({height}) => height};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({round, height}) => round && height};
    border: ${({border}) => border ? border : "none"};
    cursor: pointer;
`;
const TarifName = styled.span`
    font-size: 22px;
`
const Small = styled.small`
    font-size: 12px;
`;
const SubsNumber = styled.span`
    font-size: 28px;
    display: flex;
    flex-direction: column;
    gap: 0px;
`
const SubsBalance = styled(SubsNumber)`
    font-size: 80px;
`

export default function Dashboard() {
    const {darkTheme} = useContext(themeContext);
    return (
        <Div>
            <Aside />
            <MainSection>
                <TopCards>
                    <TopCard color="white" background={darkTheme ? 
                        "linear-gradient(148.41deg, #4B5AFD 0%, #4B38FE 100%)" : 
                        "radial-gradient(78.33% 96.51% at 14.73% 63.17%, #324E69 0%, #000000 100%)"}>
                            <TarifName>Тариф: Бизнес за 1500</TarifName>
                            <SubsNumber>
                                <Small>Ваш номер</Small>
                                +7 999 999 99 99
                            </SubsNumber>
                            <Button background="white" fontSize="20px" fontWeight="bold" width="307px" height="44px" round >Улучшить</Button>
                    </TopCard>
                    <TopCard background={darkTheme ? "rgba(255, 255, 255, 0.06)" : "#E9E9E9"}>
                        <SubsBalance>
                            <Small>Ваш номер</Small>
                            345,34
                        </SubsBalance>
                        <Button color="white" background="#4B75FC" fontWeight="bold" fontSize="20px" width="307px" height="44px" round >Пополнить баланс</Button>
                    </TopCard>
                </TopCards>
            </MainSection>          
        </Div>
    )
}
