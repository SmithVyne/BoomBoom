import { motion } from 'framer-motion'
import { memo } from 'react'
import { useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import Menu from './Menu'
import ThemeSwitch from './ThemeSwitch';
import usePrevious from "../hooks/usePrevious"

const Wrapper = styled(motion.div)`
    background-color: ${({theme}) => theme.background};
    width: 100vw;
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

export default memo(function MobileNav({setShowMobileNav}) {
    const {pathname} = useLocation();
    const prevPath = usePrevious(pathname)
    useEffect(()=> {
        if(prevPath) {
            prevPath === pathname || setShowMobileNav(false);
        }
    }, [pathname, prevPath, setShowMobileNav]);
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
})
