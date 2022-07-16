import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './shared/authguard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin-courses', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin-products', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin-users', component: AdminDashboardComponent, canActivate: [AuthGuard] },
]


@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
