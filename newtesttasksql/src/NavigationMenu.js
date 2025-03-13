import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ImageRayhan from "./Al_Rayhan-фото-Edit.png"

function NavigationMenu() {
  const [check1, setCheck1] = useState('fs-4 text-body-secondary fw-bolder text-decoration-none text1_green text1_black')
  const [check2, setCheck2] = useState('fs-4 text-body-secondary fw-bolder text-decoration-none text1_black')
  var check3 = "fs-4 text-body-secondary fw-bolder text-decoration-none text1_green text1_black"
  var check4 = "fs-4 text-body-secondary fw-bolder text-decoration-none text1_black"

  function  showBlock1() {
    setCheck1(check3)
    setCheck2(check4)          
     };
  function showBlock2() {
    setCheck1(check4)
    setCheck2(check3)    
  }

  return (
    <div className="container mt-5">
      <div className="Circle_1">
        <img src={ImageRayhan} alt="" className="ImageRayhan"/>
      </div>
      <nav className="col pt-5">
        <div>
          <Link to="/orders_1" className={check1} onClick={showBlock1}>Приход</Link>
        </div>
        <div>
          <Link to="#" className="fs-4 text-body-secondary fw-bolder text-decoration-none">Группы</Link>
        </div>
        <div>
          <Link to="/products" className={check2} onClick={showBlock2}>Продукты</Link>
        </div>
        <div>
          <Link to="#" className="fs-4 text-body-secondary fw-bolder text-decoration-none">Пользователи</Link>
        </div>
        <div>
          <Link to="#" className="fs-4 text-body-secondary fw-bolder text-decoration-none">Настройки</Link>
        </div>
      </nav>
    </div>
  );
}

export default NavigationMenu;
