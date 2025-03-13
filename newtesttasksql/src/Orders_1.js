import React, { useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import Modal from './Modal';
import Modal_delete from './Modal_delete'
import ModalAddOrder from './ModalAddOrder'
import myImage from './list-ul.svg'
import myImageTrash from './trash3.svg'

export function Orders_1(dateStart, monthStart, yearStart, props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Добавлено
  const [ordersSQL, setOrdersSQL] = useState([]);  // Храним список приходов

  const orderObj = useSelector((state) => state.orderObject)
  console.log("Orders_1 ===================  orderObj = ", orderObj)
  
  const openModal = (orderId) => {
      setSelectedOrderId(orderId);
      setSelectedProduct(null); // Сбрасываем выделенный товар при смене заказа
      setIsModalOpen(true);

  };

  // Функция закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
};

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedDeleteOrderId, setSelectedDeleteOrderId] = useState(null);
  const [isModalAddOrderOpen, setIsModalAddOrderOpen] = useState(false);
 
  const openModalDeleteOrder = (orderId) => {
      setSelectedDeleteOrderId(orderId);
      setSelectedProduct(null); // Сбрасываем выделенный товар при смене заказа
      setIsModalDeleteOpen(true);
  }
  const closeModalDeleteOrder = () => {
    setIsModalDeleteOpen(false);
    setSelectedProduct(null); // Очищаем выбранный товар при закрытии модалки
  };
  const openModalAddOrder = (orderId) => {
      setIsModalAddOrderOpen(true);
  };
  const closeModalAddOrder = () => {
    setIsModalAddOrderOpen(false);
  };


  // var newMonth = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Нояб", "Дек"]
  // var order_date = new Array()
  //   var sum_order_USD = 0
  //   var sum_order_UAN = 0
  //   var sum_orderUSD = new Array()
  //   var sum_orderUAN = new Array()
  //   var sum_ord_leng = new Array()
  //   var ord_leng = 0
    var d = new Date()
    var d8 = d.getDay()             // День недкли - число (порядковый номер дня недели)
    var d9 = d.getFullYear()
    var yearOrder = d.getFullYear()
    var monthOrder = d.getMonth() + 1
    var dateOrder = d.getDate()
    var d7                         // День недкли - название
    var d6 = d.getDate()             // чило месяца
    
    if (d6 < 10) {d6 = '0' + d6}    
    
    var d5 = d.getMonth()          // порядковый номер  месяца в году

    var d4 = d.getHours()          
    if (d4 < 10) {d4 = '0' + d4}
    var d3 = d.getMinutes()
    if (d3 < 10) {d3 = '0' + d3}

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


    // Функция загрузки данных о приходах
      const fetchData = async () => {
          try {
              const response = await fetch("http://localhost:3001/orders");
              const data = await response.json();
              setOrdersSQL(data); // Сохраняем данные в state
          } catch (error) {
              console.error("Ошибка при загрузке продуктов:", error);
          }

      };

      // Загружаем данные при загрузке компонента
      useEffect(() => {
          fetchData();
      }, []);

  return (
     <div className="container p-0">
      <div className='d-flex flex-row '>
      <button type="button" className="button_add col-1 border border-success p-3 rounded-circle opacity-100 overflow-x-visible d-flex justify-content-center align-items-center text-white fs-4"onClick={() => openModalAddOrder()}>+</button>
      {/* <img src={myImage} alt='List' className='Justify_btn btn border border-success btn-outline-success p-2 border-opacity-50 rounded-circle'/> */}
        <h2 className='text-white fw-bolder ms-3'>Приходы / {ordersSQL.length}</h2>
      </div>
      
      <ul className='col-12 p-0'>
        {ordersSQL.map((order) => (
          <li key={order.id} className="card mb-3 p-1 flex-row col-12">
            <h5 className='d-flex align-items-center col-5 mb-0'>Название прихода: {order.orderName}</h5>
            <div className='d-flex flex-row align-items-center col-7'>
                <div className='d-flex justify-content-center align-items-center col-1'>
                  <img src={myImage} alt='List' className='Justify_btn btn border border-success btn-outline-success p-2 border-opacity-50 rounded-circle' onClick={() => openModal(order.id)}/>
                </div>
                
                <div className='d-flex flex-column justify-content-center m-0 col-2'>
                    <h5 className='ps-1 pt-2'>{order.productsQuantity}</h5>
                    <h6 className='ps-1 pb-2 text-dark'>Продукта</h6>
                </div >
              {/* <p>Дата создания прихода:</p> */}
              <div className='d-flex flex-column align-items-center justify-content-center m-0 col-4'>
                <p>{order.OrderDate.slice(8,10)} / {order.OrderDate.slice(5,7)} </p>
                <h5>{order.OrderDate.slice(0,10)} </h5>
              </div>
              {/* <h5>Сумма прихода:</h5> */}
              <div className='d-flex flex-column align-items-center m-0 col-4'>
                <div>
                  <p>{order.PriceUSD} USD</p>
                  <h5>{order.PriceUAN} UAN</h5>
                </div>
                
              </div>
              <div className='d-flex align-items-center justify-content-center col-1'>
                <img src={myImageTrash} alt='Delete' className='btn border border-danger border-opacity-50 btn-outline-danger p-2 rounded-circle' onClick={() => openModalDeleteOrder(order.id)}/>
              </div>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                closeModal={closeModal} 
                products={selectedProducts} 
                orderId={selectedOrderId} 
                selectedProduct={selectedProduct}  // Передаем выбранный товар
                setSelectedProduct={setSelectedProduct} // Передаем функцию для изменения товара
            />
            <Modal_delete 
                isOpen={isModalDeleteOpen} 
                closeModal={closeModalDeleteOrder} 
                products={selectedProducts} 
                orderId={selectedDeleteOrderId} 
                selectedProduct={selectedProduct}  // Передаем выбранный товар
                setSelectedProduct={setSelectedProduct} // Передаем функцию для изменения товара
            />
            <ModalAddOrder
              // next1store={store}
              isOpen={isModalAddOrderOpen} 
              closeModal={closeModalAddOrder}
              dateStart = {dateOrder}
              monthStart = {monthOrder}
              yearStart = {yearOrder} 
            />
          </li>
        ))}

      </ul>
   </div>
  )



  
 }
export default Orders_1;