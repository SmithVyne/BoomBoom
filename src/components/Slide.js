import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import styled from 'styled-components';


const Wrapper = styled.div`
    width: 100%;
    height: 812px;
    border-radius: 44px;
    display: flex;
    justify-content: space-between;
    padding: 129px 55px 0 109px;
    background: url(${({bg}) => bg}) no-repeat;
    background-position: 97% 129px;
`;

const Div = styled.div`
`;

const SiteHeader = styled.h1`
    font-size: 80px;
    font-weight: bold;
    color: #010101;
    line-height: 80px;
`
const Subtitle = styled.p`
    font-size: 40px;
    font-weight: 400;
`
const GoButton = styled.button`
    color: #fff;
    background: #4B75FC;
    box-shadow: 0px 0px 0px 5px rgba(75,117,252,0.36);
    font-size: 24px;
    height: 62px;
    padding: 0 16px;
    border: none;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 50px;
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
