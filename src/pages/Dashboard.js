import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components/macro";
import { GlobalContext } from "../App";
import Aside from "../components/Aside";
import { Progress } from 'antd'
import { HiDownload } from "react-icons/hi";
import mtc from '../assets/images/mtc.png';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../globals/Loader";
import {CREATE_AUTH, Fetcher, parseDetailsFile, percentage, replacePoints, USER } from "../globals/utils";
import html2pdf from "html2pdf.js";
import { spacer } from "../components/BuyNumberModal";
import { RiFileCopyLine } from "react-icons/ri";
import { useLocalStorage } from "../hooks";
import { decode } from 'js-base64';

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
    @media(max-width: 1100px) {
        padding-right: 0px;
    }
    #Детализация {
        overflow-x: auto;
    }
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
    max-width: 100%;
    max-height: fit-content;
    padding: 20px 16px;
`;

const Small = styled.small`
    font-size: 16px;
    line-height: 50%;
    font-weight: 500;
`;
const Cards = styled.div`
    display: grid;
    gap: 20px;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    font-family: Circe;
    @media(max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
    }
    @media(max-width: 550px) {
        grid-template-columns: 1fr;
    }
    #Абонентская_плата {
        font-size: 24px;
        height: 71px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 71px;
        font-weight: 550;
    }
`
const TopCard = styled.div` 
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.09)" : "#FFFFFF"};
    height: 123px;
    border-radius: 32px;
    padding: 20px;
    max-height: fit-content;
    .topCardTitle {
        font-size: 20px;
        color: ${({darkTheme}) => darkTheme ? "#FFFFFFAD" : "#010101AD"};
    }
    .topCardBody {
        font-size: 24px;
        color: ${({color}) => color};
        display: flex;
        align-items: center;
        gap: 11px;
        font-weight: bold;
    }
`;
const SubCard = styled(TopCard)`
    align-items: center;
    margin: 0;
    padding: 24px;
    height: 266px;
    gap: 20px;
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
    const {darkTheme} = useContext(GlobalContext);
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
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.09)" : "#FFFFFF"};
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
    gap: 20px;
    position: sticky;
    left: 0;
    flex-wrap: wrap;
