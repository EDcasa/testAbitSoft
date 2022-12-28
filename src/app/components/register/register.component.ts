import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPerson } from 'src/app/interfaces/person.interface';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  formPerson: FormGroup = new FormGroup({});
  
  constructor(
    private formBuilder: FormBuilder,
    private _sPerson:PersonService
  ) { }
  

  ngOnInit(): void {
    this.formPerson = this.formBuilder.group({
      documentNumber: ["", [Validators.required,Validators.maxLength(10)]],
      firstName: ["", [Validators.required, Validators.maxLength(100)]],
      lastName: ["", [Validators.required, Validators.maxLength(100)]],
      amountSaving: ["", [Validators.required]],
    },{
      //validator: validateMinValueSaving("amountSaving")
    });
  }

  onSubmit(){
    const dataPerson:IPerson = this.formPerson.value;
    if(dataPerson.id){
      this._sPerson.putPerson(dataPerson)
    }else{
      this._sPerson.postPerson(dataPerson)
    }
  }

}
