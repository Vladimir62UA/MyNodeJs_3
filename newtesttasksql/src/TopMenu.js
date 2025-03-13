import React from 'react';
import './TopMenu'
import Clock from './Clock'
import myImageLogo from './logo.svg'
const TopMenu = (store) => {
    var d = new Date()
    var d8 = d.getDay()
    var d9 = d.getFullYear()
    var d7 
    var d6 = d.getDate()
    var dateOrder = d6
    if (dateOrder < 10) {dateOrder = '0' + dateOrder}
    if (d6 < 10) {d6 = '0' + d6}

    var d5 = d.getMonth()
    var monthOrder = d5
    if (monthOrder < 10) {monthOrder = '0' + monthOrder}
    var d4 = d.getHours()
    if (d4 < 10) {d4 = '0' + d4}
    var d3 = d.getMinutes()
    if (d3 < 10) {d3 = '0' + d3}
    var d1 = d.getSeconds()
    if (d1 < 10) {d1 = '0' + d1}

    // var d8 = 1 //Принудительная установка дня недели для отладки. После отладки убрать (закомментировать) 
    if (d8 === 0) {d7 = "воскресенье"}
    else if (d8 === 1) {d7 = "понедельник"}
    else if (d8 === 2) {d7 = "вторник"}
    else if (d8 === 3) {d7 = "среда"}
    else if (d8 === 4) {d7 = "четверг"}
    else if (d8 === 5) {d7 = "пятница"}
    else if (d8 === 6) {d7 = "суббота"}
    // var d5 = 11 //Принудительная установка месяца для отладки. После отладки убрать (закомментировать)
    if (d5 === 0) {d5 = "Янв."}
    if (d5 === 1) {d5 = "Февр."}
    if (d5 === 2) {d5 = "Мар."}
    if (d5 === 3) {d5 = "Апр."}
    if (d5 === 4) {d5 = "Май."}
    if (d5 === 5) {d5 = "Июн."}
    if (d5 === 6) {d5 = "Июл."}
    if (d5 === 7) {d5 = "Авг."}
    if (d5 === 8) {d5 = "Сен."}
    if (d5 === 9) {d5 = "Окт."}
    if (d5 === 10) {d5 = "Нояб."}
    if (d5 === 11) {d5 = "Дек."}


    return (
        <div className="d-flex flex-row">
            <div className="d-flex align-items-center col-10">
                <div className="col-2">
                    <img src={myImageLogo} alt='List' className='Justify_btn '/>
                </div>
                <div className="d-flex justify-content-center col-10">
                    <input
                        className="col-5"
                        type="text"
                        placeholder="Введите значение для поиска"
                    />
                </div>
                
            </div>
            <div className="col-2 pt-3 pb-3">
                <div className="top-50">
                    <div className="start-0">{d7}</div>
                        <div className="row m-0">
                            <div className="col-8 start-0">{d6} {d5} {d9} </div>
                            <div className="col-4 start-0">
                                <Clock />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
};
export default TopMenu;