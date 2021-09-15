import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import { GlobalContext } from "../App";
import useLocalStorage from "../hooks/useLocalStorage";
import {Fetcher, LOGIN, LOGIN_FAILED} from "./utils";
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.ru';

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
const Error = styled.small `
    color: red;
    font-size: 15px;
    width: 98%;
`

export default function LoginForm() {
    const {darkTheme, setLoginForm} = useContext(GlobalContext)
    const [userSession, setUserSession] = useLocalStorage("userSession");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const logged_in = useSelector(store => store.logged_in);

    useEffect(() => {
        const removeForm = () => setLoginForm(false)
        const ifEscape = (e) => e.key === "Escape" && removeForm()
        document.addEventListener("click", removeForm)
        document.addEventListener("keydown", ifEscape)
        
        return () => {
            document.removeEventListener("click", removeForm);
            document.removeEventListener("keydown", ifEscape);
        }
    }, [setLoginForm])

    const body = {
        method: "login",
        params: { username, password },
        id: username
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        Fetcher(body)
        .then(data => {
            if(data.error) {console.warn(data.error); dispatch({type: LOGIN_FAILED})}
            else {dispatch({type: LOGIN}); setUserSession(data.result)}
        })
        .catch(err => console.log(err))
    }
    console.log(logged_in)
    return (
        <>
        {userSession ? 
            <Redirect to="/dashboard" /> :
            <Wrapper
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            darkTheme={darkTheme}
            onClick={(e)=>{
                e.stopPropagation()
                setLoginForm(false)
            }}>
                <Form darkTheme={darkTheme} onClick={(e)=>e.stopPropagation()}>
                    <Close onClick={()=>setLoginForm(false)}><CgClose strokeWidth={1.5} size={29} /></Close>
                    <Instruction>Введите номер телефона и пароль для входа в личный кабинет</Instruction>
                    {logged_in === -1 && <Error>Неверный логин или пароль</Error>}
                    <Field as={Cleave} options={{
                        phone: true, 
                        phoneRegionCode: 'RU'
                    }} value={username} onChange={({target}) => setUsername(target.value)} type="tel" placeholder="+7 (000) 000 00 00" onFocus={()=>setUsername("+7")} />
                    <Field value={password} onChange={({target}) => setPassword(target.value)} type="password" placeholder="пароль" />
                    <Submit onClick={handleSubmit}>войти</Submit>
                </Form>
            </Wrapper>
        }
        </>
    )
}
