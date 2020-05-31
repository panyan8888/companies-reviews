import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {MainComponent} from './components/main/main.component';
import {ProfileComponent} from './components/prifile/profile.component';
import {AuthGuard} from './services/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'main',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MainComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
