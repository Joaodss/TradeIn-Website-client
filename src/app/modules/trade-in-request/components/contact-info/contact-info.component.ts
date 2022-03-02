import { Contact } from './../../models/contact.model';
import { Component, OnInit } from '@angular/core';
import { TradeRequestService } from '../../services/trade-request-service.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  contact!: Contact;

  constructor(
    public tradeRequestService: TradeRequestService,
  ) { }

  ngOnInit(): void {
    this.contact = this.tradeRequestService.fetchContact();
  }

}
