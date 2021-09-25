import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteServiceService } from 'src/app/Services/NotesService/note-service.service';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss']
})


export class CardDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private NoteService:NoteServiceService,
    private snackBar: MatSnackBar
    ) { }
  ngOnInit(): void {
  }
  updateNote()
  {
    console.log("working");
    console.log(this.data.note.notesId);
    this.NoteService.updateNote(this.data.note).subscribe((result:any)=>
    {
      console.log(result);
      this.openSnackBar(result.message);
    });
    this.dialogRef.close();

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Resize(){
    var textArea = document.getElementById("textarea")!      
    textArea.style.height = 'auto';
    textArea.style.height = Math.min(500,textArea.scrollHeight) + 'px';
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
  }
}