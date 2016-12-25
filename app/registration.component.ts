import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie/services/cookies.service";

import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'registration',
  templateUrl: 'registration.component.html',
  styleUrls: [ 'login.css' ]
})
export class RegistrationComponent {
  private registerUrl = 'http://146.185.160.146:8080/register';

  constructor(
    private http: Http,
    private cookie: CookieService,
    private router: Router
  ) {}

  register(login: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.registerUrl,
      {
        "username": login,
        "password": password
      },
      options)
      .map(e => e.json().token)
      .subscribe(token => {
        this.cookie.put('token', token);
        this.cookie.put('login', login);

        console.log("Token: " + this.cookie.get('token'));

        this.router.navigate(['/chat']);
      });
  }
}
