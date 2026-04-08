import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

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
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
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
    path: 'weather',
    loadChildren: () => import('./components/weather/weather.module').then(m => m.WeatherModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'equipment-rul',
    loadChildren: () => import('./components/equipment-rul/equipment-rul.module').then(m => m.EquipmentRulModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'equipment-cost',
    loadChildren: () => import('./components/equipment-cost/equipment-cost.module').then(m => m.EquipmentCostModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./components/maintenance/maintenance.module').then(m => m.MaintenanceModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'market-data',
    loadChildren: () => import('./components/market-data/market-data.module').then(m => m.MarketDataModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ml',
    loadChildren: () => import('./components/ml/ml.module').then(m => m.MlModule),
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
