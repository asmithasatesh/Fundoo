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
  constructor() { }

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      firstName: new FormControl( '' ,[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{1,}$'),Validators.minLength(3)]),
      lastName: new FormControl( '' ,[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{1,}$'), Validators.minLength(3)]),
    })
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
}
