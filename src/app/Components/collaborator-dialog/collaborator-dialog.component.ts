  
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatList } from '@angular/material/list';

@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit {
  searchField:any;


  constructor(    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  UserDetails =  JSON.parse(localStorage.getItem("UserDetails")!); 
  emails: string[]=[];
  ngOnInit(): void {
    console.log("retrievddddddddd");
    console.log(this.data.collab);
    if( this.data.collab != null)
    {
      this.emails=this.data.collab;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  clearSearchField() {
console.log(this.emails);
this.emails.push(this.searchField);
console.log(this.emails);
    this.searchField = '';
  }
  RemoveCollab(email:any)
  {
    this.emails.splice(this.emails.indexOf(email),1);
  }
  save(){
    this.dialogRef.close(this.data.collab);
 }
 close(){
   this.dialogRef.close(this.data.collab);
 }
}
