import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import {Provider} from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));


const initialState = {
  order: [],
  orderObject: []
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADDORDEROBJ':
      return {...state, orderObject: [...state.orderObject, action.payload]}; // Добавляем новый массив Object как отдельный элемент
    default:
      return state;
  }
};

const store = createStore(counterReducer)
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App mystore = {store}/>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();