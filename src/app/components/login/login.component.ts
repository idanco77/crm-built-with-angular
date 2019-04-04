import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private _authService: AuthService,
    private _flashMessages: FlashMessagesService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this._authService.getAuth().subscribe(auth => {
      if (auth) {
        this._router.navigate(['/']);
      }
    });
  }

  // ... ... ...

  onSubmit({value, valid}: { value: any, valid: boolean }) {
    if (valid) {
      this._authService.login(value.email, value.password)
        .then(res => {
          this._flashMessages.show('You are now logged in', {
            cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center',
            timeout: 3000
          });
          this._router.navigate(['/']);
        })
        .catch(err => {
          this._flashMessages.show(err.message, {
            cssClass: 'fixed-top bg-danger w-70 text-white text-center',
            timeout: 3000
          });
        });
    }
  }

}
