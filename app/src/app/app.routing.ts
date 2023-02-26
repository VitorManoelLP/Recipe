import { LoginComponent } from './authentication/login/login.component';
import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: 'login', loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./authentication/register/register.module').then(m => m.RegisterModule) },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent }
]
