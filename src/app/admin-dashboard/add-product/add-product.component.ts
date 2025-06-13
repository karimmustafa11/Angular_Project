import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AddProductComponent {
  sections = ['Recommended', 'Electronics', 'Men', 'Women', 'Sports', 'Kids', 'TopSales', 'Shopping', 'Other'];

  newProduct: any = {
    name: '',
    image: '',
    price: 0,
    rating: 0,
    reviews: 0,
    section: ''
  };

  successMsg = '';

  constructor(private http: HttpClient) {}

  addProduct() {
    if (!this.newProduct.section) return;

    const productData = { ...this.newProduct };

    this.http.post(`http://localhost:3000/${this.newProduct.section}`, productData).subscribe(() => {
      this.successMsg = 'Product added successfully!';
      this.resetForm();
    });
  }

  resetForm() {
    this.newProduct = {
      name: '',
      image: '',
      price: 0,
      rating: 0,
      reviews: 0,
      section: ''
    };
  }
}
