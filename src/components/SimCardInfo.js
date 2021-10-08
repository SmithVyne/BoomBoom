import moment from 'moment';
import { DatePicker, TimePicker } from "antd";
import { useState } from "react";
import styled from "styled-components/macro";
import { GoCalendar } from 'react-icons/go';
import Cleave from 'cleave.js/react';
const { RangePicker } = TimePicker;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${({service}) => service || "36px"};
    gap: 52px;
    & small {
        font-size: 14px;
        color: rgba(1, 1, 1, 0.68);
        margin-top: 7px;
        font-weight: normal;
    }
    & .Способ_получения {
        display: flex;
        flex-direction: column;
        .options {
            margin-top: 12px;
        }
        .timePickers {
            border: 2px solid rgba(1, 1, 1, 0.16);
            border-radius: 13px;
            width: 300px;
            height: 50px;
            font-size: 20px;
            margin-top: 12px;
            input {
                font-size: 17px;
            }
        }
        .timePickers:focus, timePickers:focus {
            border-color: #0E5EF8;
        }
        .address {
            width: 300px;
            height: 50px;
            border: 2px solid rgba(1, 1, 1, 0.16);
            border-radius: 13px;
            padding: 0px 15px;
            outline: none;
            font-size: 19px;
            margin-top: 12px;
        }
        .address:focus, .address:active{
            border-color: #0E5EF8;
        }
    }
    .orderDates {
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 100%;
        flex-wrap: wrap;
    }
    & .input {
        width: 300px;
        height: 60px;
        border-radius: 13px;
        padding: 0 15px;
        outline: none;
        border: 2px solid rgba(1, 1, 1, 0.16);
    }
    & .input:active, .input:focus {
        border-color: #0E5EF8;
    }
    .Переносимый_номер {
        display: flex;
        flex-direction:column;
        input[type=checkbox] {
            width: 24px;
            height: 24px;
        }
        label.checker {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 12px 0 30px;
        }
    }
`
const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    & > span {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
    }
    & button {
        background: #010101;
        width: 300px;
        height: 60px;
        border-radius: 60px;
        border: none;
        color: white;
        cursor: pointer;
        svg {
            transform: rotate(-90deg)
        }
    }
    & > div {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        font-size: 16px;
        font-weight: 500;
        small {
            margin-top: 15px;
        }
    }
`
const Pickup = styled.div`
    display: flex;
    flex-direction: column;
`

const Arrow = () => <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill="#F8F8F8" />
</svg>;

const options = ["Доставка", "Самовывоз", "eSIM"]
export default function SimCardInfo({selected, Option, service, handleSubmit}) { 
    const [selectedOption, setSelectedOption] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [checked, setChecked] = useState(false);
    return (
        <Wrapper service={service}>
            {service ? null :
            <>
                {selected === 0 ? 
                    <>
                        <div className="Способ_получения">
                                Способ получения
                                <div className="options">
                                {options.map((option, idx) => <Option key={option} selected={selectedOption} idx={idx} onClick={()=>setSelectedOption(idx)} className="option">{option}</Option>)}
                                </div>
                                <small>Только Москва и МО</small>
                        </div>
                        {selectedOption === 0 && 
                            <><div className="orderDates">
                                <div className="Способ_получения">
                                    Дата доставки
                                    <DatePicker suffixIcon={<GoCalendar style={{color: "#0E5EF8"}} />} placeholder="Дата доставки" className="timePickers" defaultValue={moment()} format={'DD/MM/YYYY'} />
                                </div>
                                <div className="Способ_получения">
                                    Времия доставки
                                    <RangePicker placeholder={["с", "до"]} className="timePickers" defaultValue={[moment("10:00", 'HH:mm'), moment("14:00", 'HH:mm')]} picker="time" format={'HH:mm'} />
                                </div>
                            </div>
                            <div className="Способ_получения">
                                Адрес доставки в городе Москва
                                <input className="address" type="text" />
                                <small>Доставка 350 Р по МСК / <br /> За МКАД каждый 1 КМ - 50 Р</small>
                            </div></>
                        }
                        {selectedOption === 1 && 
                            <Pickup>
                                
                            </Pickup>
                        } 
                    </>
                        : 
                    <div className="Переносимый_номер">
                        <label>Переносимый номер</label>
                        <Cleave className="input" options={{
                                phone: true,
                                phoneRegionCode: 'RU'
                            }} value={phoneNumber} onChange={({target}) => setPhoneNumber(target.value)} type="tel" placeholder="+7 (000) 000 00 00" onFocus={()=>phoneNumber || setPhoneNumber("+7")} />
                        <label className="checker"><input onChange={()=>setChecked(val => !val)} checked={checked} type="checkbox" />Совпадает с контактным</label>
                        {checked  || 
                        <>
                            <label>Контактный номер</label>
                            <Cleave className="input" options={{
                                phone: true,
                                phoneRegionCode: 'RU'
                            }} type="tel" placeholder="+7 (000) 000 00 00"  />
                        </>}
                    </div>
                }
            </>}
            <Bottom>
                {(selected === 0 || service) && <span>
                    <Cleave className="input" options={{
                            phone: true,
                            phoneRegionCode: 'RU'
                        }} value={phoneNumber} onChange={({target}) => setPhoneNumber(target.value)} type="tel" placeholder="+7 (000) 000 00 00" onFocus={()=>phoneNumber || setPhoneNumber("+7")} />
                    <button onClick={handleSubmit}>Оформить заказ <Arrow /></button>
                </span>}
                <div>
                    Перезвоним в ближайшее время или отправим SMS с подтверждением заказа.
                    <small>Оставляя контактный номер, вы подтверждаете, что ввели свой номер самостоятельно и соглашаетесь с передачей ваших персональных данных.</small>
                </div>
            </Bottom>
        </Wrapper>
    )
}
