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
archive:boolean=false;
public date = new Date();
reminder:any;

  UserDetails =  JSON.parse(localStorage.getItem("UserDetails")!); 
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [];
  time:string='8:PM';
  selected:string='';
  file:any;

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];
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
      description: new FormControl('')
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
OnselectFile(files: any)
{
  this.file= files.target.files.item(0);
  console.log(this.file);
}
SaveChange()
{

 this.fruits.pop();
 let day=''
 let currDate= new Date();
 console.log(this.date);
 console.log(currDate);
 if(this.date.getDate() == currDate.getDate())
 {
   day="Today";
 }
 else if(this.date.getDate() == new Date(currDate.setDate(currDate.getDate() + 1)).getDate())
 {
   day= "Tomorrow"
 }
 else{
   day = this.monthNames[this.date.getMonth()]+" "+ this.date.getDate().toString();
 }
 this.reminder=day+", "+this.selected;
 this.fruits.push({name: this.reminder});
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
  let obj={
    title: this.NotesForm.value.title,
    desc: this.NotesForm.value.description,
    color: this.color,
    archive:this.archive,
    pin: this.pin,
    reminder: this.reminder

  }
  console.log(this.NotesForm.value.title);
  this.notesService.CreateNote(obj)
.subscribe(
  (status: any) => 
  {
  console.log(status.message);
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

SetDate(date:string)
{
  if(this.fruits.length == 1)
  {
    this.fruits.pop();
    this.pickDate=!this.pickDate;
  }
    console.log(date);
    if(date == 'set')
    {
      let nextDate= this.getMonday(new Date());
      date=  this.monthNames[nextDate.getMonth()] +" "+nextDate.getDate().toString() + ", 8:00 AM"
      console.log(date);
      this.date=nextDate;
      this.time="8:AM";
    }
    else if(date == 'Tomorrow, 8:00AM')
    {
      this.date=new Date(this.date.setDate(this.date.getDate() + 1));
      console.log(this.date);
      this.time="8:AM";
    }
    this.selected=this.time;
    this.reminder=date;
    this.fruits.push({name: date});
    this.pickDate=!this.pickDate;
}
getMonday(d:any) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() + day + (day == 1 ? 6:(5-day)); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

}