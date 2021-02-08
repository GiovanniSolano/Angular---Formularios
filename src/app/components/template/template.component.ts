import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {




  paises: any[] = [];


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit( forma: NgForm ) {
    
    // Marcar todos los campos como si estubviean touched
    // if ( forma.invalid ) {

    //   Object.values( forma.controls ).forEach( control => {
    //     control.markAsTouched();
    //   });

    //   return;
    // }


    console.log( forma.value );
  }

}
