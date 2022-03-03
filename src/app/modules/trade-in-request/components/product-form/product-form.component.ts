import { Photo } from './../../models/photo.model';
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
  id: number = -1;

  @Input()
  hasShippingCountryFixed: boolean = false;

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
  @Output() emitUpdateProduct = new EventEmitter<any>();

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
      this.hasShippingCountryFixed ? this.firstShippingCountryISOCode : this.product.shippingCountryISOCode,
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
    this.photos = new FormControl(this.product.photos ? this.product.photos : new Array<Photo>(), [Validators.required]);
    this.blemishPhotos = new FormControl(this.product.blemishPhotos ? this.product.blemishPhotos : new Array<Photo>(), []);
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

  getEmptyProduct(): Product {
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

  getCountries(): string[] {
    return Object.keys(Country);
  }

  getCountryCode(country: string): string {
    if (country === '') return '';
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

  hasUpdateId(): boolean {
    return this.id !== -1;
  }

  registerProduct(): void {
    console.log(this.productForm.value);
    this.addProduct();
  }

  addPhoto(photo: Photo) {
    this.photos.setValue(
      this.getPhotos()
        .filter((p: Photo) => p.tag !== photo.tag)
        .concat(photo)
    );
  }

  removePhoto(photo: Photo) {
    this.photos.setValue(this.photos.value.filter((p: Photo) => p.tag !== photo.tag));
  }

  addBlemishPhoto(photo: Photo) {
    this.blemishPhotos.setValue(
      this.getBlemishPhotos()
        .filter((p: Photo) => p.tag !== photo.tag)
        .concat(photo)
    );
  }

  getPhotos(): Photo[] {
    if (!this.photos.value) this.photos.setValue([]);
    return this.photos.value;
  }

  getPhotoByTag(tag: string): Photo {
    const photo = this.getPhotos().find((p: Photo) => p.tag === tag)
    if (!photo) return this.getEmptyPhoto();
    return photo;
  }

  getBlemishPhotos(): Photo[] {
    if (!this.blemishPhotos.value) this.blemishPhotos.setValue([]);
    return this.blemishPhotos.value;
  }

  getBlemishPhotosNextId(): number {
    return this.getBlemishPhotos().length + 1;
  }

  getEmptyPhoto(): Photo {
    return {
      tag: 'blemish_photo_' + this.getBlemishPhotosNextId(),
      name: 'Blemish Photo #' + this.getBlemishPhotosNextId(),
      url: '',
      file: null
    }
  }

  addProduct(): void {
    this.product = {
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
    }
    this.emitAddProduct.emit(this.product);
    this.productForm.reset();
    this.shippingCountryISOCode.setValue(this.hasShippingCountryFixed ? this.firstShippingCountryISOCode : this.product.shippingCountryISOCode);
    this.product = this.getEmptyProduct();
  }

  updateProduct(): void {
    if (this.id < 0) return;
    this.product = {
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
    }
    this.emitAddProduct.emit(this.product);
    this.productForm.reset();
    this.shippingCountryISOCode.setValue(this.hasShippingCountryFixed ? this.firstShippingCountryISOCode : this.product.shippingCountryISOCode);
    this.product = this.getEmptyProduct();
  }

}
