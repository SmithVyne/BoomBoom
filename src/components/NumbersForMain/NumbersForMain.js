import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalContext } from '../../App';
import './NumbersForMain.css';
import searchIcon from '../../assets/images/search.svg'
import numbers_cart from '../../assets/images/numbers-cart.svg'
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
    const [, setFilteredNumbers] = React.useState(null);


    const [page, setPage] = React.useState(1);
    const [, setItemsPerPage] = React.useState(0);

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
        if (screenWidth >= 1925 && allNumbers) {

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
        else if (screenWidth >= 1900 && window.innerWidth < 1925 && allNumbers) {

            setItemsPerPage(18)
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

                setNumbers(filterd.slice(0, 18))

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
                    setNumbers(filterd.slice(0, 18))

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
                    setNumbers(filterd.slice(0, 18))

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
                    setNumbers(filterd.slice(0, 18))

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
                    setNumbers(filterd.slice(0, 18))

                }

            }
            else if (selectedCategoryID === 'all' && inputValue === '') {


                setNumbers(allNumbers.slice(0, 18))

            }


        } 
        else if (screenWidth >= 1682 && window.innerWidth < 1900 && allNumbers) {

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
        else if (screenWidth >= 1350 && window.innerWidth < 1682 && allNumbers) {

            setItemsPerPage(18)
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

                setNumbers(filterd.slice(0, 18))

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
                    setNumbers(filterd.slice(0, 18))

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
                    setNumbers(filterd.slice(0, 18))

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
                    setNumbers(filterd.slice(0, 18))

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
                    setNumbers(filterd.slice(0, 18))

                }

            }
            else if (selectedCategoryID === 'all' && inputValue === '') {


                setNumbers(allNumbers.slice(0, 18))

            }


        }
        
        else
        if (screenWidth >= 1060 && window.innerWidth < 1350 && allNumbers) {

            setItemsPerPage(12)
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

                setNumbers(filterd.slice(0, 12))

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
                    setNumbers(filterd.slice(0, 12))

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
                    setNumbers(filterd.slice(0, 12))

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
                    setNumbers(filterd.slice(0, 12))

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
                    setNumbers(filterd.slice(0, 12))

                }

            }
            else if (selectedCategoryID === 'all' && inputValue === '') {


                setNumbers(allNumbers.slice(0, 12))

            }


        }
        else
            if (screenWidth >= 500 && window.innerWidth < 1060 && allNumbers) {
                setItemsPerPage(12)
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

                    setNumbers(filterd.slice(0, 12))

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
                        setNumbers(filterd.slice(0, 12))

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
                        setNumbers(filterd.slice(0, 12))

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
                        setNumbers(filterd.slice(0, 12))

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
                        setNumbers(filterd.slice(0, 12))

                    }

                }
                else if (selectedCategoryID === 'all' && inputValue === '') {


                    setNumbers(allNumbers.slice(0, 12))

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
            {screenWidth > 930 ?

                <>
                    <form autoComplete="off" onSubmit={handleSubmit} className={`numbers-for-main ${darkTheme ? 'numbers-for-main_dark' : ''}`}>
                        <h2 className={`numbers-for-main__title ${darkTheme ? 'numbers-for-main__title_dark' : ''}`}>Выберете номер или&nbsp;<br /><span className='numbers-for-main__title_link'>переходите со своим</span></h2>
                        <div className='numbers-for-main__controllers'>
                            <div className={`numbers-for-main__input-container ${isInputFocused ? "numbers-for-main__input-container_focused" : ''}`}>
                                <img className="numbers-for-main__input-search-icon" src={searchIcon} alt="Иконка поиска" />

                                <input onBlur={handleFocus} onFocus={handleFocus} className="numbers-for-main__input" name="number" type="text" value={inputValue} onChange={handleInputChange} placeholder='Поиск номера' maxLength="10"></input>

                            </div>
                            <div className="numbers-for-main__categories">
                                <button type='button' className={`numbers-for-main__category ${darkTheme ? 'numbers-for-main__category_dark' : ''}  ${selectedCategory === 'Все' ? 'numbers-for-main__category_active' : ''}`} onClick={() => handleCategoryChange('Все')}>Все</button>
                                <div className="numbers-for-main__category-container">
                                    <button type='button' className={`numbers-for-main__category numbers-for-main__category_with-name ${darkTheme ? 'numbers-for-main__category_dark' : ''}  `} onClick={() => handleCategoryChange('Бронзовый')} >
                                        <p className={`numbers-for-main__category-name ${darkTheme ? 'numbers-for-main__category-name_dark' : ''} ${selectedCategory === 'Бронзовый' ? ' numbers-for-main__category_bronze_active' : ''} ${selectedCategory === 'Бронзовый' ? ' numbers-for-main__category-name_active' : ''}`}>Бронзовый</p>
                                    </button>
                                    {
                                        selectedCategory === 'Бронзовый' ?
                                            <p className={`numbers-for-main__category-price ${darkTheme ? 'numbers-for-main__category-price_dark' : ''}`}><span className="numbers-for-main__category-lastprice">1 000 ₽</span> Бесплатно</p>
                                            : <></>

                                    }

                                </div>
                                <div className="numbers-for-main__category-container">
                                    <button type='button' className={`numbers-for-main__category numbers-for-main__category_with-name ${darkTheme ? 'numbers-for-main__category_dark' : ''}  `} onClick={() => handleCategoryChange('Серебрянный')} >
                                        <p className={`numbers-for-main__category-name ${darkTheme ? 'numbers-for-main__category-name_dark' : ''} ${selectedCategory === 'Серебрянный' ? ' numbers-for-main__category_selver_active' : ''} ${selectedCategory === 'Серебрянный' ? ' numbers-for-main__category-name_active' : ''}`}>Серебрянный</p>
                                    </button>
                                    {
                                        selectedCategory === 'Серебрянный' ?
                                            <p className={`numbers-for-main__category-price ${darkTheme ? 'numbers-for-main__category-price_dark' : ''}`}><span className="numbers-for-main__category-lastprice">5 000 ₽</span> 300 ₽/мес</p>
                                            : <></>

                                    }

                                </div>
                                <div className="numbers-for-main__category-container">
                                    <button type='button' className={`numbers-for-main__category numbers-for-main__category_with-name ${darkTheme ? 'numbers-for-main__category_dark' : ''} ${selectedCategory === 'Золотой' ? ' numbers-for-main__category_gold_active' : ''}`} onClick={() => handleCategoryChange('Золотой')} >
                                        <p className={`numbers-for-main__category-name ${darkTheme ? 'numbers-for-main__category-name_dark' : ''} ${selectedCategory === 'Золотой' ? ' numbers-for-main__category-name_active' : ''}`}>Золотой</p>
                                    </button>
                                    {
                                        selectedCategory === 'Золотой' ?
                                            <p className={`numbers-for-main__category-price ${darkTheme ? 'numbers-for-main__category-price_dark' : ''}`}><span className="numbers-for-main__category-lastprice">35 000 ₽</span> 500 ₽/мес</p>
                                            : <></>

                                    }

                                </div>
                                <div className="numbers-for-main__category-container">
                                    <button type='button' className={`numbers-for-main__category numbers-for-main__category_with-name ${darkTheme ? 'numbers-for-main__category_dark' : ''}  ${selectedCategory === 'Платиновый' ? ' numbers-for-main__category_platina_active' : ''}`} onClick={() => handleCategoryChange('Платиновый')} >
                                        <p className={`numbers-for-main__category-name ${darkTheme ? 'numbers-for-main__category-name_dark' : ''} ${selectedCategory === 'Платиновый' ? ' numbers-for-main__category-name_active' : ''}`}>Платиновый</p>
                                    </button>
                                    {
                                        selectedCategory === 'Платиновый' ?
                                            <p className={`numbers-for-main__category-price ${darkTheme ? 'numbers-for-main__category-price_dark' : ''}`}><span className="numbers-for-main__category-lastprice">200 000 ₽</span> 1 000 ₽/мес</p>
                                            : <></>

                                    }

                                </div>
                                <div className="numbers-for-main__category-container">
                                    <button type='button' className={`numbers-for-main__category numbers-for-main__category_with-name ${darkTheme ? 'numbers-for-main__category_dark' : ''}  ${selectedCategory === 'Бриллиантовый' ? ' numbers-for-main__category_briliant_active' : ''}`} onClick={() => handleCategoryChange('Бриллиантовый')} >
                                        <p className={`numbers-for-main__category-name ${darkTheme ? 'numbers-for-main__category-name_dark' : ''} ${selectedCategory === 'Бриллиантовый' ? ' numbers-for-main__category-name_active' : ''}`}>Бриллиантовый</p>
                                    </button>
                                    {
                                        selectedCategory === 'Бриллиантовый' ?
                                            <p className={`numbers-for-main__category-price ${darkTheme ? 'numbers-for-main__category-price_dark' : ''}`}><span className="numbers-for-main__category-lastprice">500 000 ₽</span> 1 500 ₽/мес</p>
                                            : <></>

                                    }

                                </div>
                            </div>


                        </div>
                        <div className='numbers-for-main__contacts'>

                            {preloaderVisible ? <Loader /> : <></>}
                            {apiError ? <p className={`numbers-for-main__contact ${darkTheme ? 'numbers-for-main__contact_dark' : ''}`}>{apiError}</p> : <></>}

                            {page === 1 && numbers && numbers.length > 0 ? numbers.map((item, i) => (
                                <p key={i} onClick={() => handleCtnClick(item)} className={`numbers-for-main__contact ${darkTheme ? 'numbers-for-main__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers-for-main__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</p>
                            )) : !preloaderVisible && page === 1 && < p className={`numbers-for-main__contact ${darkTheme ? 'numbers-for-main__contact_dark' : ''}`}>Ничего не найдено</p>}

                        </div>
                        <button type="submit" className={`numbers-for-main__submit-button numbers-for-main__submit-button_active`} >Посмотреть все</button>
                    </form>
                </>
                :
                <>
                    <h2 className={`numbers-for-main__title ${darkTheme ? 'numbers-for-main__title_dark' : ''}`}>Выберете номер или&nbsp;<br /><span className='numbers-for-main__title_link'>переходите со своим</span></h2>
                    <div className={`numbers-for-main__card`}>
                        <div className={`numbers-for-main__card-row`}>
                            <h2 className={`numbers-for-main__card-name numbers-for-main__card-name_type_bronz`}>Бронзовый</h2>
                            <div className={`numbers-for-main__card-price`}>
                                <p className={`numbers-for-main__card-price_last`}>1 000 ₽</p>
                                <p className={`numbers-for-main__card-price_now`}>Бесплатно</p>
                            </div>
                        </div>
                        <div className={`numbers-for-main__card-row`}>
                            <p className={`numbers-for-main__card-number`}>{(numbersByCategories && numbersByCategories.category_bronz.length > 0) ? `${numbersByCategories.category_bronz[0].ctn.substring(0, 3)} ${numbersByCategories.category_bronz[0].ctn.substring(3, 6)} ${numbersByCategories.category_bronz[0].ctn.substring(6, 8)} ${numbersByCategories.category_bronz[0].ctn.substring(8, 10)}` : 'Нет в наличии'}</p>
                            <div className={`numbers-for-main__card-cart ${(numbersByCategories && numbersByCategories.category_bronz.length > 0) ? '' : 'numbers-for-main__card-cart_disabled'}`}>
                                <img className={`numbers-for-main__card-cart-img`} alt="Купить" src={numbers_cart}></img>
                            </div>
                        </div>
                    </div>
                    <div className={`numbers-for-main__card`}>
                        <div className={`numbers-for-main__card-row`}>
                            <h2 className={`numbers-for-main__card-name numbers-for-main__card-name_type_silver`}>Серебрянный</h2>
                            <div className={`numbers-for-main__card-price`}>
                                <p className={`numbers-for-main__card-price_last`}>5 000 ₽</p>
                                <p className={`numbers-for-main__card-price_now`}>300 ₽/мес</p>
                            </div>
                        </div>
                        <div className={`numbers-for-main__card-row`}>
                            <p className={`numbers-for-main__card-number`}>{(numbersByCategories && numbersByCategories.category_silver.length > 0) ? `${numbersByCategories.category_silver[0].ctn.substring(0, 3)} ${numbersByCategories.category_silver[0].ctn.substring(3, 6)} ${numbersByCategories.category_silver[0].ctn.substring(6, 8)} ${numbersByCategories.category_silver[0].ctn.substring(8, 10)}` : 'Нет в наличии'}</p>
                            <div className={`numbers-for-main__card-cart ${(numbersByCategories && numbersByCategories.category_silver.length > 0) ? '' : 'numbers-for-main__card-cart_disabled'}`}>
                                <img className={`numbers-for-main__card-cart-img`} alt="Купить" src={numbers_cart}></img>
                            </div>
                        </div>
                    </div>
                    <div className={`numbers-for-main__card`}>
                        <div className={`numbers-for-main__card-row`}>
                            <h2 className={`numbers-for-main__card-name numbers-for-main__card-name_type_gold`}>Золотой</h2>
                            <div className={`numbers-for-main__card-price`}>
                                <p className={`numbers-for-main__card-price_last`}>35 000 ₽</p>
                                <p className={`numbers-for-main__card-price_now`}>500 ₽/мес</p>
                            </div>
                        </div>
                        <div className={`numbers-for-main__card-row`}>
                            <p className={`numbers-for-main__card-number`}>{(numbersByCategories && numbersByCategories.category_gold.length > 0) ? `${numbersByCategories.category_gold[0].ctn.substring(0, 3)} ${numbersByCategories.category_gold[0].ctn.substring(3, 6)} ${numbersByCategories.category_gold[0].ctn.substring(6, 8)} ${numbersByCategories.category_gold[0].ctn.substring(8, 10)}` : 'Нет в наличии'}</p>
                            <div className={`numbers-for-main__card-cart ${(numbersByCategories && numbersByCategories.category_gold.length > 0) ? '' : 'numbers-for-main__card-cart_disabled'}`}>
                                <img className={`numbers-for-main__card-cart-img`} alt="Купить" src={numbers_cart}></img>
                            </div>
                        </div>
                    </div>
                    <div className={`numbers-for-main__card`}>
                        <div className={`numbers-for-main__card-row`}>
                            <h2 className={`numbers-for-main__card-name numbers-for-main__card-name_type_platina`}>Платиновый</h2>
                            <div className={`numbers-for-main__card-price`}>
                                <p className={`numbers-for-main__card-price_last`}>200 000 ₽</p>
                                <p className={`numbers-for-main__card-price_now`}>1000 ₽/мес</p>
                            </div>
                        </div>
                        <div className={`numbers-for-main__card-row`}>
                            <p className={`numbers-for-main__card-number`}>{(numbersByCategories && numbersByCategories.category_plat.length > 0) ? `${numbersByCategories.category_plat[0].ctn.substring(0, 3)} ${numbersByCategories.category_plat[0].ctn.substring(3, 6)} ${numbersByCategories.category_plat[0].ctn.substring(6, 8)} ${numbersByCategories.category_plat[0].ctn.substring(8, 10)}` : 'Нет в наличии'}</p>
                            <div className={`numbers-for-main__card-cart ${(numbersByCategories && numbersByCategories.category_plat.length > 0) ? '' : 'numbers-for-main__card-cart_disabled'}`}>
                                <img className={`numbers-for-main__card-cart-img`} alt="Купить" src={numbers_cart}></img>
                            </div>
                        </div>
                    </div>
                    <div className={`numbers-for-main__card`}>
                        <div className={`numbers-for-main__card-row`}>
                            <h2 className={`numbers-for-main__card-name numbers-for-main__card-name_type_briliant`}>Бриллиантовый</h2>
                            <div className={`numbers-for-main__card-price`}>
                                <p className={`numbers-for-main__card-price_last`}>500 000 ₽</p>
                                <p className={`numbers-for-main__card-price_now`}>1500 ₽/мес</p>
                            </div>
                        </div>
                        <div className={`numbers-for-main__card-row`}>
                            <p className={`numbers-for-main__card-number`}>{(numbersByCategories && numbersByCategories.category_briliant.length > 0) ? `${numbersByCategories.category_briliant[0].ctn.substring(0, 3)} ${numbersByCategories.category_briliant[0].ctn.substring(3, 6)} ${numbersByCategories.category_briliant[0].ctn.substring(6, 8)} ${numbersByCategories.category_briliant[0].ctn.substring(8, 10)}` : 'Нет в наличии'}</p>
                            <div className={`numbers-for-main__card-cart ${(numbersByCategories && numbersByCategories.category_briliant.length > 0) ? '' : 'numbers-for-main__card-cart_disabled'}`}>
                                <img className={`numbers-for-main__card-cart-img`} alt="Купить" src={numbers_cart}></img>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} type="button" className={`numbers-for-main__submit-button numbers-for-main__submit-button_active`} >Посмотреть все</button>
                </>}
        </>
    )      
}
export default withRouter(NumbersForMain)