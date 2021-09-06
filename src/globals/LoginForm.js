import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import { themeContext } from "../App";

const Wrapper = styled(motion.div)`
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.7)"};
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 609px;
    height: 465px;
    border-radius: 32px;
    padding: 24px;
    gap: 16px;
    justify-content: flex-end;
    align-items: center;
    background: ${({darkTheme, theme}) => darkTheme ? theme.background : "#ffffff"};
    color: ${({theme}) => theme.textColor};
    position: relative;
    @media(max-width: 500px) {
        height: fit-content;
        padding-top: 60px;
    }
`
const Instruction = styled.span`
    font-size: 32px;
    line-height: 110%;
    width: 96%;
    margin-bottom: 15px;
    @media(max-width: 500px) {
        font-size: 25px;
    }
`
const Field = styled.input`
    width: 100%;
    border-radius: 34px;
    outline: none;
    font-size: 40px;
    font-weight: 500;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    line-height: 0px;
    background: #F8F8F8;
    border: none;
    color: #121212;
    &::placeholder{
        color: #121212;
        opacity: 25%;
    }
    @media(max-width: 500px) {
        font-size: 25px;
    }
`
const Submit = styled.button`
    width: 100%;
    height: 68px;
    border-radius: 34px;
    color: #fff;
    background:  #4B75FC;
    font-size: 40px;
    border: none;
    cursor: pointer;
    @media(max-width: 500px) {
        font-size: 25px;
        height: 57px;
    }
`
const Close = styled.span`
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer
`

export default function LoginForm() {
    const {darkTheme, setLoginForm} = useContext(themeContext)
    const removeForm = () => setLoginForm(false)

    useEffect(() => {
        document.addEventListener("click", removeForm)
        return () => document.removeEventListener("click", removeForm)
    }, [setLoginForm])
    
    return (
        <Wrapper
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.3}}
        darkTheme={darkTheme}
        onClick={()=>setLoginForm(false)}>
            <Form darkTheme={darkTheme} onClick={(e)=>e.stopPropagation()}>
                <Close onClick={()=>setLoginForm(false)}><CgClose strokeWidth={1.5} size={29} /></Close>
                <Instruction>Введите номер телефона и пароль для входа в личный кабинет</Instruction>
                <Field type="tel" placeholder="+7 (000) 000 00 00" />
                <Field type="password" placeholder="пароль" />
                <Submit>войти</Submit>
            </Form>
        </Wrapper>
    )
}
