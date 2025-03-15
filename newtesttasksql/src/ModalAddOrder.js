import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"

const ModalAddOrder = ({ isOpen, closeModal, dateStart, monthStart, yearStart, props }) => {

    const [orderProducts, setOrderProducts] = useState([]); // Состояние для хранения продуктов заказа
    
    const orderObj = useSelector((state) => state.orderObject)
    
    const dispatch = useDispatch();

    const addOrderObj = (newOrderObj) => {
         dispatch({ type: "ADDORDEROBJ", payload: newOrderObj }); // Просто передаем новый заказ как элемент c объектами
    }

    const [API_ExchangeCash, setAPI_ExchangeCash] = useState([]); // Храним наличный курс обмена валют
    
    const [stateRadioUAN, setStateRadioUAN] = useState('UAN'); // Храним состояние RadioUAN
    const [stateRadioUSD, setStateRadioUSD] = useState(null); // Храним состояние RadioUSD
    const [stateRadioEUR, setStateRadioEUR] = useState(null); // Храним состояние RadioEUR
    const [numberProduct, setNumberProduct] = useState(1); // Храним порядковый номер продукта

    

    const [pName, setPName] = useState(''); // Храним название продукта
    const [pType, setPType] = useState(''); // Храним тип продукта
    const [monthsGarantee, setMonthsGarantee] = useState(); // Храним количество месяцев гарантии

    const [guaranteeYearStart, setGuaranteeYearStart] = useState(); // Храним год внесения прихода в базу
    const [guaranteeMonthStart, setGuaranteeMonthStart] = useState(); // Храним месяц внесения приходая в базу
    const [guaranteeDateStart, setGuaranteeDateStart] = useState(); // Храним дату внесения прихода в базу
    const [guaranteeYearEnd, setGuaranteeYearEnd] = useState(1); // Храним год окончания гарантии прихода
    const [guaranteeMonthEnd, setGuaranteeMonthEnd] = useState(1); // Храним месяц окончания гарантии прихода
    const [guaranteeDateEnd, setGuaranteeDateEnd] = useState(1); // Храним дату окончания гарантии прихода
    const [dateEnd, setDateEnd] = useState()
    const [monthEnd, setMonthEnd] = useState()
    const [yearEnd, setYearEnd] = useState()


    const [radioState, setRadioState] = useState('UAN'); // Храним состояние Radio

    const [priceProductUSD, setPriceProductUSD] = useState(); // Храним цену продукта в USD
    const [priceProductEUR, setPriceProductEUR] = useState(); // Храним цену продукта в EUR
    const [priceProductUAN, setPriceProductUAN] = useState(); // Храним цену продукта в UAN

    const [API_EUR_buy, setAPI_EUR_buy] = useState(); // Храним безналичный курс покупки EUR
    const [API_EUR_sale, setAPI_EUR_sale] = useState(); // Храним безналичный курс продажи EUR
    const [API_USD_buy, setAPI_USD_buy] = useState(); // Храним безналичный курс покупки USD
    const [API_USD_sale, setAPI_USD_sale] = useState(); // Храним безналичный курс продажи USD
    const [serialNumber, setSerialNumber] = useState(); // Храним серийный номер продукта
    const [orderNumber, setOrderNumber] = useState();  // Храним номер нового прихода
    const [state_product, setState_product] = useState([]); // Храним сводную информацию о продукте и приходе для передачи в REDUX 
    const [newState_product, setNewState_product] = useState([]); // Храним сводную информацию о продукте и приходе для передачи в REDUX 

    // Функция получения последнего номера прихода
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/ordersLastId");
            const data = await response.json();
            setOrderNumber(data + 1); // Сохраняем данные в state
        } catch (error) {
            console.error("Ошибка при загрузке продуктов:", error);
        }
    };

    // Функция получения наличного курса обмена валют
    const fetchAPI_ExchangeCash = async (value) => {
        try {
            const responseAPI_Cash = await fetch('http://localhost:3001/API_ExchangeCash', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ testAPI_Cash: value }),
            });
            const dataAPI_Cash = await responseAPI_Cash.json();
            setAPI_ExchangeCash(dataAPI_Cash.testAPI_Cash)
            } catch (error) {
            console.error('ModalAddOrder.js   Error fetching data:', error);
            }
        }
    
    // Функция получения безналичного курса обмена валют
    const fetchAPI_Exchange = async (value) => {
        try {
            const responseAPI = await fetch('http://localhost:3001/API_Exchange', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ testAPI: value }),
            });
            const dataAPI = await responseAPI.json();
            setAPI_EUR_buy(Number(dataAPI.testAPI[0].buy))
            setAPI_EUR_sale(Number(dataAPI.testAPI[0].sale))
            setAPI_USD_buy(Number(dataAPI.testAPI[1].buy))
            setAPI_USD_sale(Number(dataAPI.testAPI[1].sale))
            } catch (error) {
            console.error('ModalAddOrder.js   Error fetching data:', error);
            }
        }

    // Загружаем вид валюты данного прихода
    const openRadioState = (radioId) => {
        setRadioState(radioId);
        if (radioId === 'UAN') {
            setStateRadioUAN('UAN');
            setStateRadioUSD(null);
            setStateRadioEUR(null);

        };
        if (radioId === 'USD') {
            setStateRadioUAN(null);
            setStateRadioUSD('USD');
            setStateRadioEUR(null);
        };
        if (radioId === 'EUR') {
            setStateRadioUAN(null);
            setStateRadioUSD(null);
            setStateRadioEUR('EUR');
        };
    }
  
    // Загружаем данные при загрузке компонента
    useEffect(() => {
        fetchData();
        fetchAPI_ExchangeCash();
        fetchAPI_Exchange();
    }, []);
    

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    // Обработчик ввода наименования продукта
    const handleInputChangeNameProduct = (e) => {
        const value = e.target.value;
        setPName(value);
    };

    // Обработчик ввода типа продукта
    const handleInputChangeTypeProduct = (e) => {
        const value = e.target.value;
        setPType(value);
    };

    // Обработчик ввода цены продукта
    const handleInputChangePriceProduct = (e) => {
        const value = Number(e.target.value);
        if (radioState === 'UAN'){
            setPriceProductUAN(value);
            var valueUSD = Math.round(value * 100 / API_USD_sale) / 100
            setPriceProductUSD(valueUSD);
            var valueEUR = Math.round(value * 100 / API_EUR_sale) / 100
            setPriceProductEUR(valueEUR);
        }
        if (radioState === 'USD'){
            var valueUAN = Math.round(value * API_USD_buy * 100 ) / 100
            setPriceProductUAN(valueUAN);
            setPriceProductUSD(value);
            valueEUR = Math.round(value * API_USD_buy * 100 / API_EUR_sale) / 100
            setPriceProductEUR(valueEUR);
        }
        if (radioState === 'EUR'){
            valueUAN = Math.round(value * API_EUR_buy * 100 ) / 100
            setPriceProductUAN(valueUAN);
            valueUSD = Math.round(value * API_EUR_buy * 100 / API_USD_sale) / 100
            setPriceProductUSD(valueUSD);
            setPriceProductEUR(value);
        }
    };

    // Обработчик ввода количества месяцев гарантии
    const handleInputChangeMonthsGarantee = (e) => {
        const value = Number(e.target.value);
        setMonthsGarantee(value);
    };

    // Обработчик ввода серийного номера товара
    const handleInputChangeSerialNumber = (e) => {
        const value = e.target.value;
        setSerialNumber(value);
    };

    const handleAddProduct = () => {
    
        // Вычисление даты окончания срока гарантии
        let monthTmp = monthStart + monthsGarantee;
        let yearPlus = Math.floor(monthTmp / 12);
        let newYear = yearStart + yearPlus;
        let newMonth = monthTmp % 12;

        if (newMonth === 0) { // Если получилось 0 - значит декабрь прошлого года
            newMonth = 12;
            newYear -= 1;
        }

        let newDate = dateStart - 1; // Вычитаем 1 день

        // Коррекция даты, если newDate ушел в предыдущий месяц
        if (newDate < 1) {
            newMonth -= 1;
            if (newMonth < 1) { // Если ушли в "нулевой" месяц, то это декабрь прошлого года
                newMonth = 12;
                newYear -= 1;
            }
            newDate = new Date(newYear, newMonth, 0).getDate(); // Берем последний день предыдущего месяца
        }
    
        // Устанавливаем состояния (гарантируем, что они обновятся вместе)
        setGuaranteeYearEnd(newYear);
        setGuaranteeMonthEnd(newMonth);
        setGuaranteeDateEnd(newDate);
        setDateEnd(newDate);
        setMonthEnd(newMonth);
        setYearEnd(newYear);

        if (newMonth < 10) {
            newMonth = "0" + newMonth;
        }
        if (newDate < 10) {
            newDate = "0" + newDate;
        }
        var guarantEnd = newYear + "-" + newMonth + "-" + newDate
    
        // формируем массив для передачи в Redux
        state_product.push({pName: pName, pType: pType, monthsGarantee: monthsGarantee, guaranteeEnd:  guarantEnd, orderCurrency: radioState, priceUSD: priceProductUSD, 
                    priceEUR: priceProductEUR, priceUAN: priceProductUAN, USD_buy: API_USD_buy, USD_sale: API_USD_sale, EUR_buy: API_EUR_buy, EUR_sale: API_EUR_sale,
                    serialNumbere: serialNumber, productsQuantity: numberProduct, orderId: orderNumber})
                    setNumberProduct(numberProduct + 1); // Увеличиваем номер продукта в заказе
        
                    const newState_product = [...state_product]; // Создаем копию массива, чтобы не было мутаций
                    handleCancel(); // Очищаем форму
                    addOrderObj(newState_product); // Отправляем копию массива в Redux
        
        //Фиксация типа валюты прихода в форме ввода цены товара после добавления 1-го товара и обновления страницы
        openRadioState(radioState); 
    };

    const handleCancel = () => {
        state_product.length = 0;
        setRadioState('UAN');
        setStateRadioUAN('UAN');
        setStateRadioUSD(null);
        setStateRadioEUR(null);
        setPName('');
        setPType('');
        setPriceProductUAN();
        setPriceProductUSD();
        setPriceProductEUR();
        setMonthsGarantee();
        setSerialNumber();
    }
    const buttonCancel = () => {
        state_product.length = 0;
        newState_product.length = 0;
        orderObj.length = 0;
        setNumberProduct(1)
        setRadioState('UAN');
        setStateRadioUAN('UAN');
        setStateRadioUSD(null);
        setStateRadioEUR(null);
        setPName('');
        setPType('');
        setPriceProductUAN();
        setPriceProductUSD();
        setPriceProductEUR();
        setMonthsGarantee();
        setSerialNumber();
        closeModal();
    }

    const handleSaveOrderObj = () => {
        closeModal()
        fetchSaveOrderStateProduct(orderObj); // Передаем массив, а не событие
    };
    const fetchSaveOrderStateProduct = async () => {
        try {
            const response = await fetch("http://localhost:3001/saveOrderObj", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderObj), // Передаем массив напрямую
                
            });
    
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
    
             window.location.reload()
        } catch (error) {
            console.error("Ошибка записи данных прихода (Obj) в БД", error);
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className='d-flex flex-row-reverse position-relative'>
                    <button type="button" className="btn-close z-10 border border-black p-3 border-opacity-50 rounded-circle btn_close bg-white opacity-100 overflow-x-visible" aria-label="Close" onClick={closeModal}></button>
                </div>
                <h3 className='ps-4'>Добавление товаров нового прихода (Order #{orderNumber || "Неизвестен"})</h3>
                        <h5 className='mt-4 ps-4'>Курс обмена валют (наличный):</h5>
                        <p className='ps-5'>Exchange EUR/UAH Покупка: {API_ExchangeCash[0].buy}, Продажа: {API_ExchangeCash[0].sale}</p>
                        <p className='ps-5'>Exchange USD/UAH Покупка: {API_ExchangeCash[1].buy}, Продажа: {API_ExchangeCash[1].sale}</p>
                        <h5 className='mt-1 ps-4'>Курс обмена валют (безналичный):</h5>
                        <p className='ps-5'>Exchange EUR/UAH Покупка: {API_EUR_buy}, Продажа: {API_EUR_sale}</p>
                        <p className='mb-4 ps-5'>Exchange USD/UAH Покупка: {API_USD_buy}, Продажа: {API_USD_sale}</p>
                <div></div>
                <div className='d-flex flex-row ps-4'>
                    <h5 className='text-success'>Выберите валюту прихода:</h5>
                    <div className="form-check ms-3">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="RadioUAN" onClick={() => openRadioState('UAN')} defaultChecked />
                        <label className="form-check-label" htmlFor="RadioUAN">
                            UAN
                        </label>
                    </div>
                    <div className="form-check ms-3">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="RadioUSD" onClick={() => openRadioState('USD')}/>
                        <label className="form-check-label" htmlFor="RadioUSD">
                            USD
                        </label>
                    </div>
                    <div className="form-check ms-3">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="RadioEUR" onClick={() => openRadioState('EUR')}/>
                        <label className="form-check-label" htmlFor="RadioEUR">
                            EUR
                        </label>
                    </div>
                </div>
                
                <h4 className='mt-3 ps-4 text-success'>Введите сведения о товаре №{numberProduct} данного прихода</h4>
                <div className='d-flex flex-row mt-3 ps-4' >
                    <h5 className='text-success'>Название товара:</h5>
                    <input className='ms-2 type="text"' value={pName ?? ""} 
                        onChange={handleInputChangeNameProduct} 
                        placeholder="Введите название товара" />
                </div>
                <div className='d-flex flex-row mt-3 ps-4' >
                    <h5 className='text-success'>Тип товара:</h5>
                    <input className='ms-2 type="text"' value={pType ?? ""} 
                        onChange={handleInputChangeTypeProduct} 
                        placeholder="Введите тип продукта" />
                </div>
                <div className='d-flex flex-row mt-3 ps-4' >
                    <h5 className='text-success'>Цена товара:</h5>
                    {stateRadioUAN ? (
                        <>
                            <input className="ms-2" type="text" value={priceProductUAN ?? ""} 
                            onChange={handleInputChangePriceProduct} 
                            placeholder="UAN" />
                            UAN
                            <p className='ms-4'>{priceProductUSD} USD</p>
                            <p className='ms-4'>{priceProductEUR} EUR</p>
                        </>
                    ) : (stateRadioUSD ? (
                            <>
                                <input className='ms-2 type="text"' value={priceProductUSD ?? ""} 
                                onChange={handleInputChangePriceProduct} 
                                placeholder="USD" />
                                USD
                                <p className='ms-4'>{priceProductUAN} UAN</p>
                                <p className='ms-4'>{priceProductEUR} EUR</p>
                            </>
                            ) : (stateRadioEUR ? (
                                    <>
                                        <input className='ms-2 type="text"' value={priceProductEUR ?? ""} 
                                        onChange={handleInputChangePriceProduct} 
                                        placeholder="EUR" />
                                        EUR
                                        <p className='ms-4'>{priceProductUAN} UAN</p>
                                        <p className='ms-4'>{priceProductUSD} USD</p>
                                    </>
                                    ) : (
                                        <p></p>
                                    )
                            )
                        )   
                    }
                </div>
                <div className='d-flex flex-row mt-3 ps-4' >
                    <h5 className='text-success'>Количество месяцев гарантии:</h5>
                    <input className='ms-2' type="text" value={monthsGarantee ?? ""} 
                        onChange={handleInputChangeMonthsGarantee} 
                        placeholder="Введите кол-во месяцев" />
                </div>
                <div className='d-flex flex-row mt-3 ps-4' >
                    <h5 className='text-success'>Серийный номер:</h5>
                    <input className='ms-2' type="text" value={serialNumber ?? ""} 
                        onChange={handleInputChangeSerialNumber} 
                        placeholder="Введите серийный номер" />
                </div>

                <div className='modal-content-delete d-flex flex-row-reverse mt-3'>
                    <button type='button' className='btn btn-success border border-warning me-5 rounded-pill text-white'  onClick={handleAddProduct}>
                        Добавить продукт к этому заказу
                    </button>
                    <div className='me-5 text-white'>
                        <button type='button' className='btn btn-success border border-warning me-5 rounded-pill text-white' onClick={handleSaveOrderObj}>
                            Сохранить приход Obj в БД
                        </button>
                    </div>
                    <div className='me-5 text-white'>
                        <button type='button' className='btn btn-outline-warning me-5 rounded-pill text-white' onClick={buttonCancel}>
                            Отменить ввод прихода в БД
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ModalAddOrder;