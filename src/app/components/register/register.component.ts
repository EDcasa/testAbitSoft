import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPerson } from 'src/app/interfaces/person.interface';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formPerson: FormGroup = new FormGroup({});
  age!: number;

  constructor(
    private formBuilder: FormBuilder,
    private _sPerson: PersonService,
    private toastr: ToastrService
  ) { }

  id!:number;

  ngOnInit(): void {
    this.formPerson = this.formBuilder.group({
      fullName: ["", [Validators.required, Validators.minLength(9)]],
      age: ["", [Validators.required, Validators.maxLength(100)]],
      birthDate: ["", [Validators.required, Validators.maxLength(100)]],
      dateInscription: ["", [Validators.required]],
      cost: ["", [Validators.required]],
    });
    this._sPerson.getDataEditPerson().subscribe(data => {
      console.log(data);
      if(Object.keys(data).length>0){
        this.id = data.id;
        this.formPerson.controls['fullName'].setValue(data.fullName);
        this.formPerson.controls['age'].setValue(data.age);
        this.formPerson.controls['birthDate'].setValue(new Date(data.birthDate).toISOString().split('T')[0]);
        this.formPerson.controls['dateInscription'].setValue(new Date(data.dateInscription).toISOString().split('T')[0]);
        this.formPerson.controls['cost'].setValue(data.cost);
      }
    })
  }

  onSubmit(): any {
    this.formPerson.markAllAsTouched();
    this.formPerson.markAsDirty();
    if (this.formPerson.invalid) {
      return true;
    }
    const dataPerson: IPerson = this.formPerson.value;
    if (dataPerson.dateInscription < dataPerson.birthDate) {
      this.toastr.error('La fecha de nacimiento no puede ser mayor a la fecha de inscripción!', 'Inconsistencia en la informacion');
      return true;
    }
    this.age = this.CalculateAge(dataPerson.birthDate, '', 'age');
    if (dataPerson.age == this.age) {
      if (dataPerson.age < 18) {
        this.toastr.error('La edad de la persona debe ser mayor a 18 años!', 'Inconsistencia en la informacion');
        return true;
      }
    } else {
      this.toastr.error('La fecha de nacimiento y la edad no coinciden!', 'Inconsistencia en la informacion');
      return true;
    }

    if (this.id) {
      dataPerson.id = this.id;
      this._sPerson.putPerson(this.id,dataPerson).subscribe(up=>{
        this._sPerson.getPeople();
        this.toastr.success('La informacion se ha actualizado exitosamente!', 'Actualizacion exitosa.');
      })
    } else {
      this._sPerson.postPerson(dataPerson).subscribe(val => {
        this.toastr.success('Sus datos han sido registrados exitosamente!', 'Registro exitoso.');
        this._sPerson.getPeople();
      }, err => {
        this.toastr.error('No se ha podido registrar su informacion intentelo mas tarde!', 'Ha ocurrido un error!.');
      })
    }
    this.formPerson.reset();
  }

  public CalculateAge(birthDate: any, otherDate: any, type: any): number {
    if (type == 'age') {
      var timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    } else {
      var timeDiff = new Date(otherDate).getTime() - new Date(birthDate).getTime();
      return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

  }

  onchangeDateInscription() {
    let numberYears = this.CalculateAge(this.formPerson.controls['birthDate'].value, this.formPerson.controls['dateInscription'].value, 'diff');
    if (numberYears > 0) {
      this.formPerson.controls['cost'].setValue(numberYears * 100);
    }
    this.formPerson.controls['cost'].setValue(0);
  }
}