`
const Dbody = styled.table`
    width: 100%;
    min-width: 1000px;
    font-size: 24px;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0px 12px;
    thead tr {
        font-size: 16px;
        font-weight: 550;
        & th {
            padding-left: 24px;
        }
    }

    tbody tr td:first-child span{
        margin: 0 5px 0 8px;
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
const Copier = styled(RiFileCopyLine)`
    cursor: pointer;
    &:hover {
        transform: scale(1.04);
    }
`

const DownloadBtn = styled.button`
    width: fit-content;
    height: 52px;
    max-width: 100%;
    max-height: fit-content;
    padding: 12px 24px 16px 24px;
    background: #4B75FC1F;
    color: #4B75FC;
    font-size: 24px;
    border: none;
    border-radius: 69px;
    line-height: 24px;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 5px;
    text-align: center;
    @media(max-width: 720px) {
        padding: 12px 12px 16px 12px;
        font-size: 16px;
        line-height: 16px;
        width: fit-content;
        max-width: fit-content;
        height: fit-content;
    }
`
const Name = styled.div`
    font-weight: 700;
    font-size: 44px;
    color: inherit;
    line-height: 100%;
    @media(max-width: 1280px) {
        font-size: 32px;
    }
    @media(max-width: 600px) {
        font-size: 20px;
    }
`

const getDashboard = (ctn, accessToken, dispatch) => { 
    Promise.all([
        Fetcher({method: "getCtnInfo", params:{ctn}, id:null}),
        Fetcher({method: "getCustomerData", params:{id: ctn}, id:null}, {accessToken}),
        Fetcher({method: "getDetailsFile", params:{idToSearch: ctn, period: "2021M09", encoding: "utf-8",}, id:null}, {accessToken}),
    ])
    .then(([userInfo, userData, detailsFile]) => dispatch({type: USER, user: {userInfo, userData, detailsFile}}))
}

export default function Dashboard() {
    const {darkTheme, setLoginForm} = useContext(GlobalContext);
    const {userInfo, userData, detailsFile} = useSelector(store => store.auth.user);
    const {accessToken, refreshToken} = useSelector(store => store.auth);
    if(userInfo) var {VOICE, SMS_MMS, INTERNET} = userInfo.rests;
    const dispatch = useDispatch();
    const [ctn] = useLocalStorage("ctn");
    const [copied, setCopied] = useState(false);
    const detailsRef = useRef();
    const details = useMemo(() => detailsFile && parseDetailsFile(decode(detailsFile.file)), [detailsFile]);

    useEffect(() => {
        if (accessToken) {
            getDashboard(ctn, accessToken, dispatch)
        } 
        else if(refreshToken) {
            Fetcher({method: "refreshToken", params:{username: ctn, refreshToken}, id:null})
                .then(result => {
                    const {accessToken, refreshToken} = result;
                    dispatch({type: CREATE_AUTH, payload: {accessToken, refreshToken}})
                })
        } 
        else setLoginForm(true)
    }, [accessToken, refreshToken, dispatch, setLoginForm, ctn]);

    const handleDownload = () => {
        html2pdf().from(detailsRef.current).save("Детализация.pdf");
    }
    const handleCopy = () => {
        navigator.clipboard.writeText("+7"+userInfo.ctn).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 60000);
        });
    }

    return (
            <>
            {!userInfo ? <Loader /> : 
            <Wrapper id="Мой тариф">
                <Aside />
                <MainSection>
                    <Name>{userData.owner}</Name>
                    <Cards>
                        <TopCard darkTheme={darkTheme}>
                            <span className="topCardTitle">Номер:</span>
                            <span className="topCardBody">
                                {"+7 "+spacer(userInfo.ctn)}
                                <Copier onClick={handleCopy} color={copied ? "#4B75FC" : darkTheme ? "#fff" : "#010101AD"} size={23} />
                            </span>
                        </TopCard>
                        <TopCard color="#4B75FC" darkTheme={darkTheme}>
                            <span className="topCardTitle">Тариф:</span>
                            <span className="topCardBody">
                                {userInfo.plan + " ₽"}
                            </span>
                        </TopCard>
                        <TopCard color={userInfo.balance < 0 ? "#FF0202" : "#32A43E"} darkTheme={darkTheme}>
                            <span className="topCardTitle">Баланс:</span>
                            <span className="topCardBody">
                                {replacePoints(userInfo.balance)+ " ₽"}
                            </span>
                        </TopCard>

                        <SubCard darkTheme={darkTheme}>
                            <Small style={{fontWeight: 700}}>Минуты</Small>
                            <Progress strokeColor="#4B75FC" width={181} strokeWidth={7} type="dashboard" percent={percentage(VOICE.current, VOICE.initial)} format={() => <ProgressText title={`${VOICE.current} мин`} sub={`из ${VOICE.initial}`} /> } gapDegree={60} />
                        </SubCard>
                        <SubCard darkTheme={darkTheme}>
                            <Small style={{fontWeight: 700}}>Интернет</Small>
                            <Progress strokeColor="#4B75FC" width={181} strokeWidth={7} type="dashboard" percent={percentage(INTERNET.current, INTERNET.initial)} format={() => <ProgressText title={`${replacePoints(INTERNET.current)} гб.`} sub={`из ${INTERNET.initial}`} /> } gapDegree={60} />
                        </SubCard>
                        <SubCard darkTheme={darkTheme}>
                            <Small style={{fontWeight: 700}}>Сообщения</Small>
                            <Progress strokeColor="#4B75FC" width={181} strokeWidth={7} type="dashboard" percent={percentage(SMS_MMS.current, SMS_MMS.initial)} format={() => <ProgressText title={`${SMS_MMS.current} SMS`} sub={`из ${SMS_MMS.initial}`} /> } gapDegree={60} />
                        </SubCard>
                        <Button fontSize="24px" color="#4B75FC" background="#4B75FC29" height="71px" width="100%" round>Изменить номер</Button>
                        <Button fontSize="24px" color="white" background="#4B75FC" height="71px" width="100%" round>Сменить тариф</Button>
                        <span id="Абонентская_плата">Абонентская плата в месяц: </span>
                    </Cards>
                    <Details id="Детализация" darkTheme={darkTheme}>
                        <Dtitle>
                            Детализация
                            <DownloadBtn onClick={handleDownload}> <HiDownload /> получите полную детализацию</DownloadBtn>
                        </Dtitle>
                        <Dbody ref={detailsRef}>
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Действие</th>
                                    <th>Оператор</th>
                                    <th>Длительность</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details && details.slice(0, details.length - 1).map(detail => (
                                    <Trows key={detail["Время звонка"]} darkTheme={darkTheme}>
                                        <td>{detail["Дата звонка"]} <span>/</span> {detail["Время звонка"]}</td>
                                        <td>Звонок ({"+7 " + spacer(detail["Входящий номер"])})</td>
                                        <td><img alt="Оператор" src={mtc} />MTC</td>
                                        <td>{detail["Продолжительность звонка"]}</td>
                                    </Trows>
                                ))}
                            </tbody>
                        </Dbody>
                    </Details>
                </MainSection>
                </Wrapper>}
            </>
    )
}
