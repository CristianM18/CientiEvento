import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  constructor(
    private eventoService: EventoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  displayedColumns: string[] = ['Titulo', 'Descripcion', 'Referencias', 'Conclusiones', 'Modificar', 'Eliminar'];
  editableEvento: boolean = false;
  idEvento: any;

  eventoList: any = [];

  obtenerEventos() {
    this.eventoService.getAllEventosData().subscribe((data: {}) => {
      this.eventoList = data;
    })
  }

  newEventoEntry() {
    if (this.eventoForm.value['Titulo'] === '' || this.eventoForm.value['Descripcion'] === '' || this.eventoForm.value['Referencias'] === '' || this.eventoForm.value['Conclusiones'] === '') {
      this.openMessage("Falta información", "Cerrar");
    } else {
      this.eventoService.newEvento(this.eventoForm.value).subscribe(
        () => {
          this.openMessage("Evento agregado", "Actualizar lista");
        }
      );
    }
  }



  eventoForm = this.formBuilder.group({
    Titulo: '',
    Descripcion: '',
    Referencias: '',
    Conclusiones: ''
  })

  openMessage(message: string, action: string) {
    let snackBarRef = this._snackBar.open(message, action);
    if (message !== 'Falta información') {
      snackBarRef.afterDismissed().subscribe(() => {
        //Redirigiendo a la ruta actual /animal y recargando la ventana
        this.router.navigate(['/evento']).then(() => {
          window.location.reload();
        });
      });
    }
  }



  updateEventoEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.eventoForm.value) {/*
      if (this.eventoForm.value[key] === '') {
        this.eventoForm.removeControl(key);
      }*/
    }
    this.eventoService.updateEvento(this.idEvento, this.eventoForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.openMessage("Evento editado", "Actualizar lista");
      }
    );
  }

  toggleEditEvento(id: any) {
    this.idEvento = id;
    console.log(this.idEvento)
    this.editableEvento = !this.editableEvento;
  }


  deleteEventoEntry(id: any) {
    console.log(id)
    this.eventoService.deleteEvento(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.openMessage("Evento eliminado", "Actualizar lista");
      }
    );
  }


}
