import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import { themeContext } from "../App";

const Wrapper = styled(motion.div)`
    background: rgba(0, 0, 0, 0.7);
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
const Form = styled.div`
    display: flex;
    flex-direction: column;
    width: 609px;
    height: 465px;
    border-radius: 32px;
    padding: 24px;
    gap: 16px;
    justify-content: flex-end;
    align-items: center;
    background: ${({theme}) => theme.background};
    position: relative;
    @media(max-width: 500px) {
        height: fit-content;
    }
`
const Instruction = styled.span`
    font-size: 32px;
    color: #121212;
    line-height: 110%;
    width: 96%;
    margin-bottom: 15px;
`
const Field = styled.input`
    width: 100%;
    border-radius: 34px;
    outline: none;
    font-size: 40px;
    font-weight: 500;
    padding: 10px 24px 18px 24px;
    display: flex;
    align-items: center;
    line-height: 0px;
    background: #F8F8F8;
    &::placeholder{
        color: #121212;
        opacity: 20%;
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
`
const Close = styled.span`
    position: absolute;
    top: 24px;
    right: 24px;
    color: ${({theme}) => theme.textColor};
    cursor: pointer
`

export default function LoginForm() {
    const {setLoginForm} = useContext(themeContext)

    useEffect(() => {
        window.addEventListener("scroll", () => setLoginForm(false))
    }, [])
    
    return (
        <Wrapper
        onClick={()=>setLoginForm(false)}>
            <Form onClick={(e)=>e.stopPropagation()}>
                <Close onClick={()=>setLoginForm(false)}><CgClose strokeWidth={1.5} size={29} /></Close>
                <Instruction>Введите номер телефона и пароль для входа в личный кабинет</Instruction>
                <Field phone placeholder="(000) 000 00 00" />
                <Field placeholder="пароль" />
                <Submit>войти</Submit>
            </Form>
        </Wrapper>
    )
}
