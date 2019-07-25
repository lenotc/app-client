import {Component, OnInit} from '@angular/core';
import {Client} from '../client';
import {ClientService} from '../client.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {Region} from '../region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  private client = new Client();
  regions: Region[];

  constructor(private clientService: ClientService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadingClient();

    this.clientService.getRegion().subscribe(regions => this.regions = regions);
  }

  loadingClient(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.clientService.getClient(id).subscribe(client => this.client = client);
      }
    });
  }

  create() {
    console.log(this.client);
    this.clientService.create(this.client).subscribe(response => {
        swal.fire({title: 'New Client has bee created', text: `Client ${response.name}`, type: 'success'});
        this.router.navigate(['/clients']);
      },
      err => {
        const errors = err.error.errors as string[];
        console.log(`Cod of Erro of backend: ${err.status}`);
        console.log(errors);
      }
    );
  }

  updated(): void {
    console.log(this.client);
    this.clientService.updated(this.client)
      .subscribe(client => {
          swal.fire({title: 'The client has bee updated', text: `Client ${client.name} as updated success`, type: 'success'});
          this.router.navigate(['/clients']);
        },
        err => {
          console.log(`Cod of Error ${err.status}`);
          console.log(err.error.erros);
        });
  }

  compareRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
}
