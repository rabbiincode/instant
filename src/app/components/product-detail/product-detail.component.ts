import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { StarRatingComponent } from '../../utilities/star-rating/star-rating.component';
import { ScrollToTopComponent } from '../../utilities/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, ScrollToTopComponent, StarRatingComponent, CommonModule, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})

export class ProductDetailComponent{
  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService, private location: Location, private productService: ProductService, private router: Router){}
  loading = false
  productDetail!: any
  readContent!: any[]
  readMoreContent!: any[]

  ngOnInit() {
    this.loading = true
    // Subscribe to route change event and rerender component on route change
    this.activatedRoute.queryParams.subscribe(params => {
      this.productService.getProductById(params['id']).subscribe(data => {
        this.productDetail = data
        this.loading = false
      })
    })
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId)
  }
  back() {
    this.location.back()
  }
}
