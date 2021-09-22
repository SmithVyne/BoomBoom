import React, { useContext } from 'react';
import { GlobalContext } from '../../App';
import './Numbers.css';
import searchIcon from '../../assets/images/search.svg'
import { GetNumbers } from '../../globals/utils'
import Loader from '../../globals/Loader/index'

export default function Numbers() {
    const [allNumbers, setAllNumbers] = React.useState(null);
    const [numbers, setNumbers] = React.useState(null);
    const [selectedNumber, setSelectedNumber] = React.useState({});
    const [remainingNumbers, setRemainingNumbers] = React.useState(null);
    const [preloaderVisible, setPreloaderVisible] = React.useState(true);
    const [apiError, setApiError] = React.useState('');
    const [numbersPage, setNumbersPage] = React.useState(0);
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    const { darkTheme } = useContext(GlobalContext);
    const [inputValue, setInputValue] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('Все');
    const [selectedCategoryID, setSelectedCategoryID] = React.useState('all');
    const [isInputFocused, setInputFocused] = React.useState(false);

    function handleResize() {

        setScreenWidth(window.innerWidth)

        window.removeEventListener('resize', handleResize);
    }

    // window.addEventListener('resize', handleResize);

    React.useEffect(() => {

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    React.useEffect(() => {

        GetNumbers().then((res) => {

            if (res.result.length > 0) {
                let numbers = res.result
                // throw new Error()
                setScreenWidth(window.innerWidth)
                setAllNumbers(numbers)
                setPreloaderVisible(false)
            }

        }).catch((err) => {
            setPreloaderVisible(false)
            setApiError('Что то пошло не так')
            console.log(err)
        })

    }, [])

    React.useEffect(() => {

        if (screenWidth >= 1060 && allNumbers) {
            if (inputValue !== '' && selectedCategoryID === 'all') {
                let filterd = allNumbers.filter((item) => {
                    if (item.ctn) {
                        if (item.ctn.includes(inputValue)) {
                            return true
                        }
                        return false
                    }
                    return false


                })

                setNumbers(filterd.slice(0, 20))
                setRemainingNumbers(filterd.slice(20))
            } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                let filterd = allNumbers.filter((item) => {
                    if (item.ctn) {
                        if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                            return true
                        }
                        return false
                    }
                    return false


                })

                setNumbers(filterd.slice(0, 20))
                setRemainingNumbers(filterd.slice(20))
            }
            else if (selectedCategoryID !== 'all' && inputValue === '') {
                let filterd = allNumbers.filter((item) => {
                    if (item.ctn) {
                        if (item.category === Number(selectedCategoryID)) {
                            return true
                        }
                        return false
                    }
                    return false


                })

                setNumbers(filterd.slice(0, 20))
                setRemainingNumbers(filterd.slice(20))
            }
            else if (selectedCategoryID === 'all' && inputValue === '') {


                setNumbers(allNumbers.slice(0, 20))
                setRemainingNumbers(allNumbers.slice(20))
            }


        }
        else
            if (screenWidth >= 500 && window.innerWidth < 1060 && allNumbers) {
                if (inputValue !== '' && selectedCategoryID === 'all') {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.ctn.includes(inputValue)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })

                    setNumbers(filterd.slice(0, 10))
                    setRemainingNumbers(filterd.slice(10))
                } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })

                    setNumbers(filterd.slice(0, 10))
                    setRemainingNumbers(filterd.slice(10))
                }
                else if (selectedCategoryID !== 'all' && inputValue === '') {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === Number(selectedCategoryID)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })

                    setNumbers(filterd.slice(0, 10))
                    setRemainingNumbers(filterd.slice(10))
                }
                else if (selectedCategoryID === 'all' && inputValue === '') {


                    setNumbers(allNumbers.slice(0, 10))
                    setRemainingNumbers(allNumbers.slice(10))
                }


            } else
                if (screenWidth < 500 && allNumbers) {
                    if (inputValue !== '' && selectedCategoryID === 'all') {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.ctn.includes(inputValue)) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })

                        setNumbers(filterd.slice(0, 8))
                        setRemainingNumbers(filterd.slice(8))
                    } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })

                        setNumbers(filterd.slice(0, 8))
                        setRemainingNumbers(filterd.slice(8))
                    }
                    else if (selectedCategoryID !== 'all' && inputValue === '') {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.category === Number(selectedCategoryID)) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })

                        setNumbers(filterd.slice(0, 8))
                        setRemainingNumbers(filterd.slice(8))
                    }
                    else if (selectedCategoryID === 'all' && inputValue === '') {


                        setNumbers(allNumbers.slice(0, 8))
                        setRemainingNumbers(allNumbers.slice(8))
                    }

                } else if (!allNumbers) {
                    setRemainingNumbers([])
                    setNumbers([])

                } else {

                    setRemainingNumbers([])
                    setNumbers(allNumbers)
                }
    }, [allNumbers, screenWidth, inputValue, selectedCategoryID])



    function handleInputChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')
        if (inputValue.length > 10) {
            setInputValue(inputValue);
        }
        else {

            setInputValue(inputValue);
        }



    }
    function handleCategoryChange(category) {
        if (category === selectedCategory) {
            return
        }
        if (category === 'Все') {
            setSelectedCategoryID('all')

        }
        if (category === 'Бриллиантовый') {
            setSelectedCategoryID(6)
        }
        if (category === 'Платиновый') {
            setSelectedCategoryID(4)
        }
        if (category === 'Золотой') {
            setSelectedCategoryID(3)
        }
        if (category === 'Серебрянный') {
            setSelectedCategoryID(2)
        }
        if (category === 'Бронзовый') {
            setSelectedCategoryID(1)
        }

        setSelectedCategory(category)

    }
    function handleCtnClick(item) {

        if (item.ctn === selectedNumber.ctn) {
            setSelectedNumber({})
        } else {
            setSelectedNumber(item)
        }

    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log(selectedNumber)
    }
    function handleFocus(e){
        console.log(e)
        if(isInputFocused){
            setInputFocused(false)
        } else {
            setInputFocused(true)
        }
       
    }
    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit} className={`numbers ${darkTheme ? 'numbers_dark' : ''}`}>
                <h2 className={`numbers__titile ${darkTheme ? 'numbers__titile_dark' : ''}`}>Выберете номер телефона или&nbsp;<span className='numbers__titile_link'>перенести старый</span></h2>
                <div className='numbers__controllers'>
                    <div className={`numbers__input-container ${isInputFocused ? "numbers__input-container_focused": ''}`}>
                        <img className="numbers__input-search-icon" src={searchIcon} alt="Иконка поиска" />

                        <input onBlur={handleFocus} onFocus={handleFocus} className="numbers__input" name="number" type="text" value={inputValue} onChange={handleInputChange} placeholder='Поиск номера' maxLength="10"></input>

                    </div>
                    <div className="numbers__categories">
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Все' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Все' && 'numbers__category_active'}`} onClick={() => handleCategoryChange('Все')}>Все</button>
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Бриллиантовый' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Бриллиантовый' && 'numbers__category_active'}`} onClick={() => handleCategoryChange('Бриллиантовый')} >Бриллиантовый</button>
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Платиновый' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Платиновый' && 'numbers__category_active'}`} onClick={() => handleCategoryChange('Платиновый')} >Платиновый</button>
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Золотой' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Золотой' && 'numbers__category_active'}`} onClick={() => handleCategoryChange('Золотой')} >Золотой</button>
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Серебрянный' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Серебрянный' && 'numbers__category_active'}`} onClick={() => handleCategoryChange('Серебрянный')} >Серебрянный</button>
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Бронзовый' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Бронзовый' && 'numbers__category_active'}`} onClick={() => handleCategoryChange('Бронзовый')} >Бронзовый</button>
                    </div>
                    <div className="numbers__page-buttons">
                        <button type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>

                            <svg className={`numbers__arrow-icon`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                            </svg>

                        </button>
                        <button type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                            </svg>
                        </button>
                    </div>

                </div>
                <div className='numbers__contacts'>
                    {preloaderVisible ? <Loader /> : <></>}
                    {apiError ? <p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>{apiError}</p> : <></>}

                    {numbers && numbers.length > 0 ? numbers.map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}<span className={`numbers__contact_bold ${darkTheme ? 'numbers__contact_bold_dark' : ''}`}>{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</span></p>
                    )) : < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}





                    {/* {numbers && !inputValue && selectedCategoryID !== 'all' && numbers.length > 0 && numbers.map((item, i) => (
                        <p onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}<span className={`numbers__contact_bold ${darkTheme ? 'numbers__contact_bold_dark' : ''}`}>{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</span></p>
                    ))}
                    {numbers && inputValue && selectedCategoryID && selectedCategoryID !== 'all' && numbers.length > 0 ? numbers.map((item, i) => (
                        <p onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}<span className={`numbers__contact_bold ${darkTheme ? 'numbers__contact_bold_dark' : ''}`}>{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</span></p>
                    )) : inputValue && selectedCategoryID !== 'all' ? < p className='numbers__contact'>Ничего не найдено</p> : <></>} */}
                </div>
                <button type="submit" className={`numbers__submit-button ${selectedNumber.ctn ? "numbers__submit-button_active" : "numbers__submit-button_disabled"}`} disabled={selectedNumber.ctn ? false : true}>Заказать номер</button>
            </form>
        </>
    )
}
