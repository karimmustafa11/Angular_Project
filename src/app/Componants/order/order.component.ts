
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService, Order } from '../../services/order.service';
import { Subscription, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderComponent implements OnInit, OnDestroy {
  orderId: string | null = null;
  order: Order | null = null;
  loading = true;
  errorMsg: string | null = null;

  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.pipe(
      switchMap((params: Params) => {
        this.orderId = params['id'];
        this.loading = true;
        this.errorMsg = null;

        const current = this.orderService.getCurrentOrderValue();
        if (current && current.id == this.orderId) {
          this.order = current;
          this.loading = false;
          return of(null); 
        } else {
          return this.http.get<Order>(`http://localhost:3000/orders/${this.orderId}`).pipe(
            catchError(err => {
              console.error('Failed to load order', err);
              this.errorMsg = 'Unable to load order details.';
              this.loading = false;
              return of(null);
            })
          );
        }
      })
    ).subscribe((fetched: Order | null) => {
      if (fetched) {
        this.order = fetched;
        this.orderService.setCurrentOrder(fetched);
      }
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
