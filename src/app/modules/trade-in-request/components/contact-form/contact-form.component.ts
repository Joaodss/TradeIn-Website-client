import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNumber: FormControl;

  constructor() {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phoneNumber = new FormControl('', [Validators.required, Validators.pattern('^([\+(]{1,2})?([0-9()-])*$')]);
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

    console.log('Contact form submitted');
    console.log(this.contactForm.value);

  }

}
