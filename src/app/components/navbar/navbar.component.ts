import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent{
  itemsInCart = 0
  showSearch = false
  searchValue!: string
  currentRoute!: string
  @Output() searchProduct = new EventEmitter()
  @Output() toggleSidebar = new EventEmitter<string>()
  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService, private router: Router){}

  ngOnInit (){
    this.cartService.cartItemCount.subscribe(count => this.itemsInCart = count)
    this.activatedRoute.url.subscribe(urlSegments => {
      this.currentRoute = urlSegments.join('/')
    })
  }

  sidebarToggle() {
    this.toggleSidebar.emit()
  }
  search() {
    this.searchValue && this.searchProduct.emit(this.searchValue)
  }
  handleCart() {
    this.currentRoute.includes('cart') ? this.cartService.clearCart() : this.router.navigate(['/cart'])
  }
}
