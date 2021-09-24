import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import { GlobalContext } from "../App";
import {Fetcher, GET_PASSWORD, LOGIN_FAILED} from "./utils";
import Cleave from 'cleave.js/react';
import { FaCheck } from "react-icons/fa";


const Wrapper = styled(motion.div)`
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.7)"};
    width: 100%;
    height: 100vh;
    position: fixed;
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
    height: 467px;
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
    & span#check {
        width: 116px;
        height: 116px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #79FFD7;
        margin: 20px 0 50px;
        border-radius: 100%;
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
const GetPassword = styled(Error)`
    color: inherit;
    font-size: 17px;
    & span {
        text-decoration: underline;
        cursor: pointer;
    }
`

export default function LoginForm() {
    const {darkTheme, setLoginForm, userSession, setUserSession} = useContext(GlobalContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const form_status = useSelector(store => store.form_status);
    const apiUsername = username.slice(2, username.length).replaceAll(" ", "");

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
        params: { username: apiUsername, password },
        id: apiUsername
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        Fetcher(body)
        .then(data => {
            if(data.error) {console.warn(data.error); dispatch({type: LOGIN_FAILED})}
            else setUserSession(data.result)
        })
        .catch(err => console.log(err))
    }

    const handleGetPassword = (e) => {
        e.preventDefault();
        Fetcher({method: "sendPassword", params: {ctn: apiUsername}, id: apiUsername})
        .then(() => dispatch({type: GET_PASSWORD}))
    }
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
                    {form_status === -2 ?
                    <>
                        <Instruction style={{textAlign: "center"}}>Ваш пароль должен прийти вам через СМС</Instruction>
                        <span id="check"><FaCheck size={50} /></span>
                    </> : 
                    <>
                        <Instruction>Введите номер телефона и пароль для входа в личный кабинет</Instruction>
                        {form_status === -1 && <Error>Неверный логин или пароль</Error>}
                        <Field as={Cleave} options={{
                            phone: true,
                            phoneRegionCode: 'RU'
                        }} value={username} onChange={({target}) => setUsername(target.value)} type="tel" placeholder="+7 (000) 000 00 00" onFocus={()=>username || setUsername("+7")} />
                        <Field value={password} onChange={({target}) => setPassword(target.value)} type="password" placeholder="пароль" />
                        <GetPassword>Нет пароля? <span onClick={handleGetPassword}>Получить пароль</span></GetPassword>
                    </>
                    }
                    <Submit onClick={form_status === -2 ? handleGetPassword : handleSubmit}>{form_status === -2 ? "Хорошо" : "войти"}</Submit>
                </Form>
            </Wrapper>
        }
        </>
    )
}
