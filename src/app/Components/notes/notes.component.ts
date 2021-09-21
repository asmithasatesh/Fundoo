import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import{ FormControl, Validators, FormGroup} from '@angular/forms';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
export interface Fruit {
  name: string;
}
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
pin:boolean=false;
pickDate:boolean=false;

  UserDetails =  JSON.parse(localStorage.getItem("UserDetails")!); 
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
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
monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];
SetDate(date:string)
{
  console.log(date);
  if(date == 'set')
  {
    let nextDate= this.getMonday(new Date());
    date=  this.monthNames[nextDate.getMonth()] +" "+nextDate.getDate().toString() + ", 8:00 AM"
    console.log(date);
  }
  this.fruits.push({name: date});
  this.pickDate=!this.pickDate;
}
getMonday(d:any) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() + day + (day == 0 ? 6:4); // adjust when day is sunday
  return new Date(d.setDate(diff));
}
}
