import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import myImageTrash from './trash3.svg';

function Products() {
    const [products, setProducts] = useState([]);  // Храним список продуктов
    const [selectedType, setSelectedType] = useState("Все");
  
    // Функция загрузки данных
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/products");
            const data = await response.json();
            setProducts(data); // Сохраняем данные в state
        } catch (error) {
            console.error("Ошибка при загрузке продуктов:", error);
        }
    };

    // Загружаем данные при загрузке компонента
    useEffect(() => {
        fetchData();
    }, []);

    // Получаем все уникальные типы продуктов
    const productTypes = ["Все", ...new Set(products.map(product => product.pType    ))];

    // Фильтрация продуктов по выбранному типу
    const filteredProducts = selectedType === "Все"
        ? products
        : products.filter(product => product.pType === selectedType);

    return (
        <div className="container p-0">
            <div className='d-flex flex-row align-items-center'>
                <h2 className='d-flex align-items-center text-white mb-0 col-3 fw-bolder'>
                    Продукты / {filteredProducts.length}
                </h2>
                <div className='d-flex align-items-center'>
                    <h5 className='d-flex align-items-center text-white mt-0 mb-0 ms-5'>Тип</h5>
                </div>
                <div className='col-4'>
                    <select className="form-select ms-2" onChange={(e) => setSelectedType(e.target.value)}>
                        {productTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>
            <ul className='col-12 mt-3 gx-5 p-0'>
                {filteredProducts.map((product) => (
                    <li key={product.id} className="card flex-row col-12 mb-3 p-1">
                        <h5 className='d-flex align-items-center col-5 mb-0'>Название: {product.pName}</h5>
                        <h5 className='d-flex align-items-center col-1 mb-0'>{product.pType}</h5>

                        <div className='d-flex flex-column col-2'>
                            {product.monthsGarantee ? (
                                <>
                                    <h5 className='d-flex align-items-center mb-0'>
                                        с {product.guaranteeStart?.slice(8, 10)} / {product.guaranteeStart?.slice(5, 7)} / {product.guaranteeStart?.slice(0, 4)}
                                    </h5>
                                    <h5 className='mb-0'>
                                        по {product.guaranteeEnd?.slice(8, 10)} / {product.guaranteeEnd?.slice(5, 7)} / {product.guaranteeEnd?.slice(0, 4)}
                                    </h5>
                                </>
                            ) : (
                                <h5 className='mb-0 text-danger'>Нет данных</h5>
                            )}
                        </div>
                        <div className='row m-0 col-2'>
                            <a href="/#" className='text-dark'>{product.PriceUSD} USD</a>
                            <h5 className='mb-0'>{product.PriceUAN} UAN</h5>
                        </div>
                        <div className='d-flex row m-0 col-2'>
                            <h6 className='d-flex align-items-center mb-0 p-1 col-9'>Приход: {product.orderId || "—"}</h6>
                            <div className='d-flex align-items-center col-3'>
                                <img src={myImageTrash} alt='Delete' className='btn border border-danger btn-outline-danger px-2 py-2 border-opacity-50 rounded-circle'/>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
