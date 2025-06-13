import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DeleteProductComponent {
  sections = ['Recommended', 'Electronics', 'Men', 'Women', 'Sports', 'Kids', 'TopSales', 'Shopping', 'Other'];
  section = '';
  productId = '';
  successMsg = '';
  errorMsg = '';

  constructor(private http: HttpClient) { }

  deleteProduct() {
    if (!this.section || !this.productId) {
      this.errorMsg = 'Please provide section and product ID';
      return;
    }

    this.http.delete(`http://localhost:3000/${this.section}/${this.productId}`).subscribe({
      next: () => {
        this.successMsg = 'Product deleted successfully!';
        this.errorMsg = '';
        this.productId = '';
        this.section = '';
      },
      error: () => {
        this.errorMsg = 'Failed to delete product. Check ID and section.';
        this.successMsg = '';
      }
    });
  }
}
