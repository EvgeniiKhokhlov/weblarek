import { IProduct } from '../../types/index';

export class ShoppingCart {
    protected productList: IProduct[];

    constructor() {
        this.productList = [];
    };

    getProductList(): IProduct[] {
        return this.productList;
    };

    addProductList(product: IProduct): void {
        this.productList.push(product);
    };

    deleteProductList(id: string): void {
        this.productList = this.productList.filter((product) => product.id !== id);
    };

    emptyingProductList(): void {
        this.productList = [];
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
