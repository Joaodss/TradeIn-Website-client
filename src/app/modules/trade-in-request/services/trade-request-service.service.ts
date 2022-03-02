import { Injectable } from '@angular/core';

import { Contact } from './../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class TradeRequestService {

  constructor() { }


  resetStoredValues(): void {
  }

  saveContact(contact: Contact): void {
    sessionStorage.setItem('contact', JSON.stringify(contact));
  }

  fetchContact(): Contact {
    let savedContact = sessionStorage.getItem('contact');
    return savedContact != null ?
      JSON.parse(savedContact) :
      {
        fistName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      };
  }



  exportPhotos() {

  }

  exportToDataBase() {

  }

}
