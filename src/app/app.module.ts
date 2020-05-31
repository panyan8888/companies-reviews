import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {HttpClientModule} from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { PrifileComponent } from './components/prifile/prifile.component';
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { ReviewItemComponent } from './components/review-item/review-item.component';
import { ReviewModalComponent } from './components/review-modal/review-modal.component';
import {defaultSimpleModalOptions, SimpleModalModule} from 'ngx-simple-modal';
import { SimpleUserItemComponent } from './components/simple-user-item/simple-user-item.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    MainComponent,
    PrifileComponent,
    CompanyItemComponent,
    ReviewItemComponent,
    ReviewModalComponent,
    SimpleUserItemComponent
  ],
  entryComponents: [
    ReviewModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SimpleModalModule.forRoot({container: document.body}, {
      ...defaultSimpleModalOptions,
      closeOnEscape: true,
      closeOnClickOutside: true,
      animationDuration: 300,
      autoFocus: true
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
