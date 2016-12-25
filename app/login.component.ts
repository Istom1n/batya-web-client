import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.css' ]
})

export class LoginComponent {
  private loginUrl = 'http://146.185.160.146:8080/login';

  constructor(private http: Http,
              private cookie: CookieService,
              private router: Router) {
  }

  logIn(login: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.loginUrl,
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
