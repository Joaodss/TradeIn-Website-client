import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductElementComponent } from './components/product-element/product-element.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductPageComponent } from './components/product-page/product-page.component';



@NgModule({
  declarations: [
    ContactPageComponent,
    ContactFormComponent,
    ContactInfoComponent,
    ProductElementComponent,
    ProductFormComponent,
    ProductPageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class TradeInRequestModule { }
