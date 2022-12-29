import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IPerson } from '../interfaces/person.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  readonly baseURL = 'http://localhost:61236/api/Person'
  private _listPerson = new BehaviorSubject<IPerson[]>({} as IPerson[]);
  private _listPerson$ = this._listPerson.asObservable();
  
  private _personEdit = new BehaviorSubject<IPerson>({} as IPerson);
  private _personEdit$ = this._personEdit.asObservable();

  constructor(
    private http: HttpClient
  ) { }
  
  getPeople(){
    return this.http.get<IPerson[]>(this.baseURL).subscribe(p=>{
      this._listPerson.next(p);
    });
  }

  getListPeople() {
    return this._listPerson$;
  }

  postPerson(dataPerson:IPerson){
    return this.http.post<IPerson>(this.baseURL, dataPerson);
  }

  putPerson(id:number,dataPerson:IPerson){
    return this.http.put(`${this.baseURL}/${id}`, dataPerson);
  }

  deletePerson(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getPersonById(id:number){
    return this.http.get<IPerson>(`${this.baseURL}/${id}`).subscribe(p=>{
      this._personEdit.next(p);
    });
  }

  getDataEditPerson(){
    return this._personEdit$;
  }
}
