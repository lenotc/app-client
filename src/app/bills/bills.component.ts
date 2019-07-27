import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Bill} from './model/bill';
import {ClientService} from '../clients/client.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {BillService} from './services/bill.service';
import {Product} from './model/product';
import {flatMap} from 'rxjs/internal/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {BillItem} from './model/bill-item';
import swal from 'sweetalert2';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  bill = new Bill();

  autoCompleteControl = new FormControl();
  productsFiltered: Observable<Product[]>;

  constructor(private activateRouter: ActivatedRoute,
              private clientService: ClientService,
              private billService: BillService,
              private router: Router) {
  }

  ngOnInit() {
    this.activateRouter.paramMap.subscribe(params => {
      const id = +params.get('clientId');
      this.clientService.getClient(id).subscribe(client => {
        this.bill.client = client;
      });
    });


    this.productsFiltered = this.autoCompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();

    return this.billService.filterProduct(filterValue);
  }

  showName(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  productSelected(event: MatAutocompleteSelectedEvent) {
    const product = event.option.value as Product;

    if (this.hasItem(product.id)) {
      this.incrementQuantity(product.id);
    } else {
      const billItem = new BillItem();
      billItem.product = product;
      this.bill.items.push(billItem);
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  updateQuantity(id: number, event: any) {
    const quantity: number = event.target.value as number;

    if (quantity == 0) {
      this.removeItem(id);
    }

    this.bill.items = this.bill.items.map((item: BillItem) => {
      if (id === item.product.id) {
        item.quantity = quantity;
      }

      return item;
    });
  }

  hasItem(id: number): boolean {
    let has = false;

    this.bill.items.forEach((item: BillItem) => {
      if (id === item.product.id) {
        has = true;
      }
    });

    return has;
  }

  incrementQuantity(id: number): void {

    this.bill.items = this.bill.items.map((item: BillItem) => {
      if (id === item.product.id) {
        ++item.quantity;
      }

      return item;
    });
  }

  removeItem(id: number) {
    this.bill.items = this.bill.items.filter((item: BillItem) => id !== item.product.id);
  }

  createBill() {
    console.log(this.bill);
    this.billService.save(this.bill).subscribe(bill => {
      swal.fire('Save', `Bill has been saved success`, 'success');
    });
    this.router.navigate(['/clients']);
  }
}
