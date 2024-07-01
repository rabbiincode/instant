import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CartComponent } from '../components/cart/cart.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', title: "Lowest price you can't find...", pathMatch: 'full', component: HomeComponent },
  { path: 'product', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent }
];
