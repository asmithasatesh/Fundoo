import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(private notesService: NoteServiceService,
    public dialog: MatDialog,
    private data: DataserviceService) { }
  pin:any;
  archiveNotes:any;
  ngOnInit(): void {
    this. GetArchive();
    this.data.currentMessage.subscribe((change)=>{
        if(change == true){
          this.GetArchive();
          this.data.changeMessage(false);
        }
    })
  }
  GetArchive()
  {
    this.notesService.GetArchive()
  .subscribe(
    (status: any) => 
    {
    console.log(status.data);
    this.archiveNotes=status.data;
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
      this.data.changeMessage(true);
    console.log(status.data);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
}
}
