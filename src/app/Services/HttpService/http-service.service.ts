import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private http: HttpClient
  ) { }

  post(url: string, data :any=null, isHeaderRequired: any=false, headers:any= null)
  {
 console.log(url,data+"value");
 return this.http.post(url,data,isHeaderRequired && headers);
  }
  put(url: string, data :any=null, isHeaderRequired: any=false, headers= null)
  {
 console.log(url,data+"value");
 return this.http.put(url,data,isHeaderRequired && headers);
  }
  delete(url: string,isHeaderRequired: any=false, headers= null)
  { 

    return this.http.delete(url,isHeaderRequired && headers);
  }
 
}
