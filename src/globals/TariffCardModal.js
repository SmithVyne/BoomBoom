import { motion } from "framer-motion";
import styled from "styled-components";
import whatsapp from "../assets/images/whatsapp.png";
import skype from "../assets/images/skype.png";
import viber from "../assets/images/viber.png";
import snapchat from "../assets/images/snapchat.png";
import telegram from "../assets/images/telegram.png";
import kakaotalk from "../assets/images/kakao-talk.png";
import wechat from "../assets/images/wechat.png";
import vk from "../assets/images/vk.png";
import youtube from "../assets/images/youtube.png";
import facebook from "../assets/images/facebook.png";
import twogis from "../assets/images/2gis.png";
import mailru from "../assets/images/mailru.png";
import twitter from "../assets/images/twitter.png";
import yandexmaps from "../assets/images/yandexmaps.png";
import yandexmail from "../assets/images/yandexmail.png";
import instagram from "../assets/images/instagram.png";
import groupniki from "../assets/images/groupniki.png";
import googlemaps from "../assets/images/googlemaps.png";
import gmail from "../assets/images/gmail.png";
import { useEffect, memo } from "react";

const Wrapper = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 90%;
    background: #f1f1f1;
    border-radius: inherit;
    left: 0;
    top: 0;
    z-index: 3;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Sections = styled.section`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: #010101;
    border-radius: inherit;
`

const Section = styled.section`
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    background-color: white;
    padding: 5px 15px;
    border-radius: inherit;
`
const Div = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    gap: 1px 8px;
`
const Thumb = styled.div`
    width: 49px;
    height: 9px;
    background-color: #D7D7D7;
    border-radius: 4.5px;
`
const Media = styled.span`
    display: flex;
    gap: 8px;
    padding: 4px 6px 4px 0px;
    align-items: center;
    margin: 0;
    font-size: 12px;
`
const Title = styled.p`
    color: rgba(18,18,18,0.6);
    font-size: 15px;
    margin: 0;
`
const MiniIcon = styled.img`
    width: 14px;
`



export default memo(function TariffCardModal({setShowDropDown}) {
    useEffect(()=>{
        document.addEventListener("mouseover", () => {
            window.innerWidth <= 1024 && setShowDropDown(false)
        })
    }, [setShowDropDown])

    return (
        <Wrapper
            initial={{y: '-100%'}}
            animate={{y: 0}}
            exit={{y: '-100%'}}
            transition={{duration: 1, type: 'spring'}}
            onMouseLeave={()=>setShowDropDown(false)}
            onMouseOver={(e)=>e.stopPropagation()}
        >
            <Sections>
                <Section>
                    <Title>Мессенджеры</Title>
                    <Div>
                        <Media><MiniIcon src={whatsapp} /> Whatsapp</Media>
                        <Media><MiniIcon src={skype} /> Skype</Media>
                        <Media><MiniIcon src={viber} /> viber</Media>
                        <Media><MiniIcon src={telegram} /> telegram</Media>
                        <Media><MiniIcon src={snapchat} /> snapchat</Media>
                        <Media><MiniIcon src={wechat} /> wechat</Media>
                        <Media><MiniIcon src={kakaotalk} /> kakaotalk</Media>
                    </Div>
                </Section>
                <Section>
                    <Title>Социальные сети</Title>
                    <Div>
                        <Media><MiniIcon src={twitter} /> twitter</Media>
                        <Media><MiniIcon src={facebook} /> facebook</Media>
                        <Media><MiniIcon src={instagram} /> instagram</Media>
                        <Media><MiniIcon src={groupniki} /> одноклассники</Media>
                        <Media><MiniIcon src={vk} /> вконтакте</Media>
                    </Div>
                </Section>
                <Section>
                    <Title>Карты и навигаторы</Title>
                    <Div>
                        <Media><MiniIcon src={yandexmaps} /> яндекс карты</Media>
                        <Media><MiniIcon src={googlemaps} /> google maps</Media>
                        <Media><MiniIcon src={twogis} /> 2GIS</Media>
                    </Div>
                </Section>
                <Section>
                    <Title>Почтовые сервисы</Title>
                    <Div>
                        <Media><MiniIcon src={mailru} /> mail.ru</Media>
                        <Media><MiniIcon src={gmail} /> gmail</Media>
                        <Media><MiniIcon src={yandexmail} /> яндекс почта</Media>
                    </Div>
                </Section>
                <Section>
                    <Title>Видео</Title>
                    <Div>
                        <Media><MiniIcon src={youtube} /> youtube</Media>
                    </Div>
                </Section>
            </Sections>
            <Thumb />
        </Wrapper>
    )
})
