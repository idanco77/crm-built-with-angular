import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../models/contact';
import {Title} from '@angular/platform-browser';
import {ContactsService} from '../../services/contacts.service';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {ExpendScreenService} from '../../services/expend-screen.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit, OnDestroy {
  searchFieldClasses: any;
  contacts: Array<Contact> = [];
  baseUrl: string;
  contactsCache: Array<Contact>;
  contactsLength: number;
  searchNameText: string;
  parentHeaderTitle: string;
  parentHeaderIcon: string;
  isOpenLeft: boolean;
  private isOpenSub: Subscription;

  constructor(private titleService: Title, private contactService: ContactsService,
              private expendScreenService: ExpendScreenService) {
  }

  ngOnInit() {
    this.searchFieldClasses = {
      'form-control': true,
      'form-control-lg': false
    };
    this.titleService.setTitle('IC-CRM | Contact');
    this.contactService.getContacts().subscribe((data: Array<Contact>) => {
      this.contactsCache = this.contacts = _.sortBy(data, ['name']);
      this.contactsLength = this.contacts.length;
    });
    this.parentHeaderTitle = ' Contacts';
    this.parentHeaderIcon = 'fas fa-envelope';
    this.isOpenSub = this.expendScreenService.isOpenLeft.subscribe((isOpen: boolean) => {
      this.isOpenLeft = isOpen;
    });
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

  ngOnDestroy() {
    this.isOpenSub.unsubscribe();
  }

}


