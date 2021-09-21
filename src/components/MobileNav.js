import { motion } from 'framer-motion'
import React from 'react'
import { CgClose } from 'react-icons/cg'
import styled from 'styled-components'

const Wrapper = styled(motion.div)`
    background-color: ${({theme}) => theme.background};
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    padding: 48px 24px;
    top: 0;
    left: 0;
    right: 0;
`
const Close = styled.span`
    cursor: pointer
`

export default function MobileNav({setShowMobileNav}) {
    return (
        <Wrapper
        initial={{opacity: 0, x: "100%"}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: "100%"}} transition={{duration: 0.5, type: 'spring'}}>
        Hey
            <Close onClick={()=>setShowMobileNav(false)}><CgClose strokeWidth={1.5} size={35} /></Close>
        </Wrapper>
    )
}
