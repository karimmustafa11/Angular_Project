import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService, User } from '../../services/user.service';

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
  userData: User | null = null;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private userService: UserService,
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
    // اشترك في cartItems$ حتى يتحدّث العرض تلقائياً
    this.cartService.loadCartFromStorage();
    this.cartSub = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.computeTotal();
    });

    // اشترك في بيانات المستخدم
    this.userService.refreshUserData();
    this.userSub = this.userService.userData$.subscribe(user => {
      this.userData = user;
      this.prefillUserData(user);
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

  prefillUserData(user: User | null): void {
    if (user) {
      const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
      this.checkoutForm.patchValue({
        name: fullName,
        address: user.address || '',
        phone: user.phone || ''
      });
    }
  }

  placeOrder(): void {
    if (this.checkoutForm.valid) {
      const orderData = {
        customer: this.checkoutForm.value,
        items: this.cartItems,
        total: this.cartTotal,
        date: new Date()
      };

      // مثال: إرسال الطلب للـ JSON Server
      this.http.post('http://localhost:3000/orders', orderData).subscribe({
        next: () => {
          alert('Order placed successfully!');
          this.cartService.clearCart();
          this.router.navigate(['/home']);
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
