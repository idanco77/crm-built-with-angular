import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'testing-angular';
  isLoggedIn: boolean = false;
  userEmail: string;

  constructor(
    private _authService: AuthService
  ) {
  }

  ngOnInit() {
    this._authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.userEmail = auth.email;
      }
    });
  }

}
