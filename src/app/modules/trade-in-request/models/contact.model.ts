interface Contact {
  fistName: string,
  lastName: string,
  email: string,
  phoneNumber: string
}

export class ContactData {
  constructor(private _contact: Contact) { }

  public get contact(): Contact {
    return this._contact;
  }

  public set contact(contact: Contact) {
    this._contact

  }

}
