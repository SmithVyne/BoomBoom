import { AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";
import { GoButton } from "./Slide";
import Hit from "../assets/images/hit.svg";

const Wrapper = styled.div`
    background: ${({background}) => background};
    width: 100%;
    height: 100%;
    color: #fff;
    border-radius: 28px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.p`
    font-size: 44px;
    font-weight: bold;
`;

const SubScribeBtn = styled.button`
    box-shadow: none;
    color: #121212;
    background: #fff;
    width: 60%;
    height: 76px;
    border-radius: 38px;
    border: none;
    outline: none;
    margin: 0;
    font-size: 24px;
    font-weight: semi-bold;
    cursor: pointer;
`

export default function TariffCard({background, title, hit, icon}) {
    return (
        <Wrapper background={background}>
            <span className="card-top">
                <img style={{width: 44}} src={icon} />
                <Title>{title}</Title>
                {hit && <img alt="hit" src={Hit} />}
            </span>
            <span className="card-body">
                <span></span>
            </span>
            <span className="priceInfo">
                350 руб./мес
                <SubScribeBtn>Подключить <AiOutlineRight style={{transform: "translateY(10%)"}} /></SubScribeBtn>
            </span>
        </Wrapper>
    )
}
