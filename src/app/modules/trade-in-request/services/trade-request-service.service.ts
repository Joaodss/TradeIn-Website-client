import { Injectable } from '@angular/core';
import { ContactData } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class TradeRequestService {
  contact: ContactData = new ContactData({
    fistName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });



  constructor() {
    this.resetStoredValues();
  }


  resetStoredValues(): void {
    this.contact = new ContactData({
      fistName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    });
  }

  setContact(contact: ContactData): void {
    this.contact = contact;
  }

  getContact(): ContactData {
    return this.contact;
  }



  exportPhotos() {

  }

  exportToDataBase() {

  }

}
