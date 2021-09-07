import { useContext } from "react";
import styled from "styled-components";
import { themeContext } from "../App";
import Aside from "../components/Aside";
import { Progress } from 'antd'

const Wrapper = styled.div`
    padding-top: 50px;
    display: flex;
    gap: 0px 100px;
    width: 100%;
`;
const MainSection = styled.div`
    padding-right: 100px;
    width: 100%;
    row-gap: 20px;
    display: flex;
    flex-direction: column;
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
    font-size: 25px;
`
const Small = styled.small`
    font-size: 12px;
    line-height: 50%;
    font-weight: 500;
`;
const SubsNumber = styled.span`
    font-size: 40px;
    display: flex;
    flex-direction: column;
    line-height: 50%;
    gap: 16px;
`
const SubsBalance = styled(SubsNumber)`
    font-size: 80px;
    gap: 25px;
`
const Div = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const SubCards = styled(TopCards)`
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
`
const SubCard = styled(TopCard)`
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 24px;
    height: 266;
`
const Span = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({theme}) => theme.textColor};
    gap: 4px;
`
const Ptitle = styled.span`
    font-size: 28px;
    font-weight: 700;
`
const Psub = styled.span`
    font-size: 20px;
    color: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.6)" : 'rgba(18,18,18, 0.6)'};
`
const ProgressText = ({title, sub}) => {
    const {darkTheme} = useContext(themeContext);
    return (
    <Span>
        <Ptitle>{title}</Ptitle>
        <Psub darkTheme={darkTheme}>{sub}</Psub>
    </Span>)
}

export default function Dashboard() {
    const {darkTheme} = useContext(themeContext);
    return (
        <Wrapper>
            <Aside />
            <MainSection>
                <TopCards>
                    <TopCard color="white" background={darkTheme ? 
                        "linear-gradient(148.41deg, #4B5AFD 0%, #4B38FE 100%)" : 
                        "radial-gradient(78.33% 96.51% at 14.73% 63.17%, #324E69 0%, #000000 100%)"}>
                            <Div>
                                <TarifName>Тариф: Бизнес за 1500</TarifName>
                                <SubsNumber>
                                    <Small style={{paddingLeft: 10}}>Ваш номер</Small>
                                    +7 999 999 99 99
                                </SubsNumber>
                            </Div>
                            <Button background="white" fontSize="20px" fontWeight="bold" width="307px" height="44px" round >Улучшить</Button>
                    </TopCard>
                    <TopCard background={darkTheme ? "rgba(255, 255, 255, 0.07)" : "#FFFFFF"}>
                        <SubsBalance>
                            <Small>Ваш номер</Small>
                            345,34 ₽
                        </SubsBalance>
                        <Button color="white" background="#4B75FC" fontWeight="bold" fontSize="20px" width="307px" height="44px" round >Пополнить баланс</Button>
                    </TopCard>
                </TopCards>
                <SubCards>
                        <SubCard background={darkTheme ? "rgba(255, 255, 255, 0.07)" : "#FFFFFF"}>
                            <Small style={{fontWeight: 700}}>Минуты</Small>
                            <Progress strokeColor={darkTheme ? "#4B75FC" : {'100%':'#141DFF', '48.23%':'#3941FF','0%':'#9E19DD'}} width={181} strokeWidth={7} type="dashboard" percent={50} format={() => <ProgressText title="550 мин" sub="из 600" /> } gapDegree={60} />
                        </SubCard>
                        <SubCard background={darkTheme ? "rgba(255, 255, 255, 0.07)" : "#FFFFFF"}>
                            <Small style={{fontWeight: 700}}>Сообщения</Small>
                            <Progress strokeColor={darkTheme ? "#4B75FC" : {'100%':'#141DFF', '48.23%':'#3941FF','0%':'#9E19DD'}} width={181} strokeWidth={7} type="dashboard" percent={80} format={() => <ProgressText title="200 SMS" sub="из 200" /> } gapDegree={60} />
                        </SubCard>
                        <SubCard background={darkTheme ? "rgba(255, 255, 255, 0.07)" : "#FFFFFF"}>
                            <Small style={{fontWeight: 700}}>Интернет</Small>
                            <Progress strokeColor={darkTheme ? "#4B75FC" : {'100%':'#141DFF', '48.23%':'#3941FF','0%':'#9E19DD'}} width={181} strokeWidth={7} type="dashboard" percent={12} format={() => <ProgressText title="11,23 гб." sub="из 12" /> } gapDegree={60} />
                        </SubCard>
                    </SubCards>
                    <Button fontSize="24px" color="white" background="#4B75FC" height="71px" width="100%" round>Добавить номер или перенести старый +</Button>
            </MainSection>         
        </Wrapper>
    )
}
