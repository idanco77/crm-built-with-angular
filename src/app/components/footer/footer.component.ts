import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: Date;

  @Input()
  isLoggedIn: boolean;

  constructor() {
  }

  ngOnInit() {
    this.currentYear = new Date();
  }

}
