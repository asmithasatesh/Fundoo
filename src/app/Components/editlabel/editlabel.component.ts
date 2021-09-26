
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatList } from '@angular/material/list';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})

export class EditlabelComponent implements OnInit {
  UserDetails =  JSON.parse(localStorage.getItem("UserDetails")!); 
  labels:any;
  searchField:any;
  collabData:any;
  editlabel:any;
  currentLabel:any;
  edit:boolean=true;
  labelNames:any;
  change:boolean=true;
  constructor(  public dialogRef: MatDialogRef<EditlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notesService: NoteServiceService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
 this.GetLabel();
  }
  clearSearchField() {
    console.log(this.labels);
    this.AddLabelUsingEdit();
    this.labels.push(this.searchField);
    console.log(this.labels);
        this.searchField = '';
      }
      save(){

        this.dialogRef.close(this.labels);
     }
     close(){
       this.dialogRef.close(this.data.collab);
     }
     RemoveLabel(label:any)
     {
  
       this.labels.splice(this.labels.indexOf(label),1);
     }
     AddLabelUsingEdit()
     {
      this.notesService.AddLabelUsingEdit(this.searchField)
      .subscribe(
        (status: any) => 
        {
        console.log(status.data);
        },(error: HttpErrorResponse) => {
        console.log(error.error.message);
      });
     }

     EditLabel(label:any)
     {
      //  label.labelName=this.labelName;
       console.log("labeellllllllllll");
      label.labelName=this.labelNames;
       this.notesService.EditLabel(label)
       .subscribe(
         (status: any) => 
         {
         console.log(status.data);
         },(error: HttpErrorResponse) => {
         console.log(error.error.message);
       });

     }

     Delete(label:any)
     {
      this.notesService.DeleteUsingEdit(label)
      .subscribe(
        (status: any) => 
        {
        console.log(status.data);
        },(error: HttpErrorResponse) => {
        console.log(error.error.message);
      });
     }

  GetLabel()
  {
    this.notesService.GetLabel()
  .subscribe(
    (status: any) => 
    {

      console.log("labels");
      console.log(status.data);

          this.labels=status.data;
          console.log(this.labels)

    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
  }

  Change(event:any)
  {
    this.labelNames=event.target.value;
  }
}
