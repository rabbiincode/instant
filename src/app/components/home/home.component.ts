import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductsComponent } from '../products/products.component';
import { Component, HostListener, ViewChild } from '@angular/core';
import { ScrollToTopComponent } from '../../utilities/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, ProductsComponent, ScrollToTopComponent, SidebarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent{
  full = true
  title = 'All'
  sidebar = false
  windowWidth!: number
  searchValue!: string
  @ViewChild(ProductsComponent) product!: ProductsComponent

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateWindowWidth()
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined'){
      this.windowWidth = window.innerWidth
      this.updateWindowWidth()
    }
  }

  updateWindowWidth(): void {
    if (typeof window !== 'undefined'){
      this.windowWidth = window.innerWidth
    }
  }

  toggleSidebar() {
    this.windowWidth > 768 ? this.full = !this.full : this.sidebar = !this.sidebar
  }
  search(value: string) {
    this.title = value
    this.searchValue = value
    this.product.search(value)
  }
  setTitle(values: any) {
    this.title = values?.title
    this.product.searchCategory(values.category)
  }
}