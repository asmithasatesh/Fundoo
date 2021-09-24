import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';
@Component({
  selector: 'app-getnote',
  templateUrl: './getnote.component.html',
  styleUrls: ['./getnote.component.scss'],encapsulation:ViewEncapsulation.None
})
export class GetnoteComponent implements OnInit {

  constructor(private notesService: NoteServiceService,
    public dialog: MatDialog) { }
  pin:any;
  userNotes:any;
  ngOnInit(): void {
    this.GetNote();
  }
  GetNote()
  {
    this.notesService.GetNote()
  .subscribe(
    (status: any) => 
    {
    console.log(status.data);
    this.userNotes=status.data;
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
  }
  OpenCard()
  {
    this.dialog.open(CardDialogComponent);
  }
}
