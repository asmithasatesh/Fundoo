import { Component, OnInit } from '@angular/core';
import{ FormControl, Validators, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 RegisterForm!: FormGroup;
 hide = false
 errorMessafe=""
  constructor() { }

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      firstName: new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{1,}$'),Validators.minLength(3)]),
      lastName: new FormControl('' ,[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{1,}$'), Validators.minLength(3)]),
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^.,:;!@#$%^&*_+=|(){}[?-]*[.,:;!@#$%^&*_+=|(){}[?-][^.,:;!@#$%^&*_+=|(){}[?-]*$).{4,}$'),Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required])
    })
  }
  ConfirmPasswordValidate()
  {
    if(this.RegisterForm.get('confirmPassword')?.hasError('required'))
    {
      return "Enter Confirm Password";
    }
    else{
      const control = this.RegisterForm.get('password')?.value;
      const matchingControl = this.RegisterForm.get('confirmPassword')?.value;
      if (control == matchingControl) 
      {
        console.log(matchingControl);
        this.errorMessafe = "Those passwords didn’t match. Try again.";
      }
      return null;
    }     
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
}
