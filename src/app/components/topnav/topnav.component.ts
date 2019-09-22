import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ExpendScreenService} from '../../services/expend-screen.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  @Input()
  userEmail: string;
  @Input()
  isLoggedIn: boolean;
  openLeft = false;

  constructor(private authService: AuthService, private expendScreenService: ExpendScreenService) {
  }

  ngOnInit() {

  }

  onLogout(e) {
    e.preventDefault();
    this.authService.logout();
    window.location.reload();

  }

  onOpenLeft() {
    this.openLeft = !this.openLeft;
    this.expendScreenService.isOpenLeft.next(this.openLeft);
  }
}
