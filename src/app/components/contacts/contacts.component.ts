import {Component, OnInit} from '@angular/core';
import {Contact} from '../../models/contact';
import {Title} from '@angular/platform-browser';
import {ContactsService} from '../../services/contacts.service';
import {environment} from '../../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  searchFieldClasses: any;
  contacts: Array<Contact> = [];
  baseUrl: string;
  contactsCache: Array<Contact>;
  contactsLength: number;
  searchNameText: string;
  parentHeaderTitle: string;
  parentHeaderIcon: string;

  constructor(private _titleService: Title, private _contactService: ContactsService) {
  }

  ngOnInit() {
    this.searchFieldClasses = {
      'form-control': true,
      'form-control-lg': false
    };
    this._titleService.setTitle('IC-CRM | Contact');
    // this.baseUrl = environment.baseUrl;
    this._contactService.getContacts().subscribe((data: Array<Contact>) => {
      this.contactsCache = this.contacts = _.sortBy(data, ['name']);
      this.contactsLength = this.contacts.length;
    });

    this.parentHeaderTitle = ' Contacts';
    this.parentHeaderIcon = 'fas fa-envelope';
  }

  onKeyupSearch() {
    const searchText = this.searchNameText.toLowerCase().trim();
    if (searchText.length > 0) {
      this.contacts = this.contactsCache.filter((contact) => _.includes(contact.name.toLowerCase(), searchText));
    } else {
      this.contacts = this.contactsCache;
    }
  }

  onSearchFocus() {
    this.searchFieldClasses['form-control-lg'] = !this.searchFieldClasses['form-control-lg'];

  }


}


