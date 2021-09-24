import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelServiceService {

  UserDetails = JSON.parse(localStorage.getItem('UserDetails')!);
  header:any=''
  constructor(private httpService : HttpServiceService) { }

  getToken(){
    this.header = {
      headers: {Authorization: "Bearer " + this.UserDetails.userToken}
    }
  }
  GetLabelNote(noteName:any)
  {
    console.log(noteName);
    console.log(this.UserDetails.userId);
      let params= new HttpParams().set('userId',this.UserDetails.userId).set('labelName',noteName);
      this.getToken();
      return this.httpService.post(`${environment.baseUrl}/api/DisplayLabelNote`, params,true,this.header);
  }
}
