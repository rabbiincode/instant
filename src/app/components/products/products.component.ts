import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent{
  products: any[] = []
  @Input() searchValue!: string

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.products
    })
  }

  search(searchValue: string) {
    this.productService.getProducts().subscribe(data => {
      this.products = data.products.filter((products: any) => (
        products.title?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        products.description?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        products.brand?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        products.category?.toLowerCase().includes(searchValue?.toLowerCase())
      ))
    })
  }

  searchCategory(category: string) {
    this.productService.getProducts().subscribe(data => {
      (category == 'all' || category == 'others') ? this.products = data.products :
      this.products = data.products.filter((products: any) => (
        products.category?.toLowerCase() == category?.toLowerCase()
      ))
    })
  }
}
