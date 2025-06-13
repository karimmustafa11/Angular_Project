import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class EditProductComponent {
  sections = ['Recommended', 'Electronics', 'Men', 'Women', 'Sports', 'Kids', 'TopSales', 'Shopping', 'Other'];
  productId = '';
  section = '';
  productData: any = null;
  successMsg = '';
  errorMsg = '';

  constructor(private http: HttpClient) { }

  fetchProduct() {
    if (!this.productId || !this.section) return;

    this.http.get<any>(`http://localhost:3000/${this.section}/${this.productId}`).subscribe({
      next: (product) => {
        this.productData = product;
        this.errorMsg = '';
      },
      error: () => {
        this.productData = null;
        this.errorMsg = 'Product not found.';
      }
    });
  }

  updateProduct() {
    if (!this.productData || !this.section) return;

    this.http.put(`http://localhost:3000/${this.section}/${this.productId}`, this.productData).subscribe(() => {
      this.successMsg = 'Product updated successfully!';
    });
  }
}
