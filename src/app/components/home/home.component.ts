import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
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
  sidebar = false
  windowWidth!: number
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
}