import { ToastrService } from 'ngx-toastr';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IPerson } from 'src/app/interfaces/person.interface';
import { PersonService } from 'src/app/services/person.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  //dataSource!:IPerson[];
  displayedColumns = ["id","fullName", "age", "birthDate", "dateInscription", "cost", "actions"];

  @Input() dataSource!:MatTableDataSource<IPerson>;

  constructor(
    private _sPerson:PersonService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void { 
  }

  deletePerson(id:number){
    this._sPerson.deletePerson(id).subscribe(result=>{
      this.toastr.success("Se ha eliminado exitosamente!","Registro exitoso");
      this._sPerson.getPeople();
    })
  }

  editPerson(id:number){
    this._sPerson.getPersonById(id);
  }
}
