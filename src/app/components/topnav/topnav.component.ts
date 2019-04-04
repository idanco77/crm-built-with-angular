import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../services/auth.service';

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


  constructor(
    private _authService: AuthService
  ) {
  }

  ngOnInit() {

  }

  onLogout(e) {
    e.preventDefault();
    this._authService.logout();
    window.location.reload();

  }


}

// ... ... ...

