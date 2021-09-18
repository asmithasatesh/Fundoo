import { Component, OnInit } from '@angular/core';
import{ FormControl, Validators, FormGroup} from '@angular/forms';
import { Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
LoginForm!: FormGroup;
hide = false
  constructor(private useService: UserServiceService,
    private router: Router,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.LoginForm= new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&].{4,}'),Validators.minLength(8)])
    })
  }

  Login()
  {
  if(!this.LoginForm.invalid) 
  {
    console.log("Register method");
    this.useService.Login(this.LoginForm.value)
  .subscribe(
    (status: any) => 
    {
      if(status.status == true)
      {
        this.StoreLocalStorage(status);
        this.openSnackBar(status.message);
        this.router.navigateByUrl('/login');
      }
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
    this.openSnackBar(error.error.message);
    if(error.error.message == "Email already exist!")
    {
      this.router.navigateByUrl('/login');
    }
  })
  }
  }
  StoreLocalStorage(data: any)
  {
    let lList=localStorage.getItem("UserDetails");
    lList=data;
    localStorage.setItem("UserDetails",JSON.stringify(lList));
  }


  openSnackBar(message: string) {
    this.snack.open(message,'',{duration:3000});
  }

  EmailValidation()
  {
    if(this.LoginForm.get('email')?.hasError('required'))
    {
      return "Enter Email";
    }
    if(this.LoginForm.get('email')?.hasError('email'))
    {
      return "Email is not in proper format";
    }
    return null;
  }
  PasswordValidation()
  {
    if(this.LoginForm.get('password')?.hasError('required'))
    {
      return "Enter Password";
    }
    else if(this.LoginForm.get('password')?.hasError('pattern'))
    {
      return "Please enter a valid Password ";
    }
    else if(this.LoginForm.get('password')?.errors?.minlength)
    {
      return "Should have minimum 8 characters";
    }
    return null;
  }
}
