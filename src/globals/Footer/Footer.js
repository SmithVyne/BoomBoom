import React, { useContext } from 'react';
import { GlobalContext } from '../../App';
import styled from "styled-components";
import {Link} from "react-router-dom";
import instagram from "../../assets/images/instagram.png";
import appstore from "../../assets/images/app-store-badge.png";
import googleplay from "../../assets/images/google-play-badge.png";

import './Footer.css';
const Wrapper = styled.footer`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 0.6fr;
    color: ${props => props.theme.textColor};
    font-size: 20px;
    padding: 60px 42px;
    gap: 30px;
    @media(max-width: 1300px) {
        grid-template-columns: 1fr;
        gap: 40px;
    }
`
const Left = styled.div`
    display: flex;
    flex-direction: column;
`
const Right = styled.div`
    display: flex;
    gap: 50px 30px;
    flex-wrap: wrap;
`

const Menu = styled.div`
    display: flex;
    gap: 25px;
    flex-direction: column;
    @media(max-width: 1300px) {
        gap: 12px;
    }
`
const MenItem = styled(Link)`
    color: ${props => props.theme.textColor};
    text-decoration: none;
`
const Tariffs = styled(MenItem)`
    font-size: 30px;
`

const DoMore = styled.div`
    display: flex;
    gap: 20px 78px;
    margin-top: 30px;
    flex-wrap: wrap;

`
const More = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    align-items: left;
    color: rgba(1, 1, 1, 0.64);
`
const Socials = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
`
const Copyright = styled.small`
    font-weight: 400;
`

export default function Footer() {
    const { darkTheme } = useContext(GlobalContext);
    return (
        <>
            <Wrapper>
            <Left>
                <div>
                    <div style={{fontSize: '30px', fontWeight: "bold"}}>boom telecom - это выгодные тарифы</div>
                    <p className={`footer__text ${darkTheme ? "footer__text_dark" : ""}`}>все актульаные новости и информацию о тарифах вы можете найти <br></br> на сайте и в социальных сетях</p>
                </div>
                <DoMore>
                    <More>
                        <small className={`footer__socials-text ${darkTheme ? "footer__socials-text_dark" : ""}`}>социальные сети</small>
                        <Socials>
                            <a href="/"><img alt="socials" src={instagram} /></a>
                        </Socials>
                    </More>
                    <More>
                        <small className={`footer__socials-text ${darkTheme ? "footer__socials-text_dark" : ""}`}>приложение</small>
                        <Socials>
                            <a href="/"><img alt="download" src={googleplay} /></a>
                            <a href="/"><img alt="download" src={appstore} /></a>
                        </Socials>
                    </More>
                </DoMore>
            </Left>
            <Right>
                <Menu>
                    <MenItem to='/'>О нас</MenItem>
                    <MenItem to='/tariffs'>Тарифы</MenItem>
                    <MenItem to="/roaming">Роуминг</MenItem>
                </Menu>
                <Menu>
                    <MenItem to="/services">Услуги</MenItem>
                    <MenItem to="/numbers">Номера</MenItem>
                    <MenItem to="/organisations">Организациям</MenItem>
                </Menu>
                <Menu>
                    <Tariffs to='/tariffs'>Тарифы</Tariffs>
                    <MenItem to="">Основной</MenItem>
                    <MenItem to="">Яркий</MenItem>
                    <MenItem to="">Расширенный</MenItem>
                    <MenItem to="">Бизнес</MenItem>
                    <MenItem to="">VIP</MenItem>
                </Menu>
            </Right>
            <Copyright>© 2021 ПАО «ААПТЕЛЕКОМ» Все права защищены</Copyright>
            </Wrapper>
            
        </>
        
    )
}
