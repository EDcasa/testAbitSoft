import { IPerson } from 'src/app/interfaces/person.interface';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentChecked {

  dataSource!:MatTableDataSource<IPerson>;

  constructor(
    private _sPerson:PersonService,
  ) { }

  ngOnInit(): void {
    this._sPerson.getPeople();
  }

  ngAfterContentChecked(){
    this._sPerson.getListPeople().subscribe(people => {
      this.dataSource = new MatTableDataSource<IPerson>(people);;
    })
  }

}
