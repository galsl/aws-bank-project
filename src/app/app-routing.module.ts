import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginSuccessfulComponent } from './login-successful/login-successful.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CurrencyComponent } from './currency/currency.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'login/success', component: LoginSuccessfulComponent},
  {path:'profile',component:ProfileComponent},
  {path:'customer/list/create',component:CustomerFormComponent},
  {path:'customer/list',component:CustomerListComponent},
  {path:'',component:LoginComponent},

  {path:'convertor',component:CurrencyComponent},
  {path:'customer/list/editCustomer/:customerId',component:EditCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
