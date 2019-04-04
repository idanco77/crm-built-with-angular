import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input()
  childHeaderTitle: string;
  @Input()
  childHeaderIcon: string;

  constructor() {
  }

  ngOnInit() {
    this.childHeaderIcon = this.childHeaderIcon ? this.childHeaderIcon : 'fas fa-angle-double-up';
  }

}
