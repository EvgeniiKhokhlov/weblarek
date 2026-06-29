
import { IApi, IOrderRequest, TOrderResponse, IProductsResponse } from '../../types/index';

export class ServerApi {
   protected api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<IProductsResponse> {
    return this.api.get('/product/');
  }

  async postOrder(orderRequest: IOrderRequest): Promise<TOrderResponse> {
    return this.api.post('/order/', orderRequest);
  }
}