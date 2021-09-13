import { useContext } from "react";
import styled from "styled-components";
import { themeContext } from "../App";
import Aside from "../components/Aside";
import { Progress } from 'antd'
import { HiDownload } from "react-icons/hi";
import mtc from '../assets/images/mtc.png';

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
    line-height: ${({fontSize}) => fontSize};
    gap: ${({gap}) => gap};
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
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.07)" : "#FFFFFF"};
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
const Details = styled.section`
    display: flex;
    flex-direction: column;
    height: fit-content;
    color: ${({theme}) => theme.textColor};
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.07)" : "#FFFFFF"};
    border-radius: 28px;
    padding: 24px;
    gap: 26px;
`
const Dtitle = styled.span`
    display: flex;
    justify-content: space-between;
    font-size: 40px;
    line-height: 40px;
    font-weight: 650;
`
const Dbody = styled.table`
    width: 100%;
    font-size: 24px;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0px 12px;
    & tr:first-child {
        font-size: 16px;
        font-weight: 550;
        & th {
            padding-left: 24px;
        }
    }
`
const Trows = styled.tr`
    font-size: 24px;
    background: ${({darkTheme}) => darkTheme ? "#242424" : "#f8f8f8"};
    & td {
        padding: 24px;
        line-height: 100%;
    }
    & td:first-child {
        border-radius: 18px 0 0 18px;
    }
    & td:last-child {
        border-radius: 0 18px 18px 0;
    }
    & img{
        width: 30px;
        margin: -10px 3px -7px 0;
    }
`

export default function Dashboard() {
    const {darkTheme} = useContext(themeContext);
    return (
            <Wrapper id="Мой тариф">
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
                            <SubCard darkTheme={darkTheme}>
                                <Small style={{fontWeight: 700}}>Минуты</Small>
                                <Progress strokeColor={darkTheme ? "#4B75FC" : {'100%':'#141DFF', '48.23%':'#3941FF','0%':'#9E19DD'}} width={181} strokeWidth={7} type="dashboard" percent={50} format={() => <ProgressText title="550 мин" sub="из 600" /> } gapDegree={60} />
                            </SubCard>
                            <SubCard darkTheme={darkTheme}>
                                <Small style={{fontWeight: 700}}>Сообщения</Small>
                                <Progress strokeColor={darkTheme ? "#4B75FC" : {'100%':'#141DFF', '48.23%':'#3941FF','0%':'#9E19DD'}} width={181} strokeWidth={7} type="dashboard" percent={80} format={() => <ProgressText title="200 SMS" sub="из 200" /> } gapDegree={60} />
                            </SubCard>
                            <SubCard darkTheme={darkTheme}>
                                <Small style={{fontWeight: 700}}>Интернет</Small>
                                <Progress strokeColor={darkTheme ? "#4B75FC" : {'100%':'#141DFF', '48.23%':'#3941FF','0%':'#9E19DD'}} width={181} strokeWidth={7} type="dashboard" percent={12} format={() => <ProgressText title="11,23 гб." sub="из 12" /> } gapDegree={60} />
                            </SubCard>
                        </SubCards>
                        <Button fontSize="24px" color="white" background="#4B75FC" height="71px" width="100%" round>Добавить номер или перенести старый +</Button>
                        <Details id="Детализация" darkTheme={darkTheme}>
                            <Dtitle>
                                Детализация
                                <Button gap="5px" fontWeight="600" fontSize="24px" color="#4B75FC" background="rgba(75,117,252, 0.12)" width="426px" height="52px" round>
                                    <HiDownload style={{transform: "translateY(2px)"}} /> получите полную детализацию
                                </Button>
                            </Dtitle>
                            <Dbody>
                                <thead>
                                    <tr>
                                        <th>Дата</th>
                                        <th>Действие</th>
                                        <th>Оператор</th>
                                        <th>Длительность</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Trows darkTheme={darkTheme}>
                                        <td>Дата</td>
                                        <td>Действие</td>
                                        <td><img alt="mtc" src={mtc} /> MTC</td>
                                        <td>Длительность</td>
                                    </Trows>
                                </tbody>
                            </Dbody>
                        </Details>
                </MainSection>
            </Wrapper>
    )
}
