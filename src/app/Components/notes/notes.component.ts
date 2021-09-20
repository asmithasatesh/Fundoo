import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import{ FormControl, Validators, FormGroup} from '@angular/forms';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
NotesForm!: FormGroup;
toggle:boolean=true;
expand:boolean=false;
color:string="";
  UserDetails =  JSON.parse(localStorage.getItem("UserDetails")!); 
  constructor(private notesService: NoteServiceService,
    public dialog:MatDialog) { }
  ngOnInit(): void {
    this.NotesForm= new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      label: new FormControl('')
  })
  }

openDialog()
{
  let dialogRef =this.dialog.open(CollaboratorDialogComponent);
  dialogRef.afterClosed().subscribe(result =>
    {
      console.log( `Dialog res: ${result}`);
    });
}

Resize(){
  var textArea = document.getElementById("textarea")!      
  textArea.style.height = 'auto';
  textArea.style.height = Math.min(500,textArea.scrollHeight) + 'px';
}
CheckContent()
{
  console.log(this.NotesForm.value.title);
if(this.NotesForm.value.title != "" || this.NotesForm.value.description != "")
{
  this.expand=true;
}
else{
  this.expand=false;
}
}
ReminderOption()
{
  
}
CreateNote()
{
  console.log(this.NotesForm.value.title);
  this.notesService.CreateNote('')
.subscribe(
  (status: any) => 
  {

  },(error: HttpErrorResponse) => {
  console.log(error.error.message);
})
}
cardcolor(color: any){
  var matcard = document.getElementById("matcard")!   
  var title = document.getElementById("title")!   
  var textarea=document.getElementById("textarea")!
  matcard.style.backgroundColor = color;
  title.style.backgroundColor=color;
  textarea.style.backgroundColor=color;
this.color=color;

}
}
