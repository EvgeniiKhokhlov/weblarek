# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Данные приложения

#### Интерфейсы

`IProduct` - интерфейс описывающий данные о товаре. 

* `id: string` - уникальный номер товара
 * `description: string` - описание товара и его характеристик
 * `image: string` - путь к изображению товара для отображения в каталоге
 * `title: string` - наименование товара
 * `category: string` - категория товара
 * `price: number | null` - стоимость товара (значение `null` применяется при отсутствии цены)

 `IBuyer` - интерфейс описывающий данные о покупателе.

* `payment: TPayment` - способ оплаты товара
 * `email: string` - электронная почта
 * `phone: string` - контактный номер телефона
 * `address: string` - адрес доставки

 ### Модели данных

 #### Класс "ProductCatalog"

Реализует хранение товаров, которые можно купить в приложении.

Конструктор класса не принимает параметров.

Поля класса:  
`protected products: IProduct[]` -  хранит массив всех товаров.
`protected selectedProduct: IProduct | null` -  хранит товар, выбранный для подробного отображения.

Методы класса:  
`saveArrayProducts(products: IProduct[]): void` - сохранение массива товаров полученного в параметрах метода.  
`getArrayProducts(): IProduct[]` - получение массива товаров из модели.  
`getProductByID(id: string): IProduct` - получение одного товара по его id.
`saveProduct(product: IProduct): void` - сохранение товара для подробного отображения.  
`getProduct(): IProduct` - получение товара для подробного отображения.

 #### Класс "ShoppingCart"

Реализует храние массива товаров, выбранных покупателем для покупки.

Конструктор класса не принимает параметров.

Поля класса:  
`protected productList: IProduct[]` -  хранит массив всех товаров.


Методы класса:  
`getProductList(): IProduct[]` - получение массива товаров, которые находятся в корзине.  
`addProductList(product: Iproduct): void` - добавление товара, который был получен в параметре, в массив корзины.  
`deleteProductList(id: string): void` - удаление товара, полученного в параметре из массива корзины.
`emptyingProductList(): void` - очистка корзины.  
`getTotalCost(): number` - получение стоимости всех товаров в корзине.
`getQuantityProductList(): number` - получение количества товаров в корзине;.  
`checkProductList(id: string): boolean` - проверка наличия товара в корзине по его id, полученного в параметр метода.

#### Класс "Buyer"

Реализует хранение данных покупателя, которые тот должен указать при оформлении заказа.

Конструктор класса не принимает параметров.

Поля класса:   
`data: IBuyer` - общий обьект включающий поля:
`payment:` -  вид оплаты.
`address:` -  адреc.
`phone:` -  телефон;.
`email:` -  email.

Методы класса:  
`savePaymentMethod(payment: TPaymen): void` - сохранение данных об выборе оплаты.
`saveAddress(address: string): void` - сохранение данных об адреса доставки.
`savePhone(phone: string): void` - сохранение контакнтного номера телефона покупателя.
`saveEmail(email: string): void` - сохранение электронной почты покупателя.
`getBuyer(): IBuyer` - получение всех данных покупателя.  
`clearingBuyer(): void` - очистка данных покупателя.
`validateBuyer(){paymentMethod: TPaymen, address: string, phone: string, email: string}` - валидация данных покупателя.   

### Слой коммуникации

#### Класс "ServerApi"

Реализует обмен данными с сервером.

Конструктор класса : `constructor(api: IApi)`.

Поля класса:  
`protected api: IApi` - отправка запроса на сервер.

Методы класса:  
`getProducts(): Promise<IProductsResponse>` - выполняет GET‑запрос и получает с сервера объект с массивом товаров.
`postOrder(orderRequest: IOrderRequest): Promise<IOrderResponse>` - отправляет POST‑запрос о покупателе и выбранных товарах.

### Cлой представления 

#### Класс Header

Реализует слой представления визуализирующий шапку проекта.

Конструктор:
`constructor(container: HTMLElement, protected events: IEvents`
`container` - DOM‑элемент
`events` -  управление событием.

Поля класса:   
`protected basketButton: HTMLButtonElement` - кнопка открытия корзины:
`protected counterElement: HTMLElement` - счетчик товара в корзине.

Событие:
`shopping-cart:open` - открытие корзины.

Методы класса:  
`set counter(value: number)` - обновление счетчика.   

#### Класс Basket

Реализует слой представления визуализирующий корзину и её управление.

Конструктор:
`constructor(container: HTMLElement, protected events: IEvents)`
`container` - DOM‑элемент
`events` -  управление событием.

Поля класса:   
`protected basketListProducts: HTMLElement` - отоброжение списка товара в корзине:
`protected checkoutButton: HTMLButtonElement` - кнопка оформления товара.
`protected priceElement: HTMLElement` - отоброжение итоговой стоймости.

Событие:
`order:open` - открытие формы заказа.

Методы класса:  
`set list(value: HTMLElement[])` - обновление списка товара в корзине.
`set price(value: number)` - общая стоимость заказа.
`setBasketStatus(isEmpty: boolean)` - состояние кнопки оформления заказа (при отсутсвии товара в корзине становится не активной).

#### Класс Gallery

Реализует слой представления визуализирующий галереи товаров.

