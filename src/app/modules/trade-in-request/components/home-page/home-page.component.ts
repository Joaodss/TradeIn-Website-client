import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigateToContact(): void {
    this.router.navigate(['/trade-in-request/contact']);
  }

}
