import {Component, OnChanges, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CustomersService} from '../../services/customers.service';
import {Customer} from '../../models/customer';
import * as _ from 'lodash';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  parentHeaderTitle: string;
  parentHeaderIcon: string;
  customers: Customer[];
  customersCache: Customer[];
  firstName: string;
  lastName: string;
  phone: string;

  constructor(
    private _titleService: Title,
    private _cs: CustomersService,
    private _flashMessageService: FlashMessagesService
  ) {
  }


  ngOnInit() {
    this._titleService.setTitle('IC-CRM | Customers');
    this.parentHeaderTitle = ' Customers';
    this.parentHeaderIcon = 'fas fa-users';
    this._cs.getCustomers().subscribe(customers => this.customers = this.customersCache = customers);
  }

  showOnHover($event) {
    $event.target.children[0].children[0].style.cssText = 'visibility: visible !important';
  }

  hideOnLeave($event) {
    $event.target.children[0].children[0].style.cssText = 'visibility: hidden !important';
  }

  onDeleteCustomer(customerId, event) {
    event.preventDefault();
    if (confirm('Are you sure?')) {
      this._flashMessageService.show('Customer deleted', {
        cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center',
        timeout: 3000
      });
      this._cs.deleteCustomer(customerId);
    }
  }

  onSearch(field) {
    let searchField = this[field].toLowerCase();
    if (searchField.length > 0) {
      this.customers = this.customersCache.filter(data => _.includes(data[field].toLowerCase(), searchField));
    } else {
      this.customers = this.customersCache;
    }
  }

// ... ... ...

}
