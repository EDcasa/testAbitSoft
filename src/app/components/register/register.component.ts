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
  age!:number;
  
  constructor(
    private formBuilder: FormBuilder,
    private _sPerson:PersonService
  ) { }
  

  ngOnInit(): void {
    this.formPerson = this.formBuilder.group({
      fullName: ["", [Validators.required,Validators.maxLength(10), Validators.minLength(9)]],
      age: ["", [Validators.required, Validators.maxLength(100)]],
      birthDate: ["", [Validators.required, Validators.maxLength(100)]],
      dateInscription: ["", [Validators.required]],
      cost: ["", [Validators.required]],
    },{
      //validator: validateMinValueSaving("amountSaving")
    });
  }

  onSubmit():any{ 
    console.log("in submit");
    
    
    const dataPerson:IPerson = this.formPerson.value;
    if(dataPerson.dateInscription < dataPerson.birthDate){
      //return "La fecha de nacimiento no puede ser mayor a la fecha de inscripción";
      return true;
    }
    this.age =  this.CalculateAge(dataPerson.birthDate,'','age');
    if(dataPerson.age == this.age){
      if(dataPerson.age<18){
        //"La edad de la persona debe ser mayor a 18 años";
        return true;
      }
    }else{
      //la fecha de nacimiento y la edad no coinciden
      console.log("la fecha de nacimiento y la edad no coinciden");
      
    }

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

  public CalculateAge(birthDate:any, otherDate:any, type:any): number {
    if(type=='age'){
        var timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
        return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }else{
      var timeDiff = Math.abs(new Date(otherDate).getTime() - new Date(birthDate).getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
    
  }

  onchangeDateInscription(){
    let numberYears = this.CalculateAge(this.formPerson.controls['birthDate'].value, this.formPerson.controls['dateInscription'].value,'diff');
    this.formPerson.controls['cost'].setValue(numberYears*100);
  }
}
