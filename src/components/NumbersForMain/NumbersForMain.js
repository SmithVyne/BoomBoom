import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalContext } from '../../App';
import './NumbersForMain.css';
import searchIcon from '../../assets/images/search.svg'
import { GetNumbers } from '../../globals/utils'
import Loader from '../../globals/Loader/index'

function NumbersForMain(props) {
    const [allNumbers, setAllNumbers] = React.useState(null);
    const [numbers, setNumbers] = React.useState(null);
    const [selectedNumber, setSelectedNumber] = React.useState({});
    const [preloaderVisible, setPreloaderVisible] = React.useState(true);
    const [apiError, setApiError] = React.useState('');
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    const { darkTheme } = useContext(GlobalContext);
    const [inputValue, setInputValue] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('Все');
    const [selectedCategoryID, setSelectedCategoryID] = React.useState('all');
    const [isInputFocused, setInputFocused] = React.useState(false);
    const [filteredNumbers, setFilteredNumbers] = React.useState(null);


    const [page, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(0);

    const [numbersByCategories, setNumbersByCategories] = React.useState({
        category_bronz: [],
        category_silver: [],
        category_gold: [],
        category_plat: [],
        category_briliant: []

    });


    function handleResize() {
        setScreenWidth(window.innerWidth)
        window.removeEventListener('resize', handleResize);
    }
    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    React.useEffect(() => {

        GetNumbers().then((res) => {

            if (res.result.length > 0) {
                let numbers = res.result.filter((item) => {
                    if (item.ctn) {
                        if (item.category && (item.category === 1 || item.category === 2 || item.category === 3 || item.category === 4 || item.category === 5 || item.category === 6)) {
                            return true
                        }
                        return false
                    }
                    return false


                })
                console.log(numbers.length)

                for (let i = 0; i < numbers.length - 1; i++) {

                    if (numbers[i].category === 1 && numbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === 1) {
                                return true
                            }
                            return false
                        }
                        return false
                    }).length > 1) {

                        // numbersByCategories.category_bronz 
                        setNumbersByCategories(numbersByCategories => ({
                            ...numbersByCategories,
                            category_bronz: [...numbersByCategories.category_bronz, numbers[i]]
                        }))

                    }
                    if (numbers[i].category === 2 && numbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === 2) {
                                return true
                            }
                            return false
                        }
                        return false
                    }).length > 1) {

                        // numbersByCategories.category_bronz 
                        setNumbersByCategories(numbersByCategories => ({
                            ...numbersByCategories,
                            category_silver: [...numbersByCategories.category_silver, numbers[i]]
                        }))

                    }
                    if ((numbers[i].category === 3 || numbers[i].category === 4 || numbers[i].category === 5) && numbers.filter((item) => {
                        if (item.ctn) {
                            if ((numbers[i].category === 3 || numbers[i].category === 4 || numbers[i].category === 5)) {
                                return true
                            }
                            return false
                        }
                        return false
                    }).length > 1) {

                        // numbersByCategories.category_bronz 
                        setNumbersByCategories(numbersByCategories => ({
                            ...numbersByCategories,
                            category_gold: [...numbersByCategories.category_gold, numbers[i]]
                        }))

                    }
                    if (numbers[i].category === 6 && numbers.filter((item) => {
                        if (item.ctn) {
                            if (numbers[i].category === 6) {
                                return true
                            }
                            return false
                        }
                        return false
                    }).length > 1) {

                        // numbersByCategories.category_bronz 
                        setNumbersByCategories(numbersByCategories => ({
                            ...numbersByCategories,
                            category_plat: [...numbersByCategories.category_plat, numbers[i]]
                        }))

                    }
                }

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
        if (inputValue !== '') {
            setFilteredNumbers(allNumbers.filter((item) => {
                if (item.ctn) {
                    if (item.ctn.includes(inputValue)) {
                        return true
                    }
                    return false
                }
                return false


            }))
        }
        if (screenWidth >= 1060 && allNumbers) {

            setItemsPerPage(20)
            console.log(numbersByCategories)
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

            } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                if (selectedCategoryID === 3) {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.ctn.includes(inputValue) && (item.category === 3 || item.category === 4 || item.category === 5)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 20))

                } else {

                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 20))

                }

            }
            else if (selectedCategoryID !== 'all' && inputValue === '') {
                if (selectedCategoryID === 3) {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === 3 || item.category === 4 || item.category === 5) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 20))

                } else {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === Number(selectedCategoryID)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 20))

                }

            }
            else if (selectedCategoryID === 'all' && inputValue === '') {


                setNumbers(allNumbers.slice(0, 20))

            }


        }
        else
            if (screenWidth >= 500 && window.innerWidth < 1060 && allNumbers) {
                setItemsPerPage(10)
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

                } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                    if (selectedCategoryID === 3) {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.ctn.includes(inputValue) && (item.category === 3 || item.category === 4 || item.category === 5)) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })
                        setFilteredNumbers(filterd)
                        setNumbers(filterd.slice(0, 10))

                    } else {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })
                        setFilteredNumbers(filterd)
                        setNumbers(filterd.slice(0, 10))

                    }

                }
                else if (selectedCategoryID !== 'all' && inputValue === '') {
                    if (selectedCategoryID === 3) {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.category === 3 || item.category === 4 || item.category === 5) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })
                        setFilteredNumbers(filterd)
                        setNumbers(filterd.slice(0, 10))

                    } else {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.category === Number(selectedCategoryID)) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })
                        setFilteredNumbers(filterd)
                        setNumbers(filterd.slice(0, 10))

                    }

                }
                else if (selectedCategoryID === 'all' && inputValue === '') {


                    setNumbers(allNumbers.slice(0, 10))

                }


            } else
                if (screenWidth < 500 && allNumbers) {
                    setItemsPerPage(8)
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

                    } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                        if (selectedCategoryID === 3) {
                            let filterd = allNumbers.filter((item) => {
                                if (item.ctn) {
                                    if (item.ctn.includes(inputValue) && (item.category === 3 || item.category === 4 || item.category === 5)) {
                                        return true
                                    }
                                    return false
                                }
                                return false


                            })
                            setFilteredNumbers(filterd)
                            setNumbers(filterd.slice(0, 8))

                        } else {
                            let filterd = allNumbers.filter((item) => {
                                if (item.ctn) {
                                    if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                                        return true
                                    }
                                    return false
                                }
                                return false


                            })
                            setFilteredNumbers(filterd)
                            setNumbers(filterd.slice(0, 8))

                        }
                    }
                    else if (selectedCategoryID !== 'all' && inputValue === '') {
                        if (selectedCategoryID === 3) {
                            let filterd = allNumbers.filter((item) => {
                                if (item.ctn) {
                                    if (item.category === 3 || item.category === 4 || item.category === 5) {
                                        return true
                                    }
                                    return false
                                }
                                return false


                            })
                            setFilteredNumbers(filterd)
                            setNumbers(filterd.slice(0, 8))

                        } else {
                            let filterd = allNumbers.filter((item) => {
                                if (item.ctn) {
                                    if (item.category === Number(selectedCategoryID)) {
                                        return true
                                    }
                                    return false
                                }
                                return false


                            })
                            setFilteredNumbers(filterd)
                            setNumbers(filterd.slice(0, 8))

                        }
                    }
                    else if (selectedCategoryID === 'all' && inputValue === '') {


                        setNumbers(allNumbers.slice(0, 8))

                    }

                } else if (!allNumbers) {

                    setNumbers([])

                } else {


                    setNumbers(allNumbers)
                }
    }, [allNumbers, screenWidth, inputValue, selectedCategoryID, numbersByCategories])



    function handleInputChange(e) {
        setPage(1)
        let inputValue = e.target.value.replace(/\D/g, '')
        if (inputValue.length > 10) {
            setInputValue(inputValue);
        }
        else {

            setInputValue(inputValue);
        }



    }
    function handleCategoryChange(category) {
        setPage(1)
        if (category === selectedCategory) {
            return
        }
        if (category === 'Все') {

            setSelectedCategoryID('all')
            setSelectedNumber({})


        }
        if (category === 'Бриллиантовый') {

            setSelectedCategoryID(10)
            setSelectedNumber({})

        }
        if (category === 'Платиновый') {

            setSelectedCategoryID(6)
            setSelectedNumber({})

        }
        if (category === 'Золотой') {

            setSelectedCategoryID(3)
            setSelectedNumber({})

        }
        if (category === 'Серебрянный') {

            setSelectedCategoryID(2)
            setSelectedNumber({})

        }
        if (category === 'Бронзовый') {

            setSelectedCategoryID(1)
            setSelectedNumber({})

        }

        setSelectedCategory(category)

    }
    function handleCtnClick(item) {
        return
        

    }
    function handleSubmit(e) {
        e.preventDefault();
        props.history.push("/numbers");
        console.log(selectedNumber)
    }
    function handleFocus(e) {
        console.log(e)
        if (isInputFocused) {
            setInputFocused(false)
        } else {
            setInputFocused(true)
        }

    }



    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit} className={`numbers ${darkTheme ? 'numbers_dark' : ''}`}>
                <h2 className={`numbers__titile ${darkTheme ? 'numbers__titile_dark' : ''}`}>Выберете номер или&nbsp;<br /><span className='numbers__titile_link'>переходите со своим</span></h2>
                <div className='numbers__controllers'>
                    <div className={`numbers__input-container ${isInputFocused ? "numbers__input-container_focused" : ''}`}>
                        <img className="numbers__input-search-icon" src={searchIcon} alt="Иконка поиска" />

                        <input onBlur={handleFocus} onFocus={handleFocus} className="numbers__input" name="number" type="text" value={inputValue} onChange={handleInputChange} placeholder='Поиск номера' maxLength="10"></input>

                    </div>
                    <div className="numbers__categories">
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''}  ${selectedCategory === 'Все' ? 'numbers__category_active' : ''}`} onClick={() => handleCategoryChange('Все')}>Все</button>
                        <div className="numbers__category-container">
                            <button type='button' className={`numbers__category numbers__category_with-name ${darkTheme ? 'numbers__category_dark' : ''}  `} onClick={() => handleCategoryChange('Бронзовый')} >
                                <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''} ${selectedCategory === 'Бронзовый' ? ' numbers__category_bronze_active' : ''} ${selectedCategory === 'Бронзовый' ? ' numbers__category-name_active' : ''}`}>Бронзовый</p>
                            </button>
                            {
                                selectedCategory === 'Бронзовый' ?
                                    <p className={`numbers__category-price ${darkTheme ? 'numbers__category-price_dark' : ''}`}><span className="numbers__category-lastprice">1 000 ₽</span> Бесплатно</p>
                                    : <></>

                            }

                        </div>
                        <div className="numbers__category-container">
                            <button type='button' className={`numbers__category numbers__category_with-name ${darkTheme ? 'numbers__category_dark' : ''}  `} onClick={() => handleCategoryChange('Серебрянный')} >
                                <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''} ${selectedCategory === 'Серебрянный' ? ' numbers__category_selver_active' : ''} ${selectedCategory === 'Серебрянный' ? ' numbers__category-name_active' : ''}`}>Серебрянный</p>
                            </button>
                            {
                                selectedCategory === 'Серебрянный' ?
                                    <p className={`numbers__category-price ${darkTheme ? 'numbers__category-price_dark' : ''}`}><span className="numbers__category-lastprice">5 000 ₽</span> 300 ₽/мес</p>
                                    : <></>

                            }

                        </div>
                        <div className="numbers__category-container">
                            <button type='button' className={`numbers__category numbers__category_with-name ${darkTheme ? 'numbers__category_dark' : ''} ${selectedCategory === 'Золотой' ? ' numbers__category_gold_active' : ''}`} onClick={() => handleCategoryChange('Золотой')} >
                                <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''} ${selectedCategory === 'Золотой' ? ' numbers__category-name_active' : ''}`}>Золотой</p>
                            </button>
                            {
                                selectedCategory === 'Золотой' ?
                                    <p className={`numbers__category-price ${darkTheme ? 'numbers__category-price_dark' : ''}`}><span className="numbers__category-lastprice">35 000 ₽</span> 500 ₽/мес</p>
                                    : <></>

                            }

                        </div>
                        <div className="numbers__category-container">
                            <button type='button' className={`numbers__category numbers__category_with-name ${darkTheme ? 'numbers__category_dark' : ''}  ${selectedCategory === 'Платиновый' ? ' numbers__category_platina_active' : ''}`} onClick={() => handleCategoryChange('Платиновый')} >
                                <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''} ${selectedCategory === 'Платиновый' ? ' numbers__category-name_active' : ''}`}>Платиновый</p>
                            </button>
                            {
                                selectedCategory === 'Платиновый' ?
                                    <p className={`numbers__category-price ${darkTheme ? 'numbers__category-price_dark' : ''}`}><span className="numbers__category-lastprice">200 000 ₽</span> 1 000 ₽/мес</p>
                                    : <></>

                            }

                        </div>
                        <div className="numbers__category-container">
                            <button type='button' className={`numbers__category numbers__category_with-name ${darkTheme ? 'numbers__category_dark' : ''}  ${selectedCategory === 'Бриллиантовый' ? ' numbers__category_briliant_active' : ''}`} onClick={() => handleCategoryChange('Бриллиантовый')} >
                                <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''} ${selectedCategory === 'Бриллиантовый' ? ' numbers__category-name_active' : ''}`}>Бриллиантовый</p>
                            </button>
                            {
                                selectedCategory === 'Бриллиантовый' ?
                                    <p className={`numbers__category-price ${darkTheme ? 'numbers__category-price_dark' : ''}`}><span className="numbers__category-lastprice">500 000 ₽</span> 1 500 ₽/мес</p>
                                    : <></>

                            }

                        </div>
                    </div>


                </div>
                <div className='numbers__contacts'>

                    {preloaderVisible ? <Loader /> : <></>}
                    {apiError ? <p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>{apiError}</p> : <></>}

                    {page === 1 && numbers && numbers.length > 0 ? numbers.map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</p>
                    )) : !preloaderVisible && page === 1 && < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}


                    {inputValue === '' && page > 1 && allNumbers && allNumbers.length > 0 && selectedCategoryID === 'all' ? allNumbers.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</p>
                    )) : !preloaderVisible && inputValue === '' && page > 1 && selectedCategoryID === 'all' && < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}

                    {inputValue !== '' && page > 1 && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID === 'all' ? filteredNumbers.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</p>
                    )) : !preloaderVisible && inputValue !== '' && page > 1 && selectedCategoryID === 'all' && < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}

                    {inputValue !== '' && page > 1 && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID !== 'all' ? filteredNumbers.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</p>
                    )) : !preloaderVisible && inputValue !== '' && page > 1 && selectedCategoryID !== 'all' && < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}
                    {inputValue === '' && page > 1 && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID !== 'all' ? filteredNumbers.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</p>
                    )) : !preloaderVisible && inputValue === '' && page > 1 && selectedCategoryID !== 'all' && < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}

                </div>
                <button type="submit" className={`numbers__submit-button numbers__submit-button_active`} >Посмотреть все</button>
            </form>
        </>
    )
}
export default withRouter(NumbersForMain)