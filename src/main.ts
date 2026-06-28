
import { apiProducts } from "./utils/data";
import { ProductCatalog } from "./components/models/productСatalog";
import { Buyer } from "./components/models/Buyer";
import { shoppingCart } from "./components/models/shoppingСart";

const productsModel = new ProductCatalog();
const buyer = new Buyer();
const ShoppingCart = new shoppingCart();
productsModel.saveProducts(apiProducts.items); 

console.log('Массив товаров из каталога: ', productsModel.getProducts()) 
console.log(1);
