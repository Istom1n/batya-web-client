import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { LoginComponent } from "./login.component";
import { RegistrationComponent } from "./registration.component";
import { ChatComponent } from "./chat.component";

import { AppRoutingModule } from "./app-routing.module";
//
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ContactsService } from "./contacts.service";

import { DialogService } from "./dialog.service";
import { MomentModule } from "angular2-moment";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MomentModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ChatComponent
  ],
  providers: [
    CookieService,
    ContactsService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
