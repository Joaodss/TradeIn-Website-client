import { ProductPageComponent } from './modules/trade-in-request/components/product-page/product-page.component';
import { HomePageComponent } from './modules/trade-in-request/components/home-page/home-page.component';
import { ContactPageComponent } from './modules/trade-in-request/components/contact-page/contact-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomePageComponent, },
  { path: '/trade-in-request/contact', component: ContactPageComponent, },
  { path: '/trade-in-request/products', component: ProductPageComponent, },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
