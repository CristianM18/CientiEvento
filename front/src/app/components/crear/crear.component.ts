import { Component, OnInit } from '@angular/core';
import { CrearService } from 'src/app/services/crear.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  constructor(
    private crearService: CrearService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  displayedColumns: string[] = ['Titulo', 'Descripcion', 'Referencias', 'Conclusiones'];
 

  crearList: any = [];

  obtenerEventos() {
    this.crearService.getAllEventosData().subscribe((data: {}) => {
      this.crearList = data;
    })
  }

  newEventoEntry() {
    if (this.eventoForm.value['Titulo'] === '' || this.eventoForm.value['Descripcion'] === '' || this.eventoForm.value['Referencias'] === '' || this.eventoForm.value['Conclusiones'] === '') {
      this.openMessage("Falta información", "Cerrar");
    } else {
      this.crearService.newEvento(this.eventoForm.value).subscribe(
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
        window.location.href = "http://localhost:4200/get"
      });
    }
  }


}
