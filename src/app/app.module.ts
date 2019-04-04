import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AgmCoreModule} from '@agm/core';
// ... ... ...

import {AppComponent} from './app.component';
import {TopnavComponent} from './components/topnav/topnav.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {CustomersComponent} from './components/customers/customers.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {PageHeaderComponent} from './components/page-header/page-header.component';
import {NewCustomerComponent} from './components/new-customer/new-customer.component';
import {CustomerDetailsComponent} from './components/customer-details/customer-details.component';
import {EditCustomerComponent} from './components/edit-customer/edit-customer.component';
import {FooterComponent} from './components/footer/footer.component';
import {CleanNamePipe} from './pipes/clean-name.pipe';
import {LoginComponent} from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    SidenavComponent,
    CustomersComponent,
    PageNotFoundComponent,
    ContactsComponent,
    PageHeaderComponent,
    NewCustomerComponent,
    CustomerDetailsComponent,
    EditCustomerComponent,
    FooterComponent,
    CleanNamePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDh53thDvdDawgeRnjqQlrc4MXODSjyHRc',
      libraries: ['places']
    })
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
