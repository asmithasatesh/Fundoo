  
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatList } from '@angular/material/list';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit {
  searchField:any;
  collabData:any;

  constructor(    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notesService: NoteServiceService,
    private snackBar: MatSnackBar) { }
  UserDetails =  JSON.parse(localStorage.getItem("UserDetails")!); 
  emails: string[]=[];
  ngOnInit(): void {
    console.log("retrievddddddddd");
    console.log(this.data.collab);
    this.GetCollab();
    this.data.currentMessage.subscribe((change:any)=>{
      if(change == true){
        this.GetCollab();
        this.data.changeMessage(false);
      }
  })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  clearSearchField() {
console.log(this.emails);
if(this.data.element == 1)
{
  this.AddCollab(this.searchField);
}
this.emails.push(this.searchField);
console.log(this.emails);
    this.searchField = '';
  }
  AddCollab(element:any)
{
  console.log("add collab");
  this.notesService.AddCollab(element,this.data.noteId)
  .subscribe(
    (status: any) => 
    {
      this.data.changeMessage(true);
      this.ngOnInit();
    console.log(status.notesId);
    this.openSnackBar(status.message);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })

}
  RemoveCollab(email:any)
  {
    if(this.data.element == 1)
    {
      this.RemoveCollabs(email);
    }
    this.emails.splice(this.emails.indexOf(email),1);
  }
  save(){

    this.dialogRef.close(this.emails);
 }
 close(){
   this.dialogRef.close(this.data.collab);
 }
 GetCollab()
{
  console.log(this.data.noteId);
  this.notesService.GetCollab(this.data.noteId)
  .subscribe(
    (status: any) => 
    {
      if(status.data != null)
      {
        status.data .forEach((element:any) => {
          this.emails.push(element.collaboratorEmail);
        });
        this.collabData=status.data;
      }

    console.log(status.data);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  });
}
RemoveCollabs(email:any)
{

  this.collabData.forEach((element:any) => {

    if(element.collaboratorEmail == email)
    {
      this.Remove(element.collaboratorId);
    }
  });
}
Remove(collabId:number)
{
  this.notesService.RemoveCollab(collabId)
  .subscribe(
    (status: any) => 
    {
      this.ngOnInit();
      this.openSnackBar(status.message);
    console.log(status.data);
    this.data.changeMessage(true);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  });

}
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
  }
}
