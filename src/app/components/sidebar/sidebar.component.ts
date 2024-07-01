import { products } from './sidebarData';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent{
  active = 0
  productsData = products
  @Output() setTitle = new EventEmitter<{title: string, category: string}>()
  setActive(id: number, title: string, category: string) {
    this.active = id
    this.setTitle.emit({title, category})
  }
}