import React, { useEffect, useState  } from 'react';
import myImageTrash from './trash3.svg'

const Modal_Delete = ({ isOpen, closeModal, products, orderId, selectedProduct, setSelectedProduct }) => {

    const [orderProducts, setOrderProducts] = useState([]); // Состояние для хранения продуктов заказа
    
    // Функция загрузки данных о товарах
    const fetchDataSelectProducts = async () => {
        try {
            if (!orderId) return; // Если orderId не задан, не отправляем запрос
            const response = await fetch(`http://localhost:3001/order/${encodeURIComponent(orderId)}/items`);
            const dataSelectProducts = await response.json();
            setOrderProducts(dataSelectProducts); // Обновляем состояние с данными о товарах
        } catch (error) {
            console.error("Ошибка при загрузке продуктов:", error);
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchDataSelectProducts();
        }
    }, [orderId]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    // Функция закрытия модального окна
    const orderDelete = async (closeModal) => {
        closeModal()
        try {
            if (!orderId) {
                console.log("orderId отсутствует, запрос не отправлен.");
                return;
            }
    
            console.log("Вызывается orderDelete с orderId:", orderId);
    
            fetch(`http://localhost:3001/orderDelete/${encodeURIComponent(orderId)}/items`)
                .then(data_1 => { 
                    console.log('Запрос прошел успешно:', data_1)
                }
            )
                .then(data => {
                    console.log('Запрос прошел успешно:', data);
                    window.location.reload()
                })
                .catch(error => {
                    console.error(error);  // Обработка ошибок
                });
        } catch (error) {
            console.error("Ошибка при отправке запроса на удаление прихода", error);
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                    <div className='d-flex flex-row-reverse position-relative'>
                        <button type="button" className="btn-close z-10 border border-black p-3 border-opacity-50 rounded-circle btn_close bg-white opacity-100 overflow-x-visible" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <h3 className='ps-4'>Вы уверены, что хотите удалить этот приход (Заказ #{orderId || "Неизвестен"}) ?</h3>
                    <h6 className='ps-4'>Заказ #{orderId || "Неизвестен"}</h6>
                    <h6 className='mb-4 ps-4'>(Для детализации кликните по названию продукта)</h6>

                    <div className="modal-body ps-3">
                        <ul className="product-list">
                            {orderProducts.length > 0 ? (
                                orderProducts.map((product, index) => (
                                    <li 
                                        key={index}  // Используем индекс как ключ
                                        onClick={() => setSelectedProduct(product)}
                                        className={selectedProduct?.pName === product.pName ? "selected" : ""} // Выделяем выбранный продукт
                                    >
                                        <strong>{product.pName}</strong> - {product.PriceUSD} USD
                                    </li>
                                ))
                            ) : (
                                <li className="no-products">Нет товаров в этом заказе</li>
                            )}
                        </ul>

                        {selectedProduct && (
                            <div className="product-details">
                                <h3>Детали товара</h3>
                                <p><strong>Название:</strong> {selectedProduct.pName}</p>
                                <p><strong>Тип:</strong> {selectedProduct.pType}</p>
                                <p><strong>Гарантия:</strong> с {selectedProduct.guaranteeStart} по {selectedProduct.guaranteeEnd}</p>
                                <p><strong>Серийный номер:</strong> {selectedProduct.serialNumber}</p>
                                <p><strong>Цена:</strong> {selectedProduct.PriceUSD} USD</p>
                                <p className='ms-5'>{selectedProduct.PriceUAN} UAN</p>
                            </div>
                        )}
                    </div>
                <div className='modal-content-delete d-flex flex-row-reverse mt-3'>
                    <button 
                        type="button" 
                        className="btn btn-light btn-outline-danger me-5 rounded-pill"
                        onClick={() => orderDelete(closeModal)}
                    >
                        <img src={myImageTrash} alt='' className='text-danger  pe-3' />
                        Удалить приход
                    </button>
                    <div className='me-5 text-white'>
                    <button type='button' className='btn  btn-light btn-outline-warning me-5 rounded-pill ' onClick={closeModal}>    
                        Отменить
                    </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Modal_Delete;