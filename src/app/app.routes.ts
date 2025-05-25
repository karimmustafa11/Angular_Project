import { Routes } from '@angular/router';
import { FullLayoutComponent } from './full-layout-component/full-layout-component.component';
import { EmptyLayoutComponentComponent } from './empty-layout-component/empty-layout-component.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            { path: '', component: CartComponent }, // Default route
            { path: 'about', component: AboutComponent },
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
];

