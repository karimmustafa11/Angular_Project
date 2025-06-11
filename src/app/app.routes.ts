import { Routes } from '@angular/router';
import { FullLayoutComponent } from './full-layout-component/full-layout-component.component';
import { EmptyLayoutComponentComponent } from './empty-layout-component/empty-layout-component.component';
import { LoginComponent } from './Componants/Auth/login/login.component';
import { SignupComponent } from './Componants/Auth/signup/signup.component';
import { AboutComponent } from './Componants/About/about.component';
import { HomeComponent } from './Componants/Home/home/home.component';
import { CheckoutComponent } from './Componants/checkout/checkout.component';

export const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            { path: '', component: HomeComponent }, // Default route
            { path: 'about', component: AboutComponent },
            {
                path: 'checkout',
                component: CheckoutComponent
            }

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

