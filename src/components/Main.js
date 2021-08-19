import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slide from './Slide';
import {IoIosArrowDropleft, IoIosArrowDropright} from "react-icons/all";
import hand_with_phone from "../assets/images/hand_with_phone.png";
import peace_hand from "../assets/images/peace_hand.png";
import Tariffs from './Tariffs';


const slides = [
    {
        title: "БУМ! БУМ!, И ты на связи!",
        subtitle: "Тарифы для связи, от 350 руб. в месяц",
        imgUrl: hand_with_phone
    },
    {
        title: "БУМ! БУМ!, И ты в бизнесе!",
        subtitle: "Премиальные тарифы для связи, от 1500 руб. в месяц",
        imgUrl: peace_hand
    }
]

const Carousel = styled.div`
    background: #fff;
    position: relative;
    border-radius: 44px;
    margin-top: 40px;
`
const WrapCtrls = styled.span`
    position: absolute;
    left: 109px;
    bottom: 88px;
    display: flex;
    gap: 31px;
`;

const Smith = styled.span`
    color: #000;
    font-family: 'Calligraffitti', cursive;
    font-size: 45px;
    text-align: center;
`

const Controls = ({move}) => {
    return (
            <>{(slides.length >= 2) &&
            <WrapCtrls>
                <IoIosArrowDropleft onClick={() => move("previous")} cursor="pointer" size={44} />
                <IoIosArrowDropright onClick={() => move()} cursor="pointer" size={44} />
            </WrapCtrls>}</>
    )
}


export default function Main() {
    const [count, setCount] = useState(1);
    const [index, setIndex] = useState(0);
    const [timerId, setTimerId] = useState();
    
    const move = (direction="next") => {
        clearTimeout(timerId);
        if(direction === "next") {
            setCount(count + 1)
        } else {
            if( count === 0 ){
                setCount(slides.length-1)
            }
            else {
                setCount(count - 1)
            }
        }
        setIndex(count%slides.length)
    }

    useEffect(() => {
        const id = setTimeout(() => {
            setCount(count + 1)
            setIndex(count%slides.length)
        }, 5000)
        setTimerId(id);
    }, [count])

    return (
        <main>
            <Carousel>
                <Slide slide={slides[index]} />
                <Controls move={move} />
            </Carousel>
            <Tariffs />
            <Smith>Smith .</Smith>
        </main>
    )
}
