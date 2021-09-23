import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor(private notesService: NoteServiceService) { }
  pin:any;
  trashNotes:any;
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

      },(error: HttpErrorResponse) => {
      console.log("error"+error.error.message);
      console.log(this.trashNotes)
    })

  }
}
