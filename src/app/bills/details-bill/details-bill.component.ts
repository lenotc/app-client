import { Component, OnInit } from '@angular/core';
import {BillService} from '../services/bill.service';
import {Bill} from '../model/bill';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details-bill',
  templateUrl: './details-bill.component.html',
  styleUrls: ['./details-bill.component.scss']
})
export class DetailsBillComponent implements OnInit {

  bill: Bill;

  constructor(private billService: BillService,
              private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activeRouter.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.billService.getBill(id).subscribe(bill => {
        this.bill = bill;
      });
    });
  }

}
