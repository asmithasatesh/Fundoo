import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/NotesService/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-getnote',
  templateUrl: './getnote.component.html',
  styleUrls: ['./getnote.component.scss']
})
export class GetnoteComponent implements OnInit {

  constructor(private notesService: NoteServiceService) { }
  pin:boolean=false;
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
}
