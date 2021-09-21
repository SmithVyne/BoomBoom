import { motion } from 'framer-motion'
import React from 'react'
import { CgClose } from 'react-icons/cg'
import styled from 'styled-components'
import Menu from './Menu'
import ThemeSwitch from './ThemeSwitch'

const Wrapper = styled(motion.div)`
    background-color: ${({theme}) => theme.background};
    width: 100vw;
    height: ${() => window.innerHeight < 700 ? "fit-content" : "100vh"};
    position: absolute;
    top: 0;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    padding: 48px 24px 0;
    top: 0;
    left: 0;
    right: 0;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`
const Call = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    & a {
        font-size: 24px;
        color: inherit;
        border-bottom: 2px solid;
    }
`

export default function MobileNav({setShowMobileNav}) {
    return (
        <Wrapper
        initial={{opacity: 0, x: "100%"}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: "100%"}} transition={{duration: 0.5, type: 'spring'}}>
            <Content>
                <Menu />
                <ThemeSwitch />
                <Call>отдел подключения<a href="tel:84951352404">8 495 135 24 04</a></Call>
            </Content>
            <span><CgClose onClick={()=>setShowMobileNav(false)} strokeWidth={1.5} size={35} /></span>
        </Wrapper>
    )
}
