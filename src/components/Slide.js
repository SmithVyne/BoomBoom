import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    width: 100%;
    height: 812px;
    border-radius: 44px;
`;

const SiteHeader = styled.h1`
    font: bold 80px;
    color: #010101;
`


export default function Slide({slide}) {
    const title = slide.title.split(',');

    return (
        <Wrapper>
            <SiteHeader>{title[0]}<br/>{title[1]} </SiteHeader>
        </Wrapper>
    )
}
