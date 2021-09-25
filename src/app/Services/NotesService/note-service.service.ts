import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  UserDetails = JSON.parse(localStorage.getItem('UserDetails')!);
  header:any=''
  constructor(private httpService : HttpServiceService) { }
  CreateNote(data: any) {
   
    let params = {
      Title: data.title,
      Description: data.desc,
      UserId: this.UserDetails.userId,
      Color: data.color,
      Archive:data.archive,
      Pin:data.pin,
      Remainder:data.reminder
    };
    this.getToken();
    console.log(this.header);
    return this.httpService.post(`${environment.baseUrl}/api/CreateNote`, params,true,this.header);
  }
  getToken(){
    this.header = {
      headers: {Authorization: "Bearer " + this.UserDetails.userToken}
    }

  }
  GetLabel()
  {
    let params= new HttpParams().set('userId',this.UserDetails.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetLabelUsingUserId`, params,true,this.header);
  }
  GetNote()
  {
    let params= new HttpParams().set('userId',this.UserDetails.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetUserNote`, params,true,this.header);
  }
  GetReminder()
  {
    let params= new HttpParams().set('userId',this.UserDetails.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetReminder`, params,true,this.header); 
  }
  GetArchive()
  {
    let params= new HttpParams().set('userId',this.UserDetails.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetArchive`, params,true,this.header); 
  }
  TrashNote()
  {
    let params= new HttpParams().set('userId',this.UserDetails.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetTrash`, params,true,this.header); 
  }
  DeleteTrash(notesId: any)
  {   
  this.getToken();
  return this.httpService.delete(`${environment.baseUrl}/api/DeleteNote?notesId=${notesId}`,true,this.header); 
  }
  AddImage(notesId:any,file:any)
  {

    console.log(file);
      this.getToken();
      return this.httpService.put(`${environment.baseUrl}/api/AddImage?notes=${notesId}`,file,true,this.header); 
      
  }
  RestoreTrash(noteId: any)
  {
    let params= new HttpParams().set('notesId',noteId);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/RestoreTrash`, params,true,this.header); 
  }
  EmptyTrash()
  {
    this.getToken();
    return this.httpService.delete(`${environment.baseUrl}/api/EmptyTrash?userId=${this.UserDetails.userId}`,true,this.header); 
  }
  SetColor(notesId:any,color:string)
  {
    let params= new HttpParams().set('notesId',notesId).set('color',color);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/SetColor`, params,true,this.header); 
  }
  Pinnote(note:any)
  {
    let params= new HttpParams().set('notesId',note);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/PinNote`, params,true,this.header); 
  }
  unPinnote(note:any)
  {
    let params= new HttpParams().set('notesId',note);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/UnPinNote`, params,true,this.header); 
  }
  Archive(noteId:any)
  {
    let params= new HttpParams().set('notesId',noteId);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/ArchiveNote`, params,true,this.header); 
  }
  UnArchive(noteId:any)
  {
    let params= new HttpParams().set('notesId',noteId);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/UnArchiveNote`, params,true,this.header); 
  }
  DeleteImage(noteId:any)
  {    let params= new HttpParams().set('notesId',noteId);
  this.getToken();
  return this.httpService.put(`${environment.baseUrl}/api/RemoveImage`, params,true,this.header); 

  }
  NoteTrash(noteId:any)
  {
    let params= new HttpParams().set('notesId',noteId);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/TrashNote`, params,true,this.header); 
  
  }
  SetReminder(notes:any,notesId:any)
  {
    var obj={
      Remainder: notes,
  NotesId:notesId,
  UserId: this.UserDetails.userId
    };
    this.getToken();
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/SetReminder`, obj,true,this.header);
  }
  DeleteReminder(notesId:any)
  {
    let params= new HttpParams().set('notesId',notesId);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/RemoveReminder`, params,true,this.header); 
  }
  AddCollab(element:any,notesId:any)
  {
    var obj={
      CollaboratorEmail:element,
      NotesId:notesId
    };
    this.getToken();
    console.log("email"+obj);
    return this.httpService.post(`${environment.baseUrl}/api/AddCollaborator`, obj,true,this.header);
  }
  GetLabelsByNotesId()
  {
    let params= new HttpParams().set('userId',this.UserDetails.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetLabelByNoteId`, params,true,this.header); 

  }
  CreateLabelUsingNote(labelName:any,notesId:any)
  {
    var obj={
      LabelName:labelName,
      NotesId:notesId
    };
    this.getToken();
    console.log("email"+obj);
    return this.httpService.put(`${environment.baseUrl}/api/CreateLabelUsingNote`, obj,true,this.header);

  }
  GetCollab(notesId:any)
  {
    let params= new HttpParams().set('notesId',notesId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetCollaborator`, params,true,this.header); 
  }
  RemoveCollab(collabId:any)
  {
    this.getToken();
    return this.httpService.delete(`${environment.baseUrl}/api/RemoveCollaborator?collabId=${collabId}`,true,this.header); 
  }
  updateNote(data:any)
  {
    console.log("hggg");
    console.log(data);
    var param= 
    {
      Title :data.title,
        Description:data.description,
        NotesId:data.notesId,
        UserId:data.userId
    }
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/UpdateNote`, param,true,this.header);
  }
}