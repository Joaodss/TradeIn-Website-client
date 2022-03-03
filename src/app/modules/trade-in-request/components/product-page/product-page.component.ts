import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/products.model';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  selectedProduct!: Product;

  constructor() { }

  ngOnInit(): void {
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }


}
