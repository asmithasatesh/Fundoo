import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';
import { LabelServiceService } from 'src/app/Services/LabelService/label-service.service';

@Component({
  selector: 'app-note-labels',
  templateUrl: './note-labels.component.html',
  styleUrls: ['./note-labels.component.scss']
})
export class NoteLabelsComponent implements OnInit {

  constructor(private labelService: LabelServiceService,
    public dialog: MatDialog) { }
 @Input() labelDetails: any

pin:any;
labelNotes:any;
ngOnInit(): void {
  this.GetLabelNote();
}
GetLabelNote()
{
  console.log(this.labelDetails);
  this.labelService.GetLabelNote(this.labelDetails.labelName)
.subscribe(
  (status: any) => 
  {
  console.log(status.data);
  this.labelNotes=status.data;
  },(error: HttpErrorResponse) => {
  console.log(error.error.message);
})
}
OpenCard()
{
  this.dialog.open(CardDialogComponent);
}
}