import { Component, OnInit } from '@angular/core';
import { TradeRequestService } from '../../services/trade-request-service.service';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {
  successRequest: any;

  constructor(
    public tradeService: TradeRequestService
  ) { }

  ngOnInit(): void {
    this.successRequest = this.tradeService.fetchRequest();
  }
}
