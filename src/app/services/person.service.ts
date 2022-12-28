import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IPerson } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  readonly baseURL = 'http://localhost:61236/api/Person'


  constructor(
    private http: HttpClient
  ) { }
  
  getPeople(){
    return this.http.get<IPerson[]>(this.baseURL);
  }

  postPerson(dataPerson:IPerson){
    console.log(dataPerson);
    
    return this.http.post<IPerson>(this.baseURL, dataPerson);
  }

  putPerson(dataPerson:IPerson){
    return this.http.put(`${this.baseURL}/${dataPerson.id}`, dataPerson);
  }

  deletePerson(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
