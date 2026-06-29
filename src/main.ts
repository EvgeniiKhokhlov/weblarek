import './scss/styles.scss';
import { apiProducts } from "./utils/data";
import { ProductCatalog } from "./components/models/productCatalog";
import { Buyer } from "./components/models/Buyer";
import { ShoppingCart } from "./components/models/shoppingCart";

const productsModel = new ProductCatalog();
const buyer = new Buyer();
const shoppingCart = new ShoppingCart();

// Проверка работы методов класса ProductCatalog
productsModel.saveArrayProducts(apiProducts.items); 
console.log('Массив товаров из каталога: ', productsModel.getArrayProducts()) 
console.log('Получение одного товара по его id: ', productsModel.getProductByID(apiProducts.items[0].id));
productsModel.saveProduct(apiProducts.items[0]);
console.log('Один товар:', productsModel.getProduct());

// Проверка работы методов класса shoppingCart
// Добавили товар в карзину
shoppingCart.addProductList(apiProducts.items[0]);
shoppingCart.addProductList(apiProducts.items[1]);
shoppingCart.addProductList(apiProducts.items[2])
console.log('Массив товаров в корзине:', shoppingCart.getProductList());
console.log('Общая сумма товара в корзине:', shoppingCart.getTotalCost());
console.log('Общее количество товара в корзине:', shoppingCart.getQuantityProductList());
console.log('Проверка наличия товара в корзине:', shoppingCart.checkProductList(apiProducts.items[1].id));
console.log('Удаление одного товара из корзины:', shoppingCart.deleteProductList(apiProducts.items[1].id));
console.log('Удаление всех товаров из корзины:', shoppingCart.emptyingProductList());

// Проверка работы методов класса Buyer
// Сохраним все данные покупателя
buyer.savePaymentMethod("card");
buyer.saveAddress("Earth");
buyer.saveEmail("earthling@yandex.ru");
buyer.savePhone("+88005553535");
console.log('Получение всех данных покупателя:', buyer.getBuyer());
console.log('Валидация данных покупателя:', buyer.validateBuyer());
console.log('Очистка данных покупателя:', buyer.clearingBuyer());

