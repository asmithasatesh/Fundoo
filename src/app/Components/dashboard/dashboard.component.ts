import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchField:any;
  clearSearchField() {
    this.searchField = '';
  }
  constructor(private route : Router,
    private notesService: NoteServiceService) { }
  isGrid=false
  opened: boolean = false;
  toggle: boolean = false;
 userLabel=[];
 getnote:string= 'notes';
 labelDetails:any;
  UserDetails =  JSON.parse(localStorage.getItem("UserDetails")!); 
  ngOnInit(): void {
    this.GetLabel();
  }
  GetLabel()
  {
    this.notesService.GetLabel()
  .subscribe(
    (status: any) => 
    {

  
  this.userLabel=status.data;
  console.log(this.userLabel);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
  }
  Logout(){
      if(this.UserDetails != null){
          localStorage.removeItem("UserDetails");
          this.route.navigateByUrl('/login');
      }
  }
  PageReload(){
    if(this.UserDetails == null){
      this.route.navigateByUrl('/login');
    }
  }
  Toggle()
  {
      this.toggle=!this.toggle;
    }
  
}
