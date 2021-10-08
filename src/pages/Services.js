import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import styled from "styled-components/macro"
import bomb from "../assets/images/services/bomb.png"
import Roaming from "../components/Roaming/Roaming"
import TariffBar from "../globals/TariffBar"
import { services, SHOW_MODAL } from "../globals/utils"

const Wrapper = styled.div`
    color: ${({theme}) => theme.textColor};
    font-family: Circe, Arial, sans-serif;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    font-size: 60px;
    font-weight: bold;
    gap: 20px;
    margin: 42px 0;
    img {
        width: 114px;
        height: 114px;
        @media(max-width: 720px) {
            width: 72px;
            height: 72px;
        }
    }
    @media(max-width: 720px) {
        font-size: 40px;
    }
    @media(max-width: 450px) {
        font-size: 24px;
    }
`
const Tabs = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    font-size: 20px;
    margin-bottom: 36px;
    @media(max-width: 450px) {
        font-size: 12px;
        gap: 8px;
    }
`
const Tab = styled.span`
    border: 1px solid #4B6CFD;
    padding: 12px 16px;
    border-radius: 31px;
    cursor: pointer;
    background: ${({type, tab}) => type === tab && "#4B6CFD"};
    color: ${({type, tab}) => type === tab && "#fff"};
    @media(max-width: 720px) {
        padding: 8px 12px;
    }
`

const WrapServices = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    @media(max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
    }
    @media(max-width: 720px) {
        grid-template-columns: 1fr;
    }
`
const Service = styled.div`
    padding: 24px;
    width: 100%;
    background: ${({theme}) => theme.darkTheme ? "rgba(255, 255, 255, 0.07)" : "#FFF"};
    color: inherit;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    .serviceTop {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        color: #4B6CFD;
        font-size: 24px;
        font-weight: bold;
        flex-wrap: wrap;
    }
    .serviceTop img {
        width: 160px;
        height: 160px;
    }
    .serviceBody {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        h3 {
            font-size: 32px;
            font-weight: bold;
            color: inherit;
        }
        .desc {
            font-size: 20px;
            margin-bottom: auto;
        }
        button {
            padding: 12px 24px;
            border-radius: 49px;
            font-size: 24px;
            font-weight: bold;
            color: #4B6CFD;
            background: rgba(75, 108, 253, 0.16);
            width: fit-content;
            border: none;
            cursor: pointer;
            margin-top: 27px;
        }
    }
`

const ServiceComponent = ({service}) => {
    const [posValues, setPosValues] = useState(!service.title && service.positions[0]);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        if(!service.title) {
            service = {...posValues, desc: service.desc}
        }
        dispatch({type: SHOW_MODAL, payload: {service}})
    }
    return (
        <Service>
            <div className="serviceTop">
                <img alt="serviceImg" src={service.img} />
                <span>{!service.title ? posValues.price: service.price}</span>
            </div>
            <div className="serviceBody">
                <h3>{!service.title ? posValues.title: service.title}</h3>
                <span className="desc">{service.desc}</span>
                {!service.title && <TariffBar service={true} handlePositionChange={(position) => setPosValues(service.positions[position])} />}
                <button onClick={handleSubmit}>Подключить</button>
            </div>
        </Service>
    )
}

const tabs = ["Платные", "Бесплатные", "Роуминг"]
export default function Services() {
    const {id} = useParams();
    const [type, settype] = useState(tabs[id]);
    const [roaming, setRoaming] = useState(type === "Роуминг");
    return (
        <Wrapper>
            <Top>
                <img alt="bomb" src={bomb} />
                Бомбезные услуги 
            </Top>
            <Tabs>
                {tabs.map(tab => <Tab key={tab} onClick={()=>{settype(tab); setRoaming(tab === "Роуминг")}} tab={tab} type={type}>{tab}</Tab>)}
            </Tabs>
            {   roaming ? 
                <Roaming /> :
                <WrapServices>
                    {services[type].map((service) => <ServiceComponent key={service.title} service={service} />)}
                </WrapServices>
            }
        </Wrapper>
    )
}
