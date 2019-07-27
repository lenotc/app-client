import {Product} from './product';

export class BillItem {
  id: number;
  amount: number;
  product: Product;
  quantity = 1;

  public calcQuantity(): number {
    return this.quantity * this.product.price;
  }
}
