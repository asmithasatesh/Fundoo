import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

 
  constructor(private notesService: NoteServiceService,
    public dialog: MatDialog) { }
  pin:any;
  reminderNotes:any;
  ngOnInit(): void {
    this.GetReminder();
  }
  GetReminder()
  {
    this.notesService.GetReminder()
  .subscribe(
    (status: any) => 
    {
    console.log(status.data);
    this.reminderNotes=status.data;
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
  }
  OpenCard()
  {
    this.dialog.open(CardDialogComponent);
  }
  DeleteReminder(notes:any)
{
  this.notesService.DeleteReminder(notes)
  .subscribe(
    (status: any) => 
    {
    console.log(status.data);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
}
}
