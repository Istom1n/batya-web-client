import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contact } from './contact';

@Injectable()
export class ContactsService {
  constructor(
    private http: Http,
  ) {}

  getContacts(token: string): Promise<Contact[]> {
    return this.http.get(`http://146.185.160.146:8080/${token}/contacts`)
      .toPromise()
      .then(response => response.json().dialogs as Contact[])
      .catch(this.handleError);
  }

  getName(token: string, dialog: Contact): Promise<string> {
    return this.http.get(`http://146.185.160.146:8080/${token}/name/${dialog.dialog_id}`)
      .toPromise()
      .then(response => response.json().dialog_name)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);

    return Promise.reject(error.message || error);
  }
}
