import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.scss']
})
export class DirectivaComponent implements OnInit {

  listCourse: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];
  enable = true;

  constructor() {
  }

  ngOnInit() {
  }

  onEnable() {
    return this.enable = !this.enable;
  }
}
