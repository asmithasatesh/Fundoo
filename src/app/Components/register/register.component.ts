import { Component, OnInit, HostListener } from '@angular/core';
import{ FormControl, Validators, FormGroup} from '@angular/forms';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 RegisterForm!: FormGroup;
 hide = false
 errorMessafe=""
 capsOn: any
 
  constructor(private useService: UserServiceService,
     private router: Router,
     private snack: MatSnackBar) {  }

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      firstName: new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z (␣)]{1,}$'),Validators.minLength(3)]),
      lastName: new FormControl('' ,[Validators.required, Validators.pattern('^[A-Z]{1}[a-z (␣)]{1,}$'), Validators.minLength(3)]),
      email: new FormControl('',[Validators.email,Validators.required]),
      password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d$@!%*?&].{4,}'),Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required])
    });

  }
  Register()
  {
  if(!this.RegisterForm.invalid) 
  {
    console.log("Register method");
    this.useService.Register(this.RegisterForm.value)
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
    if(error.error.message == "Email already exist!")
    {
      this.router.navigateByUrl('/login');
    }
  })
  }
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message,action,{duration:3000});
  }


  FirstNameValidation()
  {
    if(this.RegisterForm.get('firstName')?.hasError('required'))
    {
      return "Enter First Name";
    }
    else if(this.RegisterForm.get('firstName')?.hasError('pattern'))
    {
      return "Firstname should start with Capital letter";
    }
    else if(this.RegisterForm.get('firstName')?.errors?.minlength)
    {
      return "Should have minimum 3 letters";
    }
    return null;
  }
  LastNameValidation()
  {
    if(this.RegisterForm.get('lastName')?.hasError('required'))
    {
      return "Enter Last Name";
    }
    else if(this.RegisterForm.get('lastName')?.hasError('pattern'))
    {
      return "Lastname should start with Capital letter";
    }
    else if(this.RegisterForm.get('lastName')?.errors?.minlength)
    {
      return "Should have minimum 3 letters";
    }
    return null;
  }
  EmailValidation()
  {
    if(this.RegisterForm.get('email')?.hasError('required'))
    {
      return "Enter Email";
    }
    if(this.RegisterForm.get('email')?.hasError('email'))
    {
      return "Email is not in proper format";
    }
    return null;
  }
  PasswordValidation()
  {
    if(this.RegisterForm.get('password')?.hasError('required'))
    {
      return "Enter Password";
    }
    else if(this.RegisterForm.get('password')?.hasError('pattern'))
    {
      return "Please enter a valid Password ";
    }
    else if(this.RegisterForm.get('password')?.errors?.minlength)
    {
      return "Should have minimum 8 characters";
    }
    return null;
  }

public isCaps: boolean = false;

@HostListener('window:keydown', ['$event'])
public onKeydown(event: KeyboardEvent): void {
  this.isCaps = typeof event.getModifierState === 'function' && event.getModifierState('CapsLock');
}
}
