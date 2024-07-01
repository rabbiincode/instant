import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScrollToTopComponent } from '../../utilities/scroll-to-top/scroll-to-top.component';
import { HeaderComponent } from '../header/header.component';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { StarRatingComponent } from '../../utilities/star-rating/star-rating.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, ScrollToTopComponent, StarRatingComponent, CommonModule, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})

export class ProductDetailComponent{
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService){}
  loading = false
  productDetail!: any
  fetchingData = false
  previewImageUrl!: string
  @Input() preview = false
  readContent!: any[]
  readMoreContent!: any[]
  @Output() back = new EventEmitter<boolean>()
  @Output() resetInputs = new EventEmitter<boolean>()

  ngOnInit() {
    // Subscribe to route change event and rerender component on route change
    this.activatedRoute.queryParams.subscribe(params => {
      this.productService.getProductById(params['id']).subscribe(data => {
        this.productDetail = data
      })
    })
  }
}
