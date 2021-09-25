import { Component, Input, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
  import {FormBuilder, FormGroup} from '@angular/forms';
  import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  constructor(  private snack: MatSnackBar,
    private notesService: NoteServiceService,
    fb: FormBuilder,
    public dialog:MatDialog,
    private data:DataserviceService) {

     }
  @Input() note!:any;
  files:any;
  notes:any;
  image:any;
  file:any;
  checkLabel:any;
  ngOnInit(): void {
    console.log(this.note);
    this.selecteds = this.note.remainder;
    this.GetLabelUsingUserId();
    this.data.currentMessage.subscribe((change)=>{
      if(change == true){
        this.data.changeMessage(false);
      }
  });
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
noteLabel:any;
GetLabelUsingUserId()
{
  this.notesService.GetLabel()
  .subscribe(
    (status: any) => 
    {
    console.log("Label"+status.data);
    this.noteLabel=status.data;

    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })

}
AddLabeltoNote(labelName:any)
{
  this.notesService.CreateLabelUsingNote(labelName,this.notes.notesId)
  .subscribe(
    (status: any) => 
    {
     
    console.log("Label"+status.data);
    this.noteLabel=status.data;
    this.data.changeMessage(true);

    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })

}
SetColor(color:any)
{
  this.notesService.SetColor(this.note.notesId,color)
  .subscribe(
    (status: any) => 
    {
      this.data.changeMessage(true);
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
        this.data.changeMessage(true);
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
        this.data.changeMessage(true);
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
        this.data.changeMessage(true);
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
        this.data.changeMessage(true);
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
        this.data.changeMessage(true);
      console.log(status.message);
      this.openSnackBar(status.message);
  
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })
  }
  onFileChanged(event: any)
  {
    var files: File = event.target.files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload =(event:any)=>{
      this.image = event.target.result;
    console.log(files);
     const formData = new FormData();
      formData.append('formFile', files,files.name);
      console.log(this.note.notesId);
      this.file = formData;
      this.AddImage();
  }
  }
AddImage()
{
  this.notesService.AddImage(this.note.notesId,this.file)
  .subscribe(
    (status: any) => 
    {
      this.data.changeMessage(true);
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
      this.data.changeMessage(true);
    console.log(status.message);
    this.openSnackBar(status.message);

    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
}
pickDate:boolean=false;
archive:boolean=false;
public date = new Date();
reminder:any;
time:string='8:PM';
selecteds:string='';
// image:any;
monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];
SetDates(date:string)
{

    console.log(date);
    if(date == 'set')
    {
      let nextDate= this.getMonday(new Date());
      date=  this.monthNames[nextDate.getMonth()] +" "+nextDate.getDate().toString() + ", 8:00 AM"
      console.log(date);
      this.date=nextDate;
      this.time="8:AM";
    }
    else if(date == 'Tomorrow, 8:00AM')
    {
      this.date=new Date(this.date.setDate(this.date.getDate() + 1));
      console.log(this.date);
      this.time="8:AM";
    }
    this.reminder=date;
    this.pickDate=!this.pickDate;
    console.log("calling")
    this.SetReminder(date);
}
getMonday(d:any) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() + day + (day == 1 ? 6:(5-day)); // adjust when day is sunday
  return new Date(d.setDate(diff));
}
SetReminder(data:any)
{
  console.log("called")
  console.log(data);


  this.notesService.SetReminder(data,this.note.notesId)
  .subscribe(
    (status: any) => 
    {
      this.data.changeMessage(true);
    console.log(status.message);

    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
}
SaveChanges()
{

 let day=''
 let currDate= new Date();
 console.log(this.date);
 console.log(currDate);
 if(this.date.getDate() == currDate.getDate())
 {
   day="Today";
 }
 else if(this.date.getDate() == new Date(currDate.setDate(currDate.getDate() + 1)).getDate())
 {
   day= "Tomorrow"
 }
 else{
   day = this.monthNames[this.date.getMonth()]+" "+ this.date.getDate().toString();
 }
 this.reminder=day+", "+this.selecteds;
 this.SetReminder(this.reminder);
}
collaboratorArray=[];

openDialog()
{
  console.log(this.collaboratorArray);
  let dialogRef =this.dialog.open(CollaboratorDialogComponent,{data:{collab: this.collaboratorArray, noteId:this.note.notesId, element:1}});
  dialogRef.afterClosed().subscribe(result =>
    {
      console.log( `Dialog result: ${result}`);
      this.collaboratorArray = result;
    });

}

}