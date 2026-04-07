import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sites',
    loadChildren: () => import('./components/sites/sites.module').then(m => m.SitesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'equipements',
    loadChildren: () => import('./components/equipements/equipements.module').then(m => m.EquipementsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'incidents',
    loadChildren: () => import('./components/incidents/incidents.module').then(m => m.IncidentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'finance',
    loadChildren: () => import('./components/finance/finance.module').then(m => m.FinanceModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard-kpi',
    loadChildren: () => import('./components/dashboard-kpi/dashboard-kpi.module').then(m => m.DashboardKpiModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'roles',
    loadChildren: () => import('./components/roles/roles.module').then(m => m.RolesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
