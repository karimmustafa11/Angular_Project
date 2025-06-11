
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService, User } from '../../services/user.service';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm: FormGroup;
  cartItems: any[] = [];
  cartTotal: number = 0;

  private cartSub!: Subscription;
  private userSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private http: HttpClient
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      address: ['', Validators.required],
      paymentMethod: ['cash', Validators.required],
    });
  }

  ngOnInit(): void {
    // تحميل السلة
    this.cartService.loadCartFromStorage();
    this.cartSub = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.computeTotal();
    });

    // تحميل بيانات المستخدم وملء الحقول
    this.userService.refreshUserData();
    this.userSub = this.userService.userData$.subscribe(user => {
      if (user) {
        this.prefillUserData(user);
      }
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  computeTotal() {
    this.cartTotal = this.cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
  }

  prefillUserData(user: User): void {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
    this.checkoutForm.patchValue({
      name: fullName,
      address: user.address || '',
      phone: user.phone || ''
    });
  }

  placeOrder(): void {
    if (this.checkoutForm.valid) {
      const orderPayload: Order = {
        customer: this.checkoutForm.value,
        items: this.cartItems,
        total: this.cartTotal,
        date: new Date().toISOString()
      };

      this.http.post<Order>('http://localhost:3000/orders', orderPayload).subscribe({
        next: (createdOrder) => {
          // حفظ الطلب في OrderService
          this.orderService.setCurrentOrder(createdOrder);
          // تفريغ السلة
          this.cartService.clearCart();
          // الانتقال لصفحة تأكيد الطلب
          this.router.navigate(['/order', createdOrder.id]);
        },
        error: err => {
          console.error('Order error', err);
          alert('Failed to place order. Please try again.');
        }
      });
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
