import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';
@Component({
  selector: 'app-getnote',
  templateUrl: './getnote.component.html',
  styleUrls: ['./getnote.component.scss'],encapsulation:ViewEncapsulation.None
})
export class GetnoteComponent implements OnInit {

  constructor(private notesService: NoteServiceService,
    public dialog: MatDialog,
    private data:DataserviceService) { }
  pin:any;
  userNotes:any;
  ngOnInit(): void {
    this.GetNote();
    this.data.currentMessage.subscribe((change)=>{
      if(change == true){
        this.GetNote();
        this.data.changeMessage(false);
      }
  })
  }
  PinnedNotes:boolean=false;
  GetNote()
  {
    this.notesService.GetNote()
  .subscribe(
    (status: any) => 
    {
    console.log(status.data);
    this.userNotes=status.data;
    for (let note of this.userNotes) {
      console.log("asdf");
      if(note.pin==true)
      {
        console.log("pin");
        
        this.PinnedNotes=true;
        break;
      }
    }
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  });
  }


DeleteReminder(notes:any)
{
  console.log(notes.notesId);
  this.notesService.DeleteReminder(notes.notesId)
  .subscribe(
    (status: any) => 
    {
    console.log(status.data);
    this.data.changeMessage(true);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
}
NoteDialog(noteDetails:any): void {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  var dialogRef = this.dialog.open(CardDialogComponent, {data: { note:noteDetails  }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}