import { Component, Input, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  constructor(  private snack: MatSnackBar,
    private notesService: NoteServiceService) { }
  @Input() note!:any;
  ngOnInit(): void {
  }

  
horizontalPosition: MatSnackBarHorizontalPosition = 'start';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';

colorList = [ [
    { color: "white", tip: "white" },
    { color: "#F28B82", tip: "Red" },
    { color: "#FBBC04", tip: "Orange" },
    { color: "#FFF475", tip: "Yellow" },
  ],
  [
    { color: "#A7FFEB", tip: "Teal" },
    {color:"#CCFF90",tip:"Green"},
    { color: "#CBF0F8", tip: "Blue" },
    { color: "#AECBFA", tip: "Dark Blue" },
  ],
  [
    { color: "#FDCFE8", tip: "Pink" },
    { color: "#D7AEFB", tip: "Purple" },
    { color: "#E6C9A8", tip: "Brown" },
    { color: "#E8EAED", tip: "Gray" },
  ]]

openSnackBar(message: string) {
  this.snack.open(message,'',{duration:3000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,});
}

SetColor(color:any)
{
  this.notesService.SetColor(this.note.notesId,color)
  .subscribe(
    (status: any) => 
    {
    console.log(status.message);

    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })

}
PinNote()
{
    this.notesService.Pinnote(this.note.notesId)
    .subscribe(
      (status: any) => 
      {
      console.log(status.message);
      this.openSnackBar(status.message);
  
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })
  }
  unPinNote()
  {
    this.notesService.unPinnote(this.note.notesId)
    .subscribe(
      (status: any) => 
      {
      console.log(status.message);
      this.openSnackBar(status.message);
  
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })
  }
  Archive()
  {
    this.notesService.Archive(this.note.notesId)
    .subscribe(
      (status: any) => 
      {
      console.log(status.message);
      this.openSnackBar(status.message);
  
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })

  }
  UnArchive()
  {
    this.notesService.UnArchive(this.note.notesId)
    .subscribe(
      (status: any) => 
      {
      console.log(status.message);
      this.openSnackBar(status.message);
  
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })
  }
  DeleteImage()
  {
    console.log(this.note.notesId);
    this.notesService.DeleteImage(this.note.notesId)
    .subscribe(
      (status: any) => 
      {
      console.log(status.message);
      this.openSnackBar(status.message);
  
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })
  }
  OnselectFiles(event: any)
{
  var files: File = event.target.files.item(0);
   var formDatas = new FormData();
    formDatas.append('formFile', files,files.name);
    console.log(formDatas);
    console.log(this.note.notesId);
    this.notesService.AddImage(this.note.notesId,formDatas)
    .subscribe(
      (status: any) => 
      {
      console.log(status.message);
  
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })
}
NoteTrash()
{
  console.log(this.note.notesId);
  this.notesService.NoteTrash(this.note.notesId)
  .subscribe(
    (status: any) => 
    {
    console.log(status.message);
    this.openSnackBar(status.message);

    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
}

}