import { TradeRequestService } from './../../services/trade-request-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/products.model';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  submitDisabled = false;
  products: Product[] = [];
  selectedProduct!: Product;

  selectedProductId: number = -1;

  constructor(
    public router: Router,
    public tradeService: TradeRequestService
  ) { }

  ngOnInit(): void {
    this.products = this.tradeService.fetchProducts();
  }

  selectProduct(productAndId: { id: number, product: Product }) {
    this.selectedProductId = productAndId.id;
    this.selectedProduct = productAndId.product;
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.tradeService.saveProducts(this.products);
  }

  addProduct(product: Product) {
    this.selectedProductId = -1;
    this.selectedProduct = product;
    this.products.push(product);
    this.tradeService.saveProducts(this.products);
  }

  updateProduct(productAndId: { id: number, product: Product }) {
    this.selectedProductId = -1;
    this.selectedProduct = productAndId.product;
    this.products[productAndId.id] = productAndId.product;
    this.tradeService.saveProducts(this.products);
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

  navigateBack() {
    this.router.navigate(['/trade-in-request/contact']);
  }

  submitRequest() {
    this.submitDisabled = true;
    this.tradeService.submitRequest()?.subscribe({
      next: (result: any) => {
        console.log(result);
        this.tradeService.saveRequest(result);
        this.router.navigate(['/trade-in-request/success']);
        this.tradeService.resetProducts();
        this.submitDisabled = false;
      },
      error: err => {
        console.log(err)
        this.submitDisabled = false;
      }
    });
  }

}
