import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../client';
import {ClientService} from '../client.service';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
import {ModalService} from './modal.service';
import {AuthService} from '../../users/auth.service';

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
              private authService: AuthService) {
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
}
