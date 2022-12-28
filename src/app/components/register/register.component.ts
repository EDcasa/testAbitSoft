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
      fullName: ["", [Validators.required,Validators.maxLength(10)]],
      age: ["", [Validators.required, Validators.maxLength(100)]],
      birthDate: ["", [Validators.required, Validators.maxLength(100)]],
      dateInscription: ["", [Validators.required]],
      cost: ["", [Validators.required]],
    },{
      //validator: validateMinValueSaving("amountSaving")
    });
  }

  onSubmit(){
    console.log("in submit");
    console.log(this.formPerson);
    
    const dataPerson:IPerson = this.formPerson.value;
    if(dataPerson.id){
    this._sPerson.putPerson(dataPerson)
    }else{
      this._sPerson.postPerson(dataPerson).subscribe(val=>{
        console.log("in result");
        
      }, err=>{
        console.log(err);
        
      })
    }
  }

}
