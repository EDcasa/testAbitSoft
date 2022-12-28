import { Component, OnInit } from '@angular/core';
import { IPerson } from 'src/app/interfaces/person.interface';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  //dataSource!:IPerson[];
  dataSource:IPerson[]=[
    {
      id:1,
      age:30,
      birthDate:'19/11/1995',
      dateInscription:'19/11/1995',
      cost:30,
      fullName:"David Casa"
    }
  ];
  //displayedColumns = ["id","fullName", "age", "birthDate", "dateInscription", "cost", "edit", "delete"];
  displayedColumns = ["id","fullName", "age", "birthDate", "dateInscription", "cost"];

  constructor(
    private _sPerson:PersonService
  ) { }

  ngOnInit(): void {
    //this.getPeople();
  }

  getPeople(){
    this._sPerson.getPeople().subscribe(people=>{
      this.dataSource = people;
    })
  }

  deletePerson(id:number){
    this._sPerson.deletePerson(id).subscribe(result=>{
      console.log(result);
    })
  }
}
