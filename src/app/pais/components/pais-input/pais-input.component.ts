import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';


@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})

export class PaisInputComponent implements OnInit {

  @Output() onEnter     : EventEmitter<string> = new EventEmitter();
  @Output() onDevounce  : EventEmitter<string> = new EventEmitter();

  @Input()  placeholder : string = '';

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(10)//inndicamos que hasta que pasen 300 decimas de segundo no lo lance es decir tienes que para de escribir durante ese tiempo
    )
    .subscribe( valor =>{
      this.onDevounce.emit( valor)
    })
  }

  buscar(){
    this.onEnter.emit( this.termino ) ;
  }

  teclaPresionada ()  {
    this.debouncer.next(this.termino);
  }

}
