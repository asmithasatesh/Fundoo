import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  UserDetails = JSON.parse(localStorage.getItem('UserDetails')!);
  header:any=''
  constructor(private httpService : HttpServiceService) { }
  CreateNote(data: any) {
   
    let params = {
      Title: "hi",
      Notes: "data.Desc",
      UserId: this.UserDetails.userId,
    };
    this.getToken();
    console.log(this.header);
    return this.httpService.post(`${environment.baseUrl}/api/CreateNote`, params,true,this.header);
  }
  getToken(){
    this.header = {
      headers: {Authorization: "Bearer " + this.UserDetails.userToken}
    }

  }
  GetLabel()
  {
    let params= new HttpParams().set('userId',this.UserDetails.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetLabelUsingUserId`, params,true,this.header);
  }
}
