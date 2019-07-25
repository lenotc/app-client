import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginador: any;

  from: number;
  to: number;

  pages: number[];

  constructor() {
  }

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const paginadorActualizado = changes.paginador;

    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }
  }

  private initPaginator(): void {
    this.from = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
    this.to = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

    if (this.paginador.totalPages > 5) {
      console.log(this.to - this.from + 1);
      this.pages = new Array(this.to - this.from + 1).fill(0).map(((value, index) => index + this.from));
    } else {
      this.pages = new Array(this.paginador.totalPages).fill(0).map(((value, index) => index + 1));
    }
  }


}
