import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/orders').subscribe(data => {
      this.orders = data;
      this.orders.reverse();
    });
  }
}
