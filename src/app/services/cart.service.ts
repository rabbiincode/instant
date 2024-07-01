import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartItems: any[] = []
  cartItemCount = new BehaviorSubject<number>(0)
  allCartItems = new BehaviorSubject<string[]>(this.cartItems)

  getItems(): Observable<any[]> {
    return this.allCartItems
  }

  addToCart(product: any) {
    // Find the index of cart item, if it exists, update, else add
    const index = this.cartItems.findIndex(products => products.id == product.id)
    if (index !== -1){
      this.cartItems[index] = product
    } else{
      this.cartItems.push(product)
    }
    this.allCartItems.next(this.cartItems)
    this.cartItemCount.next(this.cartItems.length)
  }

  removeItem(product: any) {
    this.cartItems = this.cartItems.filter(products => product.id != products.id)
    this.allCartItems.next(this.cartItems)
    this.cartItemCount.next(this.cartItems.length)
    // alert(this.cartItems)
  }

  clearCart() {
    this.cartItems = []
    this.allCartItems.next(this.cartItems)
    this.cartItemCount.next(this.cartItems.length)
    return this.cartItems
  }
}
