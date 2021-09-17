import { Component,Input, OnInit } from '@angular/core';
import{ FormControl, Validators, FormGroup} from '@angular/forms';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  hide = false
  ResetForm!: FormGroup;
  Email=(JSON.parse(localStorage.getItem("ForgetPassword")!).email); 

  constructor(private useService: UserServiceService,
    private router: Router,
    private snack: MatSnackBar,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.ResetForm = new FormGroup({
      password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d$@!%*?&].{4,}'),Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required])
  });
}




ResetPassword()
{
if(!this.ResetForm.invalid) 
{
  console.log("Register method");
  this.useService.ResetPassword(this.ResetForm.value)
.subscribe(
  (status: any) => 
  {
    if(status.status == true)
    {
      this.openSnackBar(status.message,'');
      this.router.navigateByUrl('/login');
    }
  },(error: HttpErrorResponse) => {
  console.log(error.error.message);
  this.openSnackBar(error.error.message,'');
  if(error.error.message == "Password Reset Failed!")
  {
    this.router.navigateByUrl('/login');
  }
})
}
}

openSnackBar(message: string, action: string) {
  this.snack.open(message,action,{duration:3000});
}
EmailValidation()
{
  if(this.ResetForm.get('email')?.hasError('required'))
  {
    return "Enter Email";
  }
  if(this.ResetForm.get('email')?.hasError('email'))
  {
    return "Email is not in proper format";
  }
  return null;
}
PasswordValidation()
{
  if(this.ResetForm.get('password')?.hasError('required'))
  {
    return "Enter Password";
  }
  else if(this.ResetForm.get('password')?.hasError('pattern'))
  {
    return "Please enter a valid Password ";
  }
  else if(this.ResetForm.get('password')?.errors?.minlength)
  {
    return "Should have minimum 8 characters";
  }
  return null;
}
}


