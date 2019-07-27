import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../client';
import {ClientService} from '../client.service';
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
import {ModalService} from './modal.service';
import {AuthService} from '../../users/auth.service';
import {BillService} from '../../bills/services/bill.service';
import {Bill} from '../../bills/model/bill';
import Swal from 'sweetalert2';

@Component({
  selector: 'details-client',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() client: Client;
  private fileImg: File;
  progress = 0;

  constructor(private clientService: ClientService,
              private modalService: ModalService,
              private authService: AuthService,
              private billService: BillService) {
  }

  ngOnInit() {
  }

  selectImg(event) {
    this.fileImg = event.target.files[0];
    this.progress = 0;
    console.log(this.fileImg);

    if (this.fileImg.type.indexOf('image') < 0) {
      swal.fire('Error on select the image correct', 'Please select the correct image', 'error');
      this.fileImg = null;
    }
  }

  uploadImg() {

    if (!this.fileImg) {
      swal.fire({title: 'Error Upload', text: 'Choose right image', type: 'error'});
    } else {

      this.clientService.uploadImg(this.fileImg, this.client.id)
        .subscribe(event => {

          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body;
            this.client = response.client as Client;
            this.modalService.notificationUpload.emit(this.client);
            swal.fire({title: 'The image is save', text: `You image ${this.client.img} is save`, type: 'success'});
          }
        });
    }
  }

  closeModal() {
    this.modalService.closeModal();
    this.fileImg = null;
    this.progress = 0;
  }

  delete(bill: Bill): void {

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
        this.billService.delete(bill.id).subscribe(response => {

            this.client.bills = this.client.bills.filter(cli => cli !== bill);

            swal.fire(
              'Deleted!',
              'Bill has been deleted.',
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
}
