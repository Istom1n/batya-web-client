import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contact } from './contact';
import { Message } from "./message";

@Injectable()
export class DialogService {
  constructor(
    private http: Http
  ) {}

  getMessages(token: string, contact: Contact): Promise<Message[]> {
    return this.http.get(`http://146.185.160.146:8080/${token}/messages/${contact.dialog_id}`)
      .toPromise()
      .then(response => response.json().messages as Message[])
      .catch(this.handleError);
  }

  sendMessage(token: string, contact: Contact, message: string): Promise<number> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`http://146.185.160.146:8080/${token}/messages/send/${contact.dialog_id}`,
      {
        "type": "text",
        "content": message
      },
      options)
      .map(e => e.json().timestamp)
      .toPromise()
      .then(token => +token)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);

    return Promise.reject(error.message || error);
  }
}
