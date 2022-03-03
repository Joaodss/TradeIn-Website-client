import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../models/products.model';
import { Contact } from './../models/contact.model';
import { ProductsDTO, TradeInRequestDTO } from './../models/trade-in-request.model';


@Injectable({
  providedIn: 'root'
})
export class TradeRequestService {
  readonly baseUrl: string = "http://localhost:8080/api/v1/trade-in-request";
  readonly parentFolderId = "1gov1DtQoyiJy4mqfln8Ne6ls4B4MgEfh";

  constructor(
    private http: HttpClient
  ) { }


  resetStoredValues(): void {
    sessionStorage.removeItem('contact');
    sessionStorage.removeItem('products');
  }

  resetProducts(): void {
    sessionStorage.removeItem('products');
  }

  saveContact(contact: Contact): void {
    sessionStorage.setItem('contact', JSON.stringify(contact));
  }

  fetchContact(): Contact {
    let savedContact = sessionStorage.getItem('contact');
    return savedContact != null ?
      JSON.parse(savedContact) :
      {
        fistName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      };
  }

  saveProducts(products: Product[]): void {
    sessionStorage.setItem('products', JSON.stringify(products));
  }
  fetchProducts(): Product[] {
    let savedProducts = sessionStorage.getItem('products');
    return savedProducts != null ?
      JSON.parse(savedProducts) : [];
  }

  saveRequest(request: any): void {
    sessionStorage.setItem('request', JSON.stringify(request));
  }
  fetchRequest(): any {
    let savedRequest = sessionStorage.getItem('request');
    return savedRequest != null ?
      JSON.parse(savedRequest) : null;
  }

  submitRequest(): Observable<TradeInRequestDTO> | null {
    const contactString = sessionStorage.getItem('contact');
    const productsString = sessionStorage.getItem('products');
    if (contactString !== null && productsString !== null) {
      const contact: Contact = JSON.parse(contactString);
      const products: Product[] = JSON.parse(productsString);
      console.log(contact);
      console.log(products);
      const request = this.convertToRequest(contact, products);

      return this.exportToDataBase(request);
    }
    return null;
  }

  convertToRequest(contact: Contact, products: Product[]): TradeInRequestDTO {
    let finalProducts: ProductsDTO[] = [];
    console.log('adsfgadg');

    for (const product of products) {
      console.log('adsfgadg');
      finalProducts.push({
        category: product.category,
        brand: product.brand,
        model: product.model,
        condition: product.condition,
        details: product.details,
        photosFolderURL: '',
        bagDTO: {
          size: product.bagDTO.size,
          extras: product.bagDTO.extras
        },
        shoesDTO: {
          size: product.shoesDTO.size
        }
      });
    }
    return {
      firstName: contact.fistName,
      lastName: contact.lastName,
      email: contact.email,
      mobileNumber: contact.phoneNumber,
      shippingCountryISOCode: products[0].shippingCountryISOCode,
      products: finalProducts
    }
  }

  exportToDataBase(request: TradeInRequestDTO): Observable<TradeInRequestDTO> {
    return this.http.post<TradeInRequestDTO>(this.baseUrl, request);
  }

}
