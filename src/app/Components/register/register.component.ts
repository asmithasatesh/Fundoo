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
      firstName: new FormControl( '' ,[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$'), Validators.minLength(3)]),
      lastName: new FormControl( '' ,[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$'), Validators.minLength(3)])
    })
  }

}
