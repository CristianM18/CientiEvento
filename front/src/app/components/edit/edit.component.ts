import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditService } from 'src/app/services/edit.service';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private editService: EditService,
    private getService: GetService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this.getService.getAllEventosData().subscribe((data: {}) => {
      this.getList = data;
    })
  }
  
  idEvento: any;
  editableEvento: boolean = true;
  displayedColumns: string[] = ['Titulo', 'Descripcion', 'Referencias', 'Conclusiones'];

  getList: any = [];

  updateEventoEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.eventoForm.value) {/*
      if (this.eventoForm.value[key] === '') {
        this.eventoForm.removeControl(key);
      }*/
    }
    this.editService.updateEvento(this.idEvento, this.eventoForm.value).subscribe(
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

  openMessage(message: string, action: string) {
    let snackBarRef = this._snackBar.open(message, action);
    if (message !== 'Falta información') {
      snackBarRef.afterDismissed().subscribe(() => {
        //Redirigiendo a la ruta actual /animal y recargando la ventana
        this.router.navigate(['/evento']).then(() => {
          window.location.href="http://localhost:4200/get"
        });
      });
    }
  }

}
