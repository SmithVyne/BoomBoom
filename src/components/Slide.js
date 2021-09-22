import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import styled from 'styled-components';


const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 30px);
    max-height: 900px;
    border-radius: 44px;
    display: flex;
    justify-content: space-between;
    padding: 129px 55px 0 109px;
    background: url(${({bg}) => bg}) no-repeat;
    background-position: 97% 129px;
    transition: 0.5s ease;
    @media(max-width: 1000px) {
        background: transparent;
        padding: 10%;
        height: fit-content;
    }
`;

const Div = styled.div`
    font-size: 100vw;
`;

const SiteHeader = styled.h1`
    font-size: 5%;
    font-weight: bold;
    color: #010101;
    line-height: 90%;
    @media(max-width: 1000px) {
        font-size: 8%;
    }
`
const Subtitle = styled.p`
    font-size: 2.2%;
    font-weight: 400;
    color: #010101;
    @media(max-width: 1000px) {
        font-size: 4%;
    }
`
const GoButton = styled.button`
    color: #fff;
    background: #4B75FC;
    box-shadow: 0px 0px 0px 5px rgba(75,117,252,0.36);
    font-size: 24px;
    padding: 13px 16px;
    border: none;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 50px;
    @media(max-width: 1000px) {
        font-size: 7%;
    }
`

export default function Slide({slide: {title, subtitle, imgUrl}}) {
    const ttl = title.split(',');
    const subttl = subtitle.split(',');

    return (
        <Wrapper bg={imgUrl}>
            <Div>
                <SiteHeader>{ttl[0]}<br/>{ttl[1]}</SiteHeader>
                <Subtitle>{subttl[0]}<br/>{subttl[1]}</Subtitle>
                <GoButton>Подключить <AiOutlineRight style={{transform: "translateY(10%)"}} /></GoButton>
            </Div>
        </Wrapper>
    )
}
