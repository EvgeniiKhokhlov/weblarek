import { IProduct } from '../../types/index';
import { IEvents } from '../base/Events';

export class ShoppingCart {
    protected productList: IProduct[];

    constructor(protected events: IEvents) {
        this.productList = [];
    };

    getProductList(): IProduct[] {
        return this.productList;
    };

    addProductList(product: IProduct): void {
        this.productList.push(product);
        this.events.emit('shopping-cart:changed');
    };

    deleteProductList(id: string): void {
        this.productList = this.productList.filter((product) => product.id !== id);
        this.events.emit("shopping-cart:changed");
    };

    emptyingProductList(): void {
        this.productList = [];
        this.events.emit("shopping-cart:changed");
    };

    getTotalCost(): number {
        return this.productList.reduce((sum,product) => sum + (product.price ||0) ,0)
    };

    getQuantityProductList(): number {
        return this.productList.length;
    };

    checkProductList(id: string): boolean {
        return this.productList.some((product) => product.id === id);
    }

}
