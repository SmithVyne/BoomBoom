import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import LogoImg from "../TariffePage/img/logo.png"

export default function header(props) {

  return (
    <div className="wrap">
      <ul className={`crumbs ${props.darkTheme? 'crumbs_dark':''}`}>
        <li >
          <Link className={props.darkTheme? 'crumbs-first_dark':''} to="/tariffs">тарифы</Link>
        </li>
        <li>{props.tariff.name ? props.tariff.name : 'Неизвестный тариф'}</li>
      </ul>
      <div className={`box-logo d-flex ${props.darkTheme? 'logo_dark':''}`}>
        <img src={props.tariff.img ? props.tariff.img : LogoImg} alt='Иконка тарифа' />
        <h1>{props.tariff.name ? props.tariff.name : 'Похоже такого тарифа нет'}</h1>
      </div>
      {props.tariff.name ?
        <div className="info-l d-flex">
          <div className="info-l-wrap">
            <span className="t1"></span>
            <span className="t2"></span>
            <span className="t3"></span>
            <div className="info-l-wrap-in">
              <span>
                Подключите <br />с eSIM!
              </span>
              <a className="url-pd" href="/">
                Подключить
              </a>
            </div>
          </div>

          <div className="info-l-wrap info-l-wrap2">
            <div className="info-l-wrap-in">
              <span>
                Скачивайте мобильное <br />
                приложение
              </span>
              <a className="url-pd2" href="/">
                Скачать
              </a>
            </div>
          </div>
        </div> :
        <>
        </>}

    </div>
  );
}
