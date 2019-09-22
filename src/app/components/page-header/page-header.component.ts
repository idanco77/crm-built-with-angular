import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ExpendScreenService} from '../../services/expend-screen.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  @Input() childHeaderTitle: string;
  @Input() childHeaderIcon: string;
  isOpenLeft: boolean;
  private isOpenSub: Subscription;

  constructor(private expendScreenService: ExpendScreenService) {
  }

  ngOnInit() {
    this.childHeaderIcon = this.childHeaderIcon ? this.childHeaderIcon : 'fas fa-angle-double-up';
    this.isOpenSub = this.expendScreenService.isOpenLeft.subscribe((isOpen: boolean) => {
      this.isOpenLeft = isOpen;
    });
  }

  ngOnDestroy() {
    this.isOpenSub.unsubscribe();
  }
}
