import { Routes } from '@angular/router';
import { FullLayoutComponent } from './full-layout-component/full-layout-component.component';
import { EmptyLayoutComponentComponent } from './empty-layout-component/empty-layout-component.component';
import { CheckoutLayoutComponent } from './checkout-layout/checkout-layout.component';

import { HomeComponent } from './Componants/Home/home/home.component';
import { AboutComponent } from './Componants/About/about.component';
import { OrderComponent } from './Componants/order/order.component';

import { LoginComponent } from './Componants/Auth/login/login.component';
import { SignupComponent } from './Componants/Auth/signup/signup.component';
import { CheckoutComponent } from './Componants/checkout/checkout.component';
import { ProfileComponent } from './Componants/profile/profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './admin-dashboard/add-product/add-product.component';
import { EditProductComponent } from './admin-dashboard/edit-product/edit-product.component';
import { DeleteProductComponent } from './admin-dashboard/delete-product/delete-product.component';
import { OrdersComponent } from './admin-dashboard/orders/orders.component';

export const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'about', component: AboutComponent },
            { path: 'profile', component: ProfileComponent },
        ]
    },

    {
        path: '',
        component: EmptyLayoutComponentComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
        ]
    },

    {
        path: '',
        component: CheckoutLayoutComponent,
        children: [
            { path: 'checkout', component: CheckoutComponent },
            { path: 'order/:id', component: OrderComponent },
        ]
    },

    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        children: [
            { path: 'add-product', component: AddProductComponent },
            { path: 'edit-product/:id', component: EditProductComponent },
            { path: 'delete-product/:id', component: DeleteProductComponent },
            { path: 'orders', component: OrdersComponent },
        ]
    },

    { path: '**', redirectTo: '' }
];
