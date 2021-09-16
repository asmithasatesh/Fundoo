import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';
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
}
