import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DataService } from '../../../services/data-service.service';

@Component({
  selector: 'app-recommended',
  imports: [CommonModule],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css'
})
export class RecommendedComponent implements OnInit {
  recommendedItems: any[] = [];
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataService.getRecommendedProducts().subscribe((data) => {
      this.recommendedItems = data;
    });

  }

  toggleWishlist(product: any) {
    product.isWishlisted = !product.isWishlisted;
  }
}
