import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
toggle:boolean=true;
  constructor() { }

  ngOnInit(): void {
    
  }


Resize(){
  var textArea = document.getElementById("textarea")!      

  textArea.style.height = 'auto';
  textArea.style.height = Math.min(500,textArea.scrollHeight) + 'px';
}

}
