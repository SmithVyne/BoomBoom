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
                <h2 className={`numbers__titile ${darkTheme ? 'numbers__titile_dark' : ''}`}>Выберете номер или&nbsp;<br/><span className='numbers__titile_link'>переходите со своим</span></h2>
                <div className='numbers__controllers'>
                    <div className={`numbers__input-container ${isInputFocused ? "numbers__input-container_focused" : ''}`}>
                        <img className="numbers__input-search-icon" src={searchIcon} alt="Иконка поиска" />

                        <input onBlur={handleFocus} onFocus={handleFocus} className="numbers__input" name="number" type="text" value={inputValue} onChange={handleInputChange} placeholder='Поиск номера' maxLength="10"></input>

                    </div>
                    <div className="numbers__categories">
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Все' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Все' ? 'numbers__category_active' : ''}`} onClick={() => handleCategoryChange('Все')}>Все</button>
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Бронзовый' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Бронзовый' ? 'numbers__category_active' : ''}`} onClick={() => handleCategoryChange('Бронзовый')} >
                            <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''}`}>Бронзовый</p>
                            
                            </button>
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Серебрянный' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Серебрянный' ? 'numbers__category_active' : ''}`} onClick={() => handleCategoryChange('Серебрянный')} >Серебрянный</button>
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Золотой' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Золотой' ? 'numbers__category_active' : ''}`} onClick={() => handleCategoryChange('Золотой')} >Золотой</button>
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Платиновый' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Платиновый' ? 'numbers__category_active' : ''}`} onClick={() => handleCategoryChange('Платиновый')} >Платиновый</button>
                        <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''} ${darkTheme && selectedCategory === 'Бриллиантовый' ? 'numbers__category_dark_active' : ''} ${!darkTheme && selectedCategory === 'Бриллиантовый' ? 'numbers__category_active' : ''}`} onClick={() => handleCategoryChange('Бриллиантовый')} >Бриллиантовый</button>
                    </div>
                    <div className="numbers__page-buttons">
                        {page > 1 ?
                            <button onClick={() => {
                                if (page > 1) {
                                    setPage(page - 1)
                                }
                            }} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>

                                <svg className={`numbers__arrow-icon`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                </svg>

                            </button>
                            :
                            <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>

                                <svg className={`numbers__arrow-icon`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                </svg>

                            </button>
                        }
                        {inputValue === '' && allNumbers && allNumbers.length > 0 && selectedCategoryID === 'all' && page < Math.ceil(allNumbers.length / itemsPerPage) ?
                            <button onClick={() => {
                                if (inputValue === '' && allNumbers && allNumbers.length > 0 && selectedCategoryID === 'all' && page < Math.ceil(allNumbers.length / itemsPerPage)) {
                                    setPage(page + 1)
                                }
                            }} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                </svg>
                            </button>
                            : inputValue === '' && selectedCategoryID === 'all' && <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                </svg>
                            </button>
                        }
                        {inputValue !== '' && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID === 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage) ?
                            <button onClick={() => {
                                if (inputValue !== '' && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID === 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage)) {
                                    setPage(page + 1)
                                }
                            }} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                </svg>
                            </button>
                            : inputValue !== '' && selectedCategoryID === 'all' && <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                </svg>
                            </button>
                        }
                        {inputValue !== '' && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID !== 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage) ?
                            <button onClick={() => {
                                if (inputValue !== '' && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID !== 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage)) {
                                    setPage(page + 1)
                                }
                            }} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                </svg>
                            </button>
                            : inputValue !== ''  && selectedCategoryID !== 'all' && <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                </svg>
                            </button>
                        }
                        {inputValue === '' && selectedCategoryID !== 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage) ?
                            <button onClick={() => {
                                if (inputValue === '' && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID !== 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage)) {
                                    setPage(page + 1)
                                }
                            }} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                </svg>
                            </button>
                            : inputValue === ''  && selectedCategoryID !== 'all' && <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                </svg>
                            </button>
                        }

                    </div>

                </div>
                <div className='numbers__contacts'>

                    {preloaderVisible ? <Loader /> : <></>}
                    {apiError ? <p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>{apiError}</p> : <></>}

                    {page === 1 && numbers && numbers.length > 0 ? numbers.map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}<span className={`numbers__contact_bold ${darkTheme ? 'numbers__contact_bold_dark' : ''}`}>{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</span></p>
                    )) : page === 1 && < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}


                    {inputValue === '' && page > 1 && allNumbers && allNumbers.length > 0 && selectedCategoryID === 'all' ? allNumbers.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}<span className={`numbers__contact_bold ${darkTheme ? 'numbers__contact_bold_dark' : ''}`}>{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</span></p>
                    ))  : inputValue === '' && page > 1 && selectedCategoryID === 'all' && < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}

                    {inputValue !== '' && page > 1 && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID === 'all' ? filteredNumbers.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}<span className={`numbers__contact_bold ${darkTheme ? 'numbers__contact_bold_dark' : ''}`}>{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</span></p>
                    )) : inputValue !== '' && page > 1 && selectedCategoryID === 'all' && < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}

                    {inputValue !== '' && page > 1 && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID !== 'all' ? filteredNumbers.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}<span className={`numbers__contact_bold ${darkTheme ? 'numbers__contact_bold_dark' : ''}`}>{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</span></p>
                    )): inputValue !== '' && page > 1 && selectedCategoryID !== 'all' && < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}
                    {inputValue === '' && page > 1 && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID !== 'all' ? filteredNumbers.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, i) => (
                        <p key={i} onClick={() => handleCtnClick(item)} className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''} ${item.ctn === selectedNumber.ctn ? 'numbers__contact_selected' : ''}`}>{`+7 ${item.ctn.substring(0, 3)} ${item.ctn.substring(3, 6)} `}<span className={`numbers__contact_bold ${darkTheme ? 'numbers__contact_bold_dark' : ''}`}>{`${item.ctn.substring(6, 8)} ${item.ctn.substring(8, 10)}`}</span></p>
                    )): inputValue === '' && page > 1 && selectedCategoryID !== 'all' && < p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}
                
                </div>
                <button type="submit" className={`numbers__submit-button ${selectedNumber.ctn ? "numbers__submit-button_active" : "numbers__submit-button_disabled"}`} disabled={selectedNumber.ctn ? false : true}>Заказать номер</button>
            </form>
        </>
    )
}
