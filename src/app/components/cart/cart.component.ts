import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent{
  loading = false
  products: any[] = []
  // cartItems: any[] = []

  constructor(private cartService: CartService, private router: Router){}

  ngOnInit(): void {
    this.loading = true
    this.cartService.allCartItems.subscribe(items => {
      this.products = items
      this.loading = false
      // if (items.length == 0) {
      //   this.products = []
      // } else {
      //   for (let item of this.cartItems){
      //     console.log(item)
      //     this.productService.getProductById(item).subscribe(data => {
      //       this.products.push(data)
      //       this.loading = false
      //     })
      //   }
      // }
    })
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/product/'], { queryParams: { id: productId } })
  }

  remove(product: any) {
    this.cartService.removeItem(product)
  }
}
