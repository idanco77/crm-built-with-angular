import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Customer} from '../../models/customer';
import {CustomersService} from '../../services/customers.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  headerTitle: string;
  headerIcon: string;
  id: string;
  customer: Customer = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  };

  constructor(
    private _titleService: Title,
    private _cs: CustomersService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._titleService.setTitle('IC-CRM | Customer details');
    this.headerTitle = 'Customer Details';
    this.headerIcon = 'fas fa-id-card-alt';
    this.id = this._route.snapshot.params['id'];
    this._cs.getCustomer(this.id).subscribe(customer => this.customer = customer);
  }

}
