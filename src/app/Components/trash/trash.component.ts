import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';
import {MatSnackBar,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
  
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor(private notesService: NoteServiceService,
    private snack: MatSnackBar) { }
  pin:any;
  trashNotes:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  ngOnInit(): void {
    this.TrashNote();
  }
  TrashNote()
  {
    this.notesService.TrashNote()
  .subscribe(
    (status: any) => 
    {
    console.log(status.data);
    this.trashNotes=status.data;
    console.log(this.trashNotes);
    },(error: HttpErrorResponse) => {
    console.log("error"+error.error.message);
    console.log(this.trashNotes)
  });
  }
  DeleteTrash(note:any)
  {
    console.log(note.notesId);
    this.notesService.DeleteTrash(note.notesId)
    .subscribe(
      (status: any) => 
      {
      console.log(status.status);
      this.openSnackBar(status.message);

      },(error: HttpErrorResponse) => {
      console.log("error"+error.error.message);
      console.log(this.trashNotes)
    })
  }
  RestoreTrash(note:any)
  {    console.log(note.notesId);
    this.notesService.RestoreTrash(note.notesId)
    .subscribe(
      (status: any) => 
      {
      console.log(status.status);
      this.openSnackBar(status.message);

      },(error: HttpErrorResponse) => {
      console.log("error"+error.error.message);
      console.log(this.trashNotes)
    })

  }
  EmptyTrash()
  {
    this.notesService.EmptyTrash()
    .subscribe(
      (status: any) => 
      {
      console.log(status.status);
      this.openSnackBar(status.message);

      },(error: HttpErrorResponse) => {
      console.log("error"+error.error.message);
      console.log(this.trashNotes)
    })
  }
  openSnackBar(message: string) {
    this.snack.open(message,'',{duration:3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,});
  }
}
