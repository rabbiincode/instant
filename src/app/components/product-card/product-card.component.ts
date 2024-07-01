import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})

export class ProductCardComponent{
  constructor(private activatedRoute: ActivatedRoute, private router: Router){}
  admin = false
  totalPages = 1
  currentPage = 1
  dataPerPage = 8
  isLogin = false
  loading = false
  username!: string
  currentRoute!: string
  indexOfLastItem!: any
  indexOfFirstItem!: any
  @Input() searchValue!: string
  currentProducts!: any[]
  @Input() products!: any[]

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
  }

  updatePagination() {
    if (!Array.isArray(this.products)) return
    this.indexOfLastItem = this.currentPage * this.dataPerPage
    this.indexOfFirstItem = this.indexOfLastItem - this.dataPerPage
    this.totalPages = Math.ceil(this.products.length / this.dataPerPage)
    this.currentProducts = this.products?.slice(this.indexOfFirstItem, this.indexOfLastItem)
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
  productDetails(productId: string) {
    this.router.navigate(['/product/'], { queryParams: { id: productId } })
  }

  // CRUD functions
  addToCart(postId: string) {
  }
  save(postId: string) {
  }
}
