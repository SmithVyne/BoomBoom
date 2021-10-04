import { motion } from 'framer-motion'
import { memo } from 'react'
import { CgClose } from 'react-icons/cg'
import styled from 'styled-components'
import { useEscapeKey } from '../hooks'
import Menu from './Menu'
import ThemeSwitch from './ThemeSwitch';

const Wrapper = styled(motion.div)`
    background-color: ${({theme}) => theme.background};
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    padding: 48px 24px 15px;
    top: 0;
    left: 0;
    right: 0;
    @media(max-height: 700px) {
        height: fit-content;
    }
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`

export default memo(function MobileNav({setShowMobileNav}) {
    useEscapeKey(setShowMobileNav);
    return (
        <Wrapper
        initial={{opacity: 0, x: "100%"}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: "100%"}} transition={{duration: 0.5, type: 'spring'}}>
            <Content>
                <Menu setShowMobileNav={setShowMobileNav} />
                <ThemeSwitch />
            </Content>
            <span><CgClose onClick={()=>setShowMobileNav(false)} strokeWidth={1.5} size={35} /></span>
        </Wrapper>
    )
})