Конструктор:
`constructor(container: HTMLElement)`
`container` - DOM‑элемент

Методы класса:  
`set update(items: HTMLElement[])` - обновление списка товара.

#### Класс Modal

Реализует слой представления визуализирующий модальные окна.

Конструктор:
`constructor(container: HTMLElement, protected events: IEvents)`
`container` - DOM‑элемент.
`events` -  управление событием.

Поля класса:   
`protected closeButton: HTMLButtonElement` - закрытие окна
`protected contentElement: HTMLElement` - отоброжение окна.

Событие:
`modal:open` - открытие окна.
`modal:close` - закрытие окна.

Методы класса:  
`set content(value: HTMLElement)` - обновление конткнта.
`open(): void` - открытие окна.
`close(): void` - закрытие окна.

#### Класс Success

Реализует слой представления визуализирующий успешное оформление заказа.

Конструктор:
`constructor(container: HTMLElement, actions: ISuccessActions)`
`container` - сообщение об успехе.
`actions` -  объект с обработчиками действий.

Поля класса:   
`protected closeButton: HTMLButtonElement` - кнопка закрытия сообщения.
`protected totalElement: HTMLElement` - сумма заказа.

Методы класса:  
`set total(value: number)` - отоброжение суммы заказа.

#### Абстрактный класс Card

Реализует слой представления всех карточек товара.

Конструктор:
`constructor(container: HTMLElement)`
`container` - карточки товара.

Поля класса:   
`protected titleElement: HTMLElement` - название товара.
`protected priceElement: HTMLElement` - цена товара.

Методы класса:  
`set title(value: string)` - обновление названия товара.
`set price(value: number | null)` - обновление цены.

#### Класс CardCatalog

Реализует слой представления карточек товара в каталоге.

Конструктор:
`constructor(container: HTMLElement, actions?: ICardActions)`
`container` - карточки товара.
`actions?` - отоброжение кликов.

Поля класса:   
`protected categoryElement: HTMLElement` - категория товара.
`protected imageElement: HTMLImageElement` - изображение товара.

Методы класса:  
`set category(value: string)` - обновление категории товара.
`set image(value: string)` - обновление изображения.

#### Класс CardPreview

Реализует слой представления предварительного просмотра карточки товара.

Конструктор:
`constructor(container: HTMLElement, actions?: ICardActions)`
`container` - карточки товара.
`actions?` - отоброжение кликов.

Поля класса:   
`protected categoryElement: HTMLElement` - категория товара.
`protected imageElement: HTMLImageElement` - изображение товара.
`protected descriptionElement: HTMLElement` - описание товара.
`protected cardButton: HTMLButtonElement` - кнопка действия.

Событие:
`onButtonClick` - при нажатии на кнопку действия.

Методы класса:  
`set description(value: string)` - обновление описания товара.
`set disabled(value: boolean)` - управление активностью кнопки.
`set cardButtonText(value: string)` - обновление текста на кнопке действия.
`setPurchaseOpportunity(isInShoppingCart: boolean, price: number | null)` - состояние кнопки.


#### Абстрактный класс Form

Реализует слой представления всех типов форм.

Конструктор:
`constructor(container: HTMLFormElement, protected events: IEvents)`
`container` - DOM‑элемент формы.
`events` - управление событиями.

Поля класса:   
`protected formElement: HTMLFormElement` - основной элемент формы.
`protected submitButton: HTMLButtonElement` - кнопка отправки формы.
`protected errorsContainer: HTMLElement` - сообщение об ошибках валидации.

Событие:
`{formName}:submit` - отправка при успешной валидации формы.

Методы класса:  
`set valid(value: boolean)` - состояние кнопки отправки.
`set errors(value: string[])` - отображает ошибки валидации.


#### Класс ContactsForm

Реализует слой представления формы ввода контактных данных.

Конструктор:
`onstructor(container: HTMLFormElement, protected events: IEvents)`
`container` - форма контактных данных.
`events` - управление событиями.

Поля класса:   
`protected emailElement: HTMLInputElement` - ввод email‑адреса пользователя.
`protected phoneElement: HTMLInputElement` - ввод номера телефона пользователяа.

Событие:
`contacts:changed` - изменение данных в полях формы.
`contacts:submit` - отправление формы.

Методы класса:  
`set email(value: string)` - получение email.
`set disabled(value: boolean)` - получение телефона.

#### Класс OrderForm

Реализует слой представления для отображения и управления формой заказа.

Конструктор:
`constructor(container: HTMLFormElement, protected events: IEvents)`
`container` - форма заказа.
`events` - управление событиями.

Поля класса:   
`protected paymentButtons: HTMLButtonElement[]` - массив кнопок для выбора способа оплаты.
`protected addressElement: HTMLInputElement` - поле ввода адреса доставки.

Событие:
`order:changed` - изменение данных формы.
`order:submit` - отправление формы.

Методы класса:  
`set payment(value: string)` - выделяет выбранный способ оплаты.
`set address(value: string)` - заполняет поле ввода адреса.
`validate(): boolean` - валидация данных формы.
`getData(): { payment: string, address: string }` - текущие данные формы.
`reset(): void` - сбрас формы.






