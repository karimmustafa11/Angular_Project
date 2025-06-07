import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-electronics',
  imports: [CommonModule],
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent implements OnInit {
  electronicsItems: any[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getElectronicsProducts().subscribe((data) => {
      this.electronicsItems = data;
    });
  }

  // Method to toggle wishlist status
  toggleWishlist(product: any) {
    product.isWishlisted = !product.isWishlisted;
  }
}
