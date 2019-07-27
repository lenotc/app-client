import {BillItem} from './bill-item';
import {Client} from '../../clients/client';

export class Bill {
  id: number;
  description: string;
  observation: string;
  createAt: Date;
  items: BillItem[] = [];
  client: Client;
  total: number;

  calcTotal(): number {
    this.total = 0;
    this.items.forEach((item: BillItem) => {
      this.total += item.calcQuantity();
    });

    return this.total;
  }
}
