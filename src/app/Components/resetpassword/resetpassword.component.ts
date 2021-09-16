import { Component, OnInit } from '@angular/core';
import{ FormControl, Validators, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  hide = false
  ResetForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.ResetForm = new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d$@!%*?&].{4,}'),Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required])
  })
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


