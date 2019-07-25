import {Component, OnInit} from '@angular/core';
import {Client} from './client';
import {ClientService} from './client.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from './details/modal.service';
import {AuthService} from '../users/auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  paginator: any;
  clientSelected: Client;

  constructor(private clientService: ClientService,
              private activatedRouter: ActivatedRoute,
              private modalService: ModalService,
              private authService: AuthService) {
  }

  ngOnInit() {

    this.activatedRouter.paramMap.subscribe(params => {
      const page = +params.get('page') || 0;
      this.clientService.getClients(page).subscribe(response => {
        this.clients = response.content;
        this.paginator = response;
      });
    });

    this.modalService.notificationUpload.subscribe(client => {
      this.clients.map(clientOr => {
        if (client.id === clientOr.id) {
          clientOr.img = client.img;
        }
        return clientOr;
      });
    });
  }

  delete(client: Client) {
    swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clientService.delete(client.id).subscribe(response => {

            this.clients = this.clients.filter(cli => cli !== client);

            swal.fire(
              'Deleted!',
              'Client has been deleted.',
              'success'
            );
          }
        );
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }

  openModal(client: Client) {
    this.clientSelected = client;
    this.modalService.openModal();
  }
}
