import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-build-in',
  templateUrl: './build-in.component.html',
  styleUrls: ['./build-in.component.css']
})
export class BuildInComponent implements OnInit {
  title = 'CustomerManagement';
  constructor() { }

  ngOnInit(): void {
  }

}
