import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  formulario: FormGroup;

  constructor( ) {

    this.formulario = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      apellidos: new FormControl('', [
        Validators.minLength(10)
      ]),
      edad: new FormControl('', [
        this.edadValidator
      ]),
      dni: new FormControl('', [
        this.dniValidator
      ]),
      // password: new FormControl(''),
      // repite_password: new FormControl(''),
      email: new FormControl('', [
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)
      ]),
      
    });

   }

  ngOnInit(): void {

    const emailControl = this.formulario.controls.email;
    emailControl.valueChanges.pipe(debounceTime(500)).subscribe(valor => {
      console.log(valor);
    });

  }

  onSubmit() {
    console.log(this.formulario.valid);
    
  }


  // Devolver null si no hubo errores y en caso contrario cualquier
    //otro valor, como un objeto

  edadValidator(formControl) {

    const value = formControl.value;

    const max = 70;
    const min = 18;

    if(value >= min && value <= max) {
      return null;
    } else {
      return {edadValidator: {max, min}}
    }    

  }

  dniValidator(formControl){

    const value = formControl.value;
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKET';

    if(/^\d{8}[a-zA-Z]$/.test(value)) {
      const numero = value.substr(0, value.length - 1);
      const letra = value.charAt(value.length -1);
      console.log(numero, letra);

      const calculo = numero % 23;

      const letraSeleccionada = letras.charAt(calculo);

      if(letra.toUpperCase() === letraSeleccionada) {

        return null;
      } else {

        return {dnivalidator: 'La letra no coinicide con el número'}

      }

    } else {
      return {dnivalidator: 'El dni no tiene el formato adecuado'}

    }


  }


  get nombreRequerido() {
    return this.formulario.get('nombre').hasError('required') && this.formulario.get('nombre').touched
  }
  get nombreNoValido() {
    return this.formulario.get('nombre').hasError('minlength') && this.formulario.get('nombre').touched
  }
  get edadNoValida() {
    return this.formulario.get('edad').hasError('edadValidator') && this.formulario.get('edad').touched
  }
  get apellidosNoValidos() {
    return this.formulario.get('apellidos').hasError('minlength') && this.formulario.get('apellidos').touched
  }
  get dniNoValido() {
    return this.formulario.get('dni').invalid && this.formulario.get('dni').touched
  }

  get emailNoValido() {
    return this.formulario.get('email').hasError('pattern') && this.formulario.get('email').touched;
  }

  get pass1NoValido() {
    return this.formulario.get('password').invalid && this.formulario.get('password').touched;
  }

  get repite_passwordNoValido() {
    const password = this.formulario.get('password').value;
    const repite_password = this.formulario.get('repite_password').value;

    return ( password === repite_password ) ? false : true;
  }

  get numLetrasNombre() {
    return this.formulario.get('nombre').errors.minlength.requiredLength;
  }
  get numLetrasApellidos() {
    return this.formulario.get('apellidos').errors.minlength.requiredLength;
  }

  get edadMinima() {
    return this.formulario.get('edad').errors.edadValidator.min;
  }
  get edadMaxima() {
    return this.formulario.get('edad').errors.edadValidator.max;
  }

  get mensajeDNI () {
    return this.formulario.get('dni').errors.dnivalidator;
  }

}
