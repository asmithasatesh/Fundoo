import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpParamsOptions } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  constructor(private httpService : HttpServiceService) { }
  Register(data: any)
  {
    const params = {
      FirstName : data.firstName,
      LastName : data.lastName,
      Email : data.email,
      Password : data.password
    }
    return this.httpService.post(`${environment.baseUrl}/api/register`,params);
  }
  Login(data: any)
  {
    const params = {
      Email : data.email,
      Password : data.password
    }
    return this.httpService.post(`${environment.baseUrl}/api/login`,params);
  }
  ForgotPassword(data: any)
  {
    const params = new HttpParams().set('Email',data.email);
    return this.httpService.post(`${environment.baseUrl}/api/forgetPassword`,params);
  }
  ResetPassword(data: any)
  {
    const params = {
      Email: (JSON.parse(localStorage.getItem("ForgetPassword")!).email) ,
      Password : data.password
    }
    return this.httpService.put(`${environment.baseUrl}/api/resetPassword`,params);

  }
}
