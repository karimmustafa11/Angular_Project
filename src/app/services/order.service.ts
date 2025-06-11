// src/app/services/order.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Order {
  id?: number | string;
  customer: {
    name: string;
    phone?: string;
    address: string;
    paymentMethod: string;
  };
  items: any[];
  total: number;
  date: string; // ISO string
  // يمكن إضافة status أو حقول أخرى لاحقًا
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private currentOrderSubject = new BehaviorSubject<Order | null>(null);
  currentOrder$ = this.currentOrderSubject.asObservable();

  constructor() { }

  setCurrentOrder(order: Order) {
    this.currentOrderSubject.next(order);
  }

  clearCurrentOrder() {
    this.currentOrderSubject.next(null);
  }

  getCurrentOrderValue(): Order | null {
    return this.currentOrderSubject.getValue();
  }
}
