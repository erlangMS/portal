import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  year: number;

  constructor() { }

  ngOnInit() {
    this.year = (new Date()).getFullYear();
  }

}
