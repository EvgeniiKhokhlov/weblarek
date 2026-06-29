import { IProduct } from "../../types/index";

export class ProductCatalog {
    
    protected products: IProduct[];
    protected selectedProduct: IProduct | null;

    constructor() {
        this.products = [];
        this.selectedProduct = null;
    }

    saveArrayProducts(products: IProduct[]): void {
        this.products = products;

    }

    getArrayProducts(): IProduct[] {
        return this.products;
    }

    getProductByID(id: string): IProduct | undefined {
        return this.products.find((product) => product.id === id);
    }

    saveProduct(product: IProduct): void {
        this.selectedProduct = product;
    }

    getProduct(): IProduct | null {
        return this.selectedProduct;
    }
}   



