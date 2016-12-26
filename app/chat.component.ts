import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { ContactsService } from "./contacts.service";
import { Contact } from "./contact";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Message } from "./message";
import { DialogService } from "./dialog.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';


@Component({
  moduleId: module.id,
  selector: 'chat',
  templateUrl: 'chat.component.html',
})

export class ChatComponent {
  token: string;
  selectedDialog: Contact;
  dialogs: Contact[];
  messages: Message[];
  login: string;

  constructor(private cookie: CookieService,
              private contactsService: ContactsService,
              private dialogsService: DialogService,
              private http: Http,
              private router: Router) {
  }

  onSelect(dialog: Contact): void {
    this.selectedDialog = dialog;

    this.getMessages(this.selectedDialog);
    Observable.interval(2000).subscribe(() => this.getMessages(this.selectedDialog));
    // let obs: Observable<Array<number>> = new Observable(observer: => {
    //   observer.next();
    //
    //   setInterval(() => {
    //     observer.next();
    //   }, 2000)
    // });
    //
    // obs.subscribe(() => {
    //   this.getMessages(this.selectedDialog);
    //
    //   console.log('Reload chat');
    // });
  }

  logOut(): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(`http://146.185.160.146:8080/${this.token}/logout`, '',
      options)
      .map(e => e.json().message)
      .subscribe(message => {
        console.log(message);

        this.cookie.remove('token');
        this.cookie.remove('login');
        this.router.navigate(['/']);
      });
  }

  getContacts(): void {
    this.contactsService.getContacts(this.token)
      .then(dialogs => {
        this.dialogs = dialogs;

        return this.dialogs;
      }).then(dialogs => {
      for (let i in this.dialogs) {
        this.contactsService.getName(this.token, this.dialogs[i])
          .then(n => {
            this.dialogs[i].name = n;
          });
      }
    });
  }

  getMessages(contact: Contact): void {
    this.dialogsService.getMessages(this.token, contact)
      .then(messages => this.messages = messages);
  }

  sendMessage(message: string): void {
    this.dialogsService.sendMessage(this.token, this.selectedDialog, message)
      .then(timestamp => this.messages.push({
        type: 'text',
        content: message,
        sender: this.login,
        timestamp: timestamp,
        text: 'text',
      }));
  }

  getType(message: string): string {
    let tmp: string[] = message.split('|');

    let type: string = tmp[0];
    let name: string = tmp[1];

    if (type == 'invited') {
      return `Пользователь ${name} был приглашен в конференцию`;
    } else if (type == 'kicked') {
      return `Пользователь ${name} был кикнут из конференции`;
    } else if (type == 'left') {
      return `Пользователь ${name} покинул конференцию`;
    }

    return "Конференция была создана";
  }

  ngOnInit(): void {
    this.token = this.cookie.get('token');
    this.login = this.cookie.get('login');

    this.getContacts();
    Observable.interval(5000).subscribe(() => this.getContacts());
    // let obs: Observable<Array<number>> = new Observable(observer => {
    //   observer.next();
    //
    //   setInterval(() => {
    //     observer.next();
    //   }, 5000)
    // });
    //
    // obs.subscribe(() => {
    //   this.getContacts();
    //
    //   console.log('Reload navbar');
    // });
  }
}
