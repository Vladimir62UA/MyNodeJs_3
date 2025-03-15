const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());  // Для JSON-данных
app.use(bodyParser.urlencoded({ extended: true })); // Для данных формы (form-urlencoded)
// Подключение к базе данных
const db = mysql.createConnection({
  host: 'host.docker.internal', // это host для записи проекта на GitHub
  // host: 'localhost', // это host для разворачивания проекта на моем компьютере
  user: 'root',      // Укажите свой логин
  password: '',      // Укажите свой пароль
  database: 'goodsnewtesttask'   // Название базы данных
});


db.connect(err => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Подключение к базе данных установлено');
});

// 1. Выбор всех товаров
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении товаров' });
    }
    res.json(results);
  });
});

// 2. Выбор всех заказов
app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении заказов' });
    }
    res.json(results);
  });
});

// 3. Выбор товаров по конкретному заказу
app.get('/order/:id/items', (req, res) => {
  const orderId = req.params.id;
  console.log("Получен запрос на товары для заказа с orderId: ", orderId);

  const query = `
      SELECT products.pName, pType, guaranteeStart, guaranteeEnd,
      PriceUSD, PriceUAN, serialNumber
      FROM products
      WHERE orderId = ?
  `;

  db.query(query, [orderId], (err, results) => {
      if (err) {
          console.error("Ошибка при выполнении SQL запроса:", err); // Логируем ошибку запроса
          return res.status(500).json({ error: 'Ошибка при получении товаров для заказа' });
      }

      if (results.length === 0) {
          console.log("Нет товаров для данного заказа");
          return res.status(404).json({ error: 'Товары для данного заказа не найдены' });
      }

      console.log("Результаты запроса: ", results); // Логируем результаты запроса
      res.json(results);
  });
});
// 4. Выбор последнего номера прихода
app.get('/ordersLastId', (reg, res) => {
  db.query('SELECT id FROM orders', (err, results) => {
    const result = results[results.length - 1].id
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении заказов' });
    }
    res.json(result);
  });
});

// 5. Вызов функии получения наличного курса валют
app.post('/API_ExchangeCash', async function(reg, res){
  var x = await exchange_cash()
  res.json({testAPI_Cash: x})
})

const axios = require('axios');
const PORT = 5000;

