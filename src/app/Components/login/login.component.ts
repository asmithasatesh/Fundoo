import { Component, OnInit } from '@angular/core';
import{ FormControl, Validators, FormGroup} from '@angular/forms';

  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
LoginForm!: FormGroup;
hide = false
  constructor() { }

  ngOnInit(): void {
    this.LoginForm= new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^.,:;!@#$%^&*_+=|(){}[?-]*[.,:;!@#$%^&*_+=|(){}[?-][^.,:;!@#$%^&*_+=|(){}[?-]*$).{4,}$'),Validators.minLength(8)])
      })
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
