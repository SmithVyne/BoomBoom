import React, { useState } from "react";
import "./header.css";
import icon1 from '../../assets/images/ico1.svg'
import icon2 from '../../assets/images/ico2.svg'
import icon3 from '../../assets/images/ico3.svg'
import icon4 from '../../assets/images/ico4.svg'

export default function Section(props) {
  const [callWrap, setCallWrap] = useState(false);
  const [smsWrap, setSmsWrap] = useState(false);
  const [internetWrap, setInternetWrap] = useState(false);

  return (
    <>
      {
        props.tariff.name ? <div>
          <section className="base-container content-wrapper">
            <div className="wrap">
              <div className={`blok-data ${props.darkTheme ? 'blok-data_dark' : ''}`}>
                <img className="blok-data__icon" src={icon1} alt="Иконка" />
                <h2>Основное</h2>
                <div className={`blok-data__info d-flex-wrap ${props.darkTheme ? 'blok-data__info_dark' : ''}`}>
                  <div>
                    Абонентская плата <span>{props.tariff.price} руб.</span>
                  </div>
                  <div>
                    Звонки <span>от {props.tariff.callMin} до {props.tariff.callMax}</span>
                  </div>
                  <div>
                    Интернет (Гб) <span>от {props.tariff.gbMin} до {props.tariff.gbMax}</span>
                  </div>
                  <div>
                    SMS и MMS <span>{props.tariff.sms}</span>
                  </div>
                </div>
              </div>
              <div className="blok-data-row row">
                <div className="col">
                  <div className={`blok-data ${props.darkTheme ? 'blok-data_dark' : ''}`}>
                    <img className="blok-data__icon" src={icon2} alt="Иконка" />
                    <h2>Звонки</h2>
                    <div className={`blok-data__info ${props.darkTheme ? 'blok-data__info_dark' : ''}`}>
                      <div className="d-i">
                        <i>Звонки на все номера России (мин.) </i>{" "}
                        <span>от {props.tariff.callMin} до {props.tariff.callMax}</span>
                      </div>
                      <div className="select-block">
                        <div
                          className="a-sel"
                          onClick={() => setCallWrap(!callWrap)}
                        >
                          <div className={`select-block__click ${callWrap ? "select-block__click_active" : ""} ${props.darkTheme ? 'select-block__click_dark' : ''}`}>
                            Оплачивается отдельно
                            <svg className={`select-block__click-tick ${callWrap ? "select-block__click-tick_active" : ""}`} width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.6231 0.831347L8.00076 7.4553L1.37841 0.83055C1.06268 0.514817 0.551935 0.514817 0.236202 0.83055C-0.0787339 1.14628 -0.0787339 1.65782 0.236202 1.97355L7.4293 9.16904C7.74423 9.48477 8.25577 9.48477 8.5707 9.16904L15.7638 1.97362C16.0787 1.65789 16.0787 1.14555 15.7638 0.829819C15.4497 0.515614 14.9381 0.515614 14.6231 0.831347Z" fill={props.darkTheme ? '#fff' : '#010101'} />
                            </svg>
                          </div>
                        </div>
                        {callWrap && (
                          <div onClick={() => setCallWrap(!callWrap)}  className={`select-block__wrap ${props.darkTheme ? 'select-block__wrap_dark' : ''}`}>
                            <h3>
                              Тарификация сверх включенных в пакет объемов услуг
                            </h3>
                            <p>
                              <i>
                                Исходящие вызовы в сети «Билайн» на номера всех
                                операторов всей РФ, кроме Билайн (за 1 минуту) -<span>2 ₽</span>
                              </i>
                              
                            </p>
                            <p>
                              <i>
                                Исходящие вызовы в сети «Билайн» на все номера
                                «Билайн» (за 1 минуту) -<span>0 ₽</span>
                              </i>
                              
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className={`blok-data ${props.darkTheme ? 'blok-data_dark' : ''}`}>
                    <img className="blok-data__icon" src={icon3} alt="Иконка" />
                    <h2>Собщения</h2>
                    <div className={`blok-data__info ${props.darkTheme ? 'blok-data__info_dark' : ''}`}>
                      <div className="d-i">
                        <i>Исходящие SMS и MMS (шт) по РФ</i> <span>{props.tariff.sms}</span>
                      </div>
                      <div className="select-block">
                        <div className="a-sel" onClick={() => setSmsWrap(!smsWrap)}>
                          <div className={`select-block__click ${smsWrap ? "select-block__click_active" : ""} ${props.darkTheme ? 'select-block__click_dark' : ''}`}>
                            Оплачивается отдельно
                            <svg className={`select-block__click-tick ${smsWrap ? "select-block__click-tick_active" : ""}`} width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.6231 0.831347L8.00076 7.4553L1.37841 0.83055C1.06268 0.514817 0.551935 0.514817 0.236202 0.83055C-0.0787339 1.14628 -0.0787339 1.65782 0.236202 1.97355L7.4293 9.16904C7.74423 9.48477 8.25577 9.48477 8.5707 9.16904L15.7638 1.97362C16.0787 1.65789 16.0787 1.14555 15.7638 0.829819C15.4497 0.515614 14.9381 0.515614 14.6231 0.831347Z" fill={props.darkTheme ? '#fff' : '#010101'} />
                            </svg>
                          </div>
                        </div>
                        {smsWrap && (
                          <div onClick={() => setSmsWrap(!smsWrap)} className={`select-block__wrap ${props.darkTheme ? 'select-block__wrap_dark' : ''}`}>
                            <h3>
                              Тарификация сверх включенных в пакет объемов услуг
                            </h3>
                            <p>
                              SMS в сети «Билайн» (за 1 SMS) -<span>2 ₽</span>
                            </p>
                            <p>
                              MMS в сети «Билайн» (за 1 MMS) -<span>6,45 ₽</span>
                              
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`blok-data ${props.darkTheme ? 'blok-data_dark' : ''}`}>
                <img className="blok-data__icon" src={icon4} alt="Иконка" />
                <h2>Интернет</h2>
                <div className={`blok-data__info d-int-wrap ${props.darkTheme ? 'blok-data__info_dark' : ''}`}>
                  <div className="d-i">
                    <i>Мобильный интернет (Гб) по РФ</i> <span>от {props.tariff.gbMin} до {props.tariff.gbMax}</span>
                  </div>
                  <div className="d-i">
                    <i>Безлимит на интернет-сервисы</i>{" "}
                    <span>
                      Безлимит на мессенджеры, соц. сети, карты, почтовые сервисы,
                      музыка, видео
                    </span>
                  </div>
                </div>

                <div className="select-block">
                  <div className="a-sel" onClick={() => setInternetWrap(!internetWrap)}>
                    <div className={`select-block__click ${internetWrap ? "select-block__click_active" : ""} ${props.darkTheme ? 'select-block__click_dark' : ''}`}>
                      Оплачивается отдельно
                      <svg className={`select-block__click-tick ${internetWrap ? "select-block__click-tick_active" : ""}`} width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6231 0.831347L8.00076 7.4553L1.37841 0.83055C1.06268 0.514817 0.551935 0.514817 0.236202 0.83055C-0.0787339 1.14628 -0.0787339 1.65782 0.236202 1.97355L7.4293 9.16904C7.74423 9.48477 8.25577 9.48477 8.5707 9.16904L15.7638 1.97362C16.0787 1.65789 16.0787 1.14555 15.7638 0.829819C15.4497 0.515614 14.9381 0.515614 14.6231 0.831347Z" fill={props.darkTheme ? '#fff' : '#010101'} />
                      </svg>
                    </div>
                  </div>
                  {internetWrap && (
                    <div onClick={() => setInternetWrap(!internetWrap)}  className={`select-block__wrap ${props.darkTheme ? 'select-block__wrap_dark' : ''}`}>
                      <h3>Дополнительные услуги</h3>
                      <p>
                        Раздача интернета на другие устройства -<span>100 ₽</span>
                      </p>
                      <p>
                        Безлимитный интернет 4G -<span>300 ₽</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div> :
          <div className="section-holder"></div>
      }
    </>

  );
}
