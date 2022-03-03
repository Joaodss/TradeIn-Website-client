import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/products.model';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  selectedProduct!: Product;

  selectedProductId: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  selectProduct(productAndId: { id: number, product: Product }) {
    this.selectedProductId = productAndId.id;
    this.selectedProduct = productAndId.product;
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }

  addProduct(product: Product) {
    this.selectedProductId = -1;
    this.selectedProduct = product;
    this.products.push(product);
  }

  updateProduct(productAndId: { id: number, product: Product }) {
    this.selectedProductId = -1;
    this.selectedProduct = productAndId.product;
    this.products[productAndId.id] = productAndId.product;
  }

  passSelectedProduct() {
    if (this.selectedProductId === -1) {
      return this.selectedProduct;
    }
    return {
      shippingCountryISOCode: '',
      category: '',
      brand: '',
      model: '',
      condition: '',
      details: '',
      bagDTO: {
        size: '',
        extras: []
      },
      shoesDTO: {
        size: 0,
      },
      photos: [],
      blemishPhotos: []
    };
  }

  hasFixedCountry(): boolean {
    return this.products.length > 0;
  }

  getFixedCountry(): string {
    return this.products.length > 0 ? this.products[0].shippingCountryISOCode : ''
  }


}
