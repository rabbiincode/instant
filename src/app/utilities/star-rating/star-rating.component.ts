import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})

export class StarRatingComponent{
  @Input() rating!: number
  get stars() {
    return Array(Math.floor(this.rating)).fill(0)
  }
}
