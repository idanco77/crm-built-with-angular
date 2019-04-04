/// <reference types="@types/googlemaps" />
import {Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CustomersService} from '../../services/customers.service';
import {Customer} from '../../models/customer';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {MapsAPILoader} from '@agm/core';


// ... ... ...
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})

export class NewCustomerComponent implements OnInit {

  headerTitle: string;
  headerIcon: string;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  notes: string = '';

  @ViewChild('search') public searchElement: ElementRef;

  constructor(
    private _titleService: Title,
    private _cs: CustomersService,
    private _router: Router,
    private _flashMessageService: FlashMessagesService,
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this._titleService.setTitle('IC-CRM | New customer');
    this.headerTitle = ' Add customer';
    this.headerIcon = 'fas fa-plus-circle';

    this._mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {types: ['address']});

        autocomplete.addListener('place_changed', () => {
          this._ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
  }

// ... ... ...
  onSubmit({value, valid}: { value: Customer, valid: boolean }) {
    if (valid) {
      this._flashMessageService.show('Customer saved', {
        cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center',
        timeout: 3000
      });
      this._cs.addCustomer(value);
      this._router.navigate(['/customers']);
    }
  }

}
