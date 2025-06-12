import { Component } from '@angular/core';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { OrdersComponent } from './orders/orders.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [AddProductComponent, EditProductComponent, DeleteProductComponent, OrdersComponent, CommonModule]
})
export class AdminDashboardComponent {
  activeTab: string = 'add';
}