const URL_2 = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`;

// 6. Функция получения наличного курса валют
async function exchange_cash() {
    try {
        const response_2 = await axios.get(URL_2);
        const html_2 = response_2.data;
        console.log('Готівковий курс ПриватБанку (у відділеннях):')
        console.log('Exchange 555551 ', html_2[0].ccy + '/' + html_2[0].base_ccy + ' Покупка: ' + html_2[0].buy + ', Продажа: ' + html_2[0].sale)
        console.log('Exchange 555551 ', html_2[1].ccy + '/' + html_2[1].base_ccy + ' Покупка: ' + html_2[1].buy + ', Продажа: ' + html_2[1].sale)
        return (await html_2)
    } catch (error) {
        console.error('Ошибка при получении данных о курсе валют (2):', error.message);
    }
}

// 7. Вызов функии получения безналичного курса валют
app.post('/API_Exchange', async function(reg, res){
  var y = await exchange()
  res.json({testAPI: y})
})

const URL_1 = `https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11`;

// 8. Функция получения безналичного курса валют
async function exchange() {
  try {
      const response_1 = await axios.get(URL_1);
      const html_1 = response_1.data;

      console.log('exchange  html_1 = ', html_1)

      console.log('Безготівковий курс ПриватБанку:')
      console.log('Exchange 555551 ', html_1[0].ccy + '/' + html_1[0].base_ccy + ' Покупка: ' + html_1[0].buy + ', Продажа: ' + html_1[0].sale)
      console.log('Exchange 555551 ', html_1[1].ccy + '/' + html_1[1].base_ccy + ' Покупка: ' + html_1[1].buy + ', Продажа: ' + html_1[1].sale)
      return (await html_1)
  } catch (error) {
      console.error('Ошибка при получении данных о курсе валют (2):', error.message);
  }
}

// 9. функция записи прихода в базу данных
app.post('/saveOrderObj', function (reg, res){
  var orderSumUSD = 0;
  var orderSumEUR = 0;
  var orderSumUAN = 0;
  reg.body.map((item, index) => {
    orderSumUSD = orderSumUSD + Number(item[0].priceUSD)
    orderSumEUR = orderSumEUR + Number(item[0].priceEUR)
    orderSumUAN = orderSumUAN + Number(item[0].priceUAN)
  })

  db.query("insert into orders (orderName, PriceUSD, PriceEUR, PriceUAN, productsQuantity) values ('Order " + reg.body[reg.body.length - 1][0].orderId + "', '" + orderSumUSD  + "', '" + orderSumEUR + "', '" + orderSumUAN + "', '" + reg.body[reg.body.length - 1][0].productsQuantity + "')", (err) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при записи order в базу' });
    }
    db.query('SELECT id FROM orders', (err1, results) => {
      const result = results[results.length - 1].id
      if (err1) {
        console.log("err1")
        return res.status(500).json({ error: 'Ошибка при получении id прихода' });
      }
      if (result === reg.body[reg.body.length - 1][0].orderId){
        console.log("Коррекция имени прихода не нужна")
        reg.body.map((item, index) => {
          db.query("insert into products (pName, pType, monthsGarantee, guaranteeEnd, orderCurrency, PriceUSD, PriceEUR, PriceUAN, ExchangeUSD_buy, ExchangeUSD_sale, ExchangeEUR_buy, ExchangeEUR_sale, serialNumber, orderId)  values ('" + item[0].pName + "', '" + item[0].pType + "', '" + item[0].monthsGarantee + "', '" + item[0].guaranteeEnd + "', '" + item[0].orderCurrency + "', '" + item[0].priceUSD + "', '" + item[0].priceEUR + "', '" + item[0].priceUAN + "', '" + item[0].USD_buy + "', '" + item[0].USD_sale + "', '" + item[0].EUR_buy + "', '" + item[0].EUR_sale + "', '" + item[0].serialNumbere + "', '" + result + "')" , (err3) => {
            if (err3) {
              return res.status(500).json({ error: 'Ошибка при записи order в базу' });
            }
          })
        })
        
      }
      else {
        db.query("UPDATE orders SET orderName='Order " + result + "' WHERE id=" + result + "",  (err2) => {
          if (err2) {
            console.log("err2")
            return res.status(500).json({ error: 'Ошибка обновления имени прихода' });
          };

          reg.body.map((item, index) => {
            db.query("insert into products (pName, pType, monthsGarantee, guaranteeEnd, orderCurrency, PriceUSD, PriceEUR, PriceUAN, ExchangeUSD_buy, ExchangeUSD_sale, ExchangeEUR_buy, ExchangeEUR_sale, serialNumber, orderId)  values ('" + item[0].pName + "', '" + item[0].pType + "', '" + item[0].monthsGarantee + "', '" + item[0].guaranteeEnd + "', '" + item[0].orderCurrency + "', '" + item[0].priceUSD + "', '" + item[0].priceEUR + "', '" + item[0].priceUAN + "', '" + item[0].USD_buy + "', '" + item[0].USD_sale + "', '" + item[0].EUR_buy + "', '" + item[0].EUR_sale + "', '" + item[0].serialNumbere + "', '" + result + "')" , (err3) => {
              if (err3) {
                return res.status(500).json({ error: 'Ошибка при записи order в базу' });
              };
            });
          });
        });
      };
    });
  });
  
  res.status(200).json({ Okey: 'Okey Object' });
})

// Функция удаления прихода и товаров этого прихода
app.get('/orderDelete/:id/items', (req, res) => {
  const orderId = req.params.id;
  console.log("Получен запрос на удаление прихода с orderId: ", orderId);

  const queryOrder = `
      DELETE FROM orders WHERE id = ?
  `
  db.query(queryOrder, [orderId], (err) => {
    if (err) {
        console.error("Ошибка при выполнении SQL запроса на удаление прихода:", err); // Логируем ошибку запроса
        return res.status(500).json({ error: 'Ошибка при удалении прихода' });
    }
    
    const queryProducts = `
        DELETE FROM products WHERE orderId = ?
    `
    db.query(queryProducts, [orderId], (err1) => {
      if (err1) {
          console.error("Ошибка при выполнении SQL запроса на удаление товаров прихода:", err1); // Логируем ошибку запроса
          return res.status(500).json({ error: 'Ошибка при удалении товаров прихода' });
      }
    });
    res.json({status: "Okey 1"})
      
  });

  });

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});
