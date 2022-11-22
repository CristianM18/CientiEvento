import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(
    private getService: GetService,
    private EditService: EditService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  displayedColumns: string[] = ['Titulo', 'Descripcion', 'Referencias', 'Conclusiones', 'Modificar'];
  idEvento: any;
  editableEvento: boolean = false;
  getList: any = [];

  obtenerEventos() {
    this.getService.getAllEventosData().subscribe((data: {}) => {
      this.getList = data;
    })
  }

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
    for (let key in this.eventoForm.value) {
    }
    this.EditService.updateEvento(this.idEvento, this.eventoForm.value).subscribe(
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

  eventoForm = this.formBuilder.group({
    Titulo: '',
    Descripcion: '',
    Referencias: '',
    Conclusiones: ''
  })

}
