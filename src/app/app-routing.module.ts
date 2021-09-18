import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
var token=(JSON.parse(localStorage.getItem("ForgetPassword")!));
const routes: Routes = [
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'forget-password', component:ForgetPasswordComponent},
  {path:`reset-password/${token.userToken}`,component:ResetpasswordComponent},
  {path:'dashboard' , component:DashboardComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }