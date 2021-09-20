import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import{ FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
NotesForm!: FormGroup;
toggle:boolean=true;
expand:boolean=false;
  UserDetails =  JSON.parse(localStorage.getItem("UserDetails")!); 
  constructor(private notesService: NoteServiceService) { }
  ngOnInit(): void {
    this.NotesForm= new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      label: new FormControl('')
  })
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
}
