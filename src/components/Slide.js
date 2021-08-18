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
`
const GoButton = styled.button`
    color: #fff;
    background: #4B75FC;
    box-shadow: 0px 0px 0px 5px rgba(75,117,252,0.36);
    font-size: 24px;
    padding: 20px 16px;
    border: none;
    border-radius: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
`


export default function Slide({slide}) {
    const title = slide.title.split(',');
    const subtitle = slide.subtitle.split(',');

    return (
        <Wrapper>
            <Div>
                <SiteHeader>{title[0]}<br/>{title[1]}</SiteHeader>
                <Subtitle>{subtitle[0]}<br/>{subtitle[1]}</Subtitle>
                <GoButton>Подключить <AiOutlineRight /></GoButton>
            </Div>
        </Wrapper>
    )
}
