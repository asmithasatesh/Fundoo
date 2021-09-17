import { Component, OnInit } from '@angular/core';
import{ FormControl, Validators, FormGroup} from '@angular/forms';
import { Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  ForgetPasswordForm!: FormGroup;
  constructor(private useService: UserServiceService,
    private router: Router,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.ForgetPasswordForm= new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required])
  })
};
ForgotPassword()
{
if(!this.ForgetPasswordForm.invalid) 
{
  console.log("Register method");
  this.useService.ForgotPassword(this.ForgetPasswordForm.value)
.subscribe(
  (status: any) => 
  {
    if(status.status == true)
    {
      this.StoreLocalStorage(status);
      this.openSnackBar(status.message);
    }
  },(error: HttpErrorResponse) => {
  console.log(error.error.message);
  this.openSnackBar(error.error.message);
  if(error.error.message == "Email not Sent")
  {
    this.router.navigateByUrl('/login');
  }
})
}
}
StoreLocalStorage(data: any)
{
  let lList=data.data;
  localStorage.setItem("ForgetPassword",JSON.stringify(lList)); 
  var token=(JSON.parse(localStorage.getItem("ForgetPassword")!));
  console.log(`reset-password/${token.email}/${token.userToken}`);
}

openSnackBar(message: string) {
  this.snack.open(message,'',{duration:3000});
}
EmailValidation()
{
  console.log(sessionStorage.getItem('SessionEmail'));
  if(this.ForgetPasswordForm.get('email')?.hasError('required'))
  {
    return "Enter Email";
  }
  if(this.ForgetPasswordForm.get('email')?.hasError('email'))
  {
    return "Email is not in proper format";
  }
  return null;
}
}