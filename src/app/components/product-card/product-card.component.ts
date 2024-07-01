import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HighlightPipe } from '../../pipes/highlight.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, HighlightPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})

export class ProductCardComponent{
  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService, private router: Router){}
  totalPages = 1
  currentPage = 1
  dataPerPage = 8
  loading = true
  username!: string
  cartItems: any[] = []
  currentRoute!: string
  indexOfLastItem!: any
  indexOfFirstItem!: any
  currentProducts!: any[]
  @Input() products!: any[]
  @Input() searchValue!: string

  // Page pagination
  ngOnChanges() {
    // This method is called whenever the input properties change
    this.updatePagination()
  }

  ngOnInit() {
    this.loading = true
    this.updatePagination()
    this.activatedRoute.url.subscribe(urlSegments => {
      this.currentRoute = urlSegments.join('/')
    })
    this.cartService.allCartItems.subscribe(item => this.cartItems = item)
  }

  updatePagination() {
    if (!Array.isArray(this.products)) return
    this.indexOfLastItem = this.currentPage * this.dataPerPage
    this.indexOfFirstItem = this.indexOfLastItem - this.dataPerPage
    this.totalPages = Math.ceil(this.products.length / this.dataPerPage)
    let currentProduct = this.products?.slice(this.indexOfFirstItem, this.indexOfLastItem)
    this.currentProducts = currentProduct.sort(() => 0.5 - Math.random())
    this.loading = false
  }

  renderPagination() {
    const pageNumbers = []
    for (let i = 1; i <= this.totalPages; i++) pageNumbers.push(i)
    return pageNumbers
  }

  handlePageNavigation(page: any) {
    this.currentPage = page
    this.updatePagination()
  }
  navigateBack() {
    this.currentPage = this.currentPage - 1
    this.updatePagination()
  }
  navigateForward() {
    this.currentPage = this.currentPage + 1
    this.updatePagination()
  }
  viewProductDetails(productId: string) {
    this.router.navigate(['/product/'], { queryParams: { id: productId } })
  }

  // CRUD functions
  handleCart(product: any) {
    this.cartItems.includes(product) ? this.cartService.removeItem(product) : this.cartService.addToCart(product)
  }

  save(productId: string) {
  }
}
