import { Country } from './../../models/country.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Product } from './../../models/products.model';
import { CustomValidator } from '../../validators/product-form-validator';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input()
  id!: number;

  @Input()
  firstShippingCountryISOCode!: string;

  @Input()
  product: Product = {
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

  @Output() emitAddProduct = new EventEmitter<Product>();

  countries = this.getCountries();
  categories = ['Bag', 'Shoes'];
  brands = ['Cartier', 'Chanel', 'Dior', 'Gucci', 'Hermes', 'Louis Vuitton', 'Prada'];
  conditions = ['Pristine', 'Excellent', 'Very good', 'Good', 'Used', 'Poor'];
  bagSizes = ['Extra small', 'Small', 'Medium', 'Large', 'Extra large'];
  bagExtrasOptions = ['Box', 'Authenticity card', 'Shoulder strap', 'Dustbag', 'Pouch', 'Padlock and key', 'Bag charm', 'Name tag', 'Mirror']

  selectedBagExtras = [];


  productForm: FormGroup;
  shippingCountryISOCode: FormControl;
  category: FormControl;
  brand: FormControl;
  model: FormControl;
  condition: FormControl;
  details: FormControl;
  bagSize: FormControl;
  bagExtras: FormControl;
  shoesSize: FormControl;
  photos: FormControl;
  blemishPhotos: FormControl;


  constructor(

  ) {
    this.shippingCountryISOCode = new FormControl(
      this.firstShippingCountryISOCode != null ? this.firstShippingCountryISOCode : this.product.shippingCountryISOCode,
      [Validators.required]
    );
    this.category = new FormControl(this.product.category, [Validators.required]);
    this.brand = new FormControl(this.product.brand, [Validators.required]);
    this.model = new FormControl(this.product.model, [Validators.required,]);
    this.condition = new FormControl(this.product.condition, [Validators.required]);
    this.details = new FormControl(this.product.details, []);
    this.bagSize = new FormControl(this.product.bagDTO.size, [CustomValidator.requiredForBagCategory]);
    this.bagExtras = new FormControl(this.product.bagDTO.extras, [CustomValidator.requiredForBagCategory]);
    this.shoesSize = new FormControl(this.product.shoesDTO.size, [CustomValidator.requiredForShoes]);
    this.photos = new FormControl(this.product.photos, [Validators.required]);
    this.blemishPhotos = new FormControl(this.product.blemishPhotos, []);
    this.productForm = new FormGroup({
      shippingCountryISOCode: this.shippingCountryISOCode,
      category: this.category,
      brand: this.brand,
      model: this.model,
      condition: this.condition,
      details: this.details,
      bagSize: this.bagSize,
      bagExtras: this.bagExtras,
      shoesSize: this.shoesSize,
      photos: this.photos,
      blemishPhotos: this.blemishPhotos
    });
  }

  ngOnInit(): void {
  }

  getCountries(): string[] {

    let a = (Object.keys(Country) as Array<keyof typeof Country>).map((key) => { });
    console.log(a);

    return Object.keys(Country);
  }

  getCountryCode(country: string): string {
    return (<any>Country)[country];
  }

  hasSpecificError(formElement: FormControl): boolean {
    return !formElement.valid && formElement.touched;
  }

  getError(formElement: FormControl): string {
    if (formElement.hasError('required')) return "This field is required";
    return "";
  }

  hasError(): boolean {
    return this.productForm.invalid;
  }

  registerProduct(): void {
    console.log(this.productForm.value);
    this.addProduct();
  }

  addProduct(): void {
    this.emitAddProduct.emit({
      shippingCountryISOCode: this.shippingCountryISOCode.value,
      category: this.category.value,
      brand: this.brand.value,
      model: this.model.value,
      condition: this.condition.value,
      details: this.details.value,
      bagDTO: {
        size: this.bagSize.value,
        extras: this.bagExtras.value
      },
      shoesDTO: {
        size: this.shoesSize.value,
      },
      photos: this.photos.value,
      blemishPhotos: this.blemishPhotos.value
    });
  }

}
