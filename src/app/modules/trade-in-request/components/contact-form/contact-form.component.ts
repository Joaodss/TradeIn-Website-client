import { Contact } from './../../models/contact.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TradeRequestService } from './../../services/trade-request-service.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact: Contact = this.tradeRequestService.fetchContact();
  contactForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNumber: FormControl;

  constructor(
    public tradeRequestService: TradeRequestService,
    public router: Router
  ) {
    this.firstName = new FormControl(this.contact.fistName, [Validators.required]);
    this.lastName = new FormControl(this.contact.lastName, [Validators.required]);
    this.email = new FormControl(this.contact.email, [Validators.required, Validators.email]);
    this.phoneNumber = new FormControl(this.contact.phoneNumber, [Validators.required, Validators.pattern('^([\+(]{1,2})?([0-9()-])*$')]);
    this.contactForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber
    });
  }

  ngOnInit(): void {
  }

  hasSpecificError(formElement: FormControl): boolean {
    return !formElement.valid && formElement.touched;
  }

  getError(formElement: FormControl): string {
    if (formElement.hasError('required')) return "This field is required";
    if (formElement.hasError('email')) return "Must be a valid email address";
    if (formElement.hasError('pattern')) return "Must be a valid phone number";
    return "";
  }

  hasError(): boolean {
    return this.contactForm.invalid;
  }

  registerContact(): void {
    this.contact = {
      fistName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value
    };

    this.tradeRequestService.saveContact(this.contact);
    console.log('Contact form submitted');
    console.log(this.contact);
    this.router.navigate(['/trade-in-request/products']);
  }

}
