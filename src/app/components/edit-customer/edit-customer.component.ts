/// <reference types="@types/googlemaps" />
import {Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import {Customer} from '../../models/customer';
import {CustomersService} from '../../services/customers.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FlashMessagesService} from 'angular2-flash-messages';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  parentHeaderIcon: string;
  parentHeaderTitle: string;
  id: string;

  @ViewChild('search') public searchElement: ElementRef;

  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  };

  constructor(
    private _cs: CustomersService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _titleService: Title,
    private _flashMessageService: FlashMessagesService,
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this._titleService.setTitle('IC-CRM | Edit Customer');
    this.parentHeaderTitle = 'Edit Customer';
    this.parentHeaderIcon = 'fas fa-user-edit';
    this.id = this._route.snapshot.params['id'];
    this._cs.getCustomer(this.id).subscribe(customer => this.customer = customer);

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
      this._flashMessageService.show('Customer updated', {
        cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center',
        timeout: 3000
      });
      value.id = this.id;
      this._cs.updateCustomer(value);
      this._router.navigate(['/customers']);
    }
  }

}
