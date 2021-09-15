import { Component, OnInit } from '@angular/core';
import{ FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  ForgetPasswordForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.ForgetPasswordForm= new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required])
  })
};
EmailValidation()
{
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
