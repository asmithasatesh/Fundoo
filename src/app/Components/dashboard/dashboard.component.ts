import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private route : Router) { }
  isGrid=false
  opened: boolean = false;
  toggle: boolean = false;

  UserDetails =  JSON.parse(localStorage.getItem("UserDetails")!); 
  ngOnInit(): void {
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
    if(this.toggle!=true || !(this.toggle==true && this.opened == true))
    {
      this.opened=!this.opened;
    }
  }
}
