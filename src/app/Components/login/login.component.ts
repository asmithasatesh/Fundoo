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
}
