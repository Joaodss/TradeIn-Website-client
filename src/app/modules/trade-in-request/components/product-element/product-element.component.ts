import { Product } from './../../models/products.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-element',
  templateUrl: './product-element.component.html',
  styleUrls: ['./product-element.component.css']
})
export class ProductElementComponent implements OnInit {
  @Input()
  tempId!: number;

  @Input()
  product!: Product

  constructor() { }

  ngOnInit(): void {
  }

  editProduct(): void {

  }

  deleteProduct(): void {

  }

}
