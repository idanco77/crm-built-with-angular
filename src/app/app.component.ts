import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ExpendScreenService} from './services/expend-screen.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'testing-angular';
  isLoggedIn: boolean = false;
  userEmail: string;
  isOpenLeft: boolean;
  private isOpenSub: Subscription;
  currentYear: Date;

  constructor(private authService: AuthService, private expendScreenService: ExpendScreenService) {
  }

  ngOnInit() {
    this.currentYear = new Date();
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.userEmail = auth.email;
      }
    });
    this.isOpenSub = this.expendScreenService.isOpenLeft.subscribe((isOpen: boolean) => {
      this.isOpenLeft = isOpen;
    });
  }

  ngOnDestroy() {
    this.isOpenSub.unsubscribe();
  }

}
