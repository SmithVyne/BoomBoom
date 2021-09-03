import { motion } from "framer-motion";
import styled from "styled-components";
import whatsapp from "../assets/images/whatsapp.png";
import skype from "../assets/images/skype.png";
import viber from "../assets/images/viber.png";
import snapchat from "../assets/images/snapchat.png";
import telegram from "../assets/images/telegram.png";
import kakaotalk from "../assets/images/kakao-talk.png";
import wechat from "../assets/images/wechat.png";
import { useEffect, useState } from "react";

const Wrapper = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 80%;
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
    border: 1px solid white;
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
    padding: 11px;
    border-radius: inherit;
`
const Div = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    gap: 4px 8px;
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



export default function TariffCardModal({setShowDropDown}) {
    useEffect(()=>{
        document.addEventListener("mouseover", () => {
            window.innerWidth <= 1024 && setShowDropDown(false)
        })
    }, [])

    return (
        <Wrapper
            initial={{y: '-100%'}}
            animate={{y: 0}}
            exit={{y: '-100%'}}
            transition={{duration: 1, type: 'spring'}}
            onMouseLeave={()=>setShowDropDown(false)}
            onMouseOver={(e)=>{
                e.stopPropagation()
                setShowDropDown(true)
            }}
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
                        <Media><MiniIcon src={whatsapp} /> twitter</Media>
                        <Media><MiniIcon src={whatsapp} /> facebook</Media>
                        <Media><MiniIcon src={whatsapp} /> instagram</Media>
                        <Media><MiniIcon src={whatsapp} /> одноклассники</Media>
                        <Media><MiniIcon src={whatsapp} /> вконтакте</Media>
                    </Div>
                </Section>
                <Section>ererte</Section>
                <Section>ererte</Section>
                <Section>ererte</Section>
            </Sections>
            <Thumb />
        </Wrapper>
    )
}
