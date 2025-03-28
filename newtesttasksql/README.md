Название проекта: Тестовое Задание (ТЗ) для проверки релевантных работодателю знаний и опыта.
Основная цель задания - продемонстрировать опыт и знания разработчика проекта.
Исходя из требований ТЗ реализовано следующее:
1. Выполннена верстка компонентов на базе скринов-примеров (всего 4 скрин-примера).
2. Приложение включает две отдельные страницы.
3. На каждой странице есть:
    - верхнее поле (header), которое формируется с помощью компонента TopMenu;
    - ниже расположены два поля (колонки), а именно:
    - слева панель навигации, которая формируется с помощью компонента Navigation Menu;
    - справа либо поле с информацией о приходах (формируется с помощью компонента Orders_1.js), либо поле с информацией о товарах (формируется с помощью компонента Products.js).
4. Для реализации требований ТЗ создано 11 компонентов, а именно:
    - index.js;
    - App.js;
    - NavigationMenu.js;
    - Orders_1.js;
    - Products.js;
    - TopMenu.js;
    - Clock.js;
    - Modal.js;
    - Modal_delete.js;
    - ModalAddOrder.js;
    - index_task.js,
    а также файл стилизации страниц проекта App.css и два Dockerfile.
5.  Весь проект помещен в папку MyNodeJs_3.
6.  Файлы, обеспечивающие работу Frontend (React), находятся в корне папки MyNodeJs_3\newtesttasksql, а также в папке MyNodeJs_3\newtesttasksql\src. Dockerfile для Frontend находится в корне папки MyNodeJs_3\newtesttasksql.
7.  Файлы, обеспечивающие работу Backend находятся в корне папки MyNodeJs_3. Здесь же находится Dockerfile для Backend, файл базы данных goodsnewtesttask.sql, а также файл index_task.js, обеспечивающий работу с базой данных и получение курса валют (API с Приватбанка).
8. В компоненте Navigation Menu находятся роут-ссылки на Orders_1 и Products.
9. В компоненте TopMenu в правом верхнем углу в реальном времени выводятся дата и время.
10. В компоненте Orders_1 построчно выводится информация о приходах. 
В каждой строке есть следующие поля:
    - название прихода;
    - кнопка активации модального окна с информацией о продуктах, содержащихся в данном приходе;
    - поле с информацией о количестве продуктов в данном приходе;
    - поле с информацией о дате прихода в двух форматах;
    - поле с информацией об общей стоимсти товаров в данном приходе в двух валютах: USD и UAN;
    - поле с кнопкой активации модального окна удаления данного прихода.
    В верхнем поле выводится информация о названии прихода и суммарном количестве приходов.
    Также в верхнем поле есть кнопка активации модального окна добавления нового прихода и продуктов. 
11. В компоненте Products построчно выводится информация о всех продуктах
    В каждой строке есть следующие поля:
    - название продукта;
    - тип продукта;
    - даты гарантии в разных форматах;
    - цена продукта в разных валютах (USD и UAN);
    - название прихода;
    - кнопка активации модального окна удаления данного прихода.
    В верхнем поле выводится информация о названии компонента, суммарном количестве продуктов, а также форма фильтрации продуктов по их типу в виде выпадающего списка с названием типов имеющихся продуктов.
12. Компонент Modal.js выводит информацию о названиях и стоимости продуктов в данном приходе в виде модального окна. При необходимости детализации информации о конкретном продукте     можно кликнуть по его названию и справа будет выведена расширенная информация о данном продукте.
13. Компонент Modal_delete.js выводит информацию о названиях и стоимости продуктов в данном приходе в виде модального окна с возможностью детализации информации о каждом продукте. 
    В нижнем поле модального окна есть кнопки удаления данного прихода и отмены удаления.
    По нажатию на кнопку удаления происходит удаление прихода и его продуктов из базы данных. 
    При этом модальное окно закрывается и обновляется страница с информацией о продуктах.
    По нажатию на кнопку "Отмена" происходит отмена удаления прихода и его продуктов. После нажатия на эту кнопку модальное окно закрывается.
14. Компонент ModalAddOrder.js выводит информацию о номере прихода и наличном и безналичном курсе валют на момент добавления информации о прихода (API).
    Также этот компонент выводит переключатели выбора валюты прихода, а также следующие формы:
    - названия товара;
    - типа товара;
    - цены товара;
    - количества месяцев гарантии на данный товар;
    - серийного номера товара.
    Нажатие на кнопку "Добавить продукт к этому заказу" обеспечивает формирование объекта данного продукта с последующей передачей в Redux.
    После этого формы обновляются и ожидают ввода данных о следующем продукте прихода.
    По окончанию ввода данных о продуктах прихода нажатие на кнопку "Сохранить приход в БД" приводит к передаче массива объектов продуктов из Redux на Back-end в компонент 
    index_task.js, 
    а также к закрытию моджального окна и обновлению станицы приходов.
    В этом компоненте данные о приходе и его продуктах обрабатываются и записываются в базу данных соответственно в таблицы orders и products.
15. Компонент Clock.js обеспечивает вывод текущего времени в компоненте TopMenu в формате hh:mm.
16. Компонент App.js формирует поля страниц проекта, а также фактически является маршрутизатором страниц приходов и продуктов.
17. Для клонирования проекта на ПК необходимо на любом свободном диске создать папку, в которую будет клонироваться проект с GitHub. Например папку MyNodeJs_3. 
Далее в корне этой папки вводим команду для клонирования проекта
git clone https://github.com/Vladimir62UA/MyNodeJs_3.git
18. Для разворачивания (сборки) сервера в корне папки MyNodeJs_3 вводим команду 
docker build -t mynodejs_3 .
node.js работает на порту 3001.
19. Для того, чтобы база данных подгружалась к проекту запускаем XAMPP и в строках Apache и MySQL нажимаем кнопки Start.
20. Запускаем сервер. Для этого в корне папки MyNodeJs_3 вводим команду
docker run -p 3001:3001 mynodejs_3
21. Для разворачивания (сборки) React в папки newtesttasksql вводим команду
docker build -t newtesttasksql .
22. Запускаем React с помощью команды
docker run -p 3002:3000 newtesttasksql
Вместо порта 3002 можно использовать любой другой свободный порт.
 
