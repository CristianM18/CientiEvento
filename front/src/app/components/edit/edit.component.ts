import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  editableEvento: boolean = false;
  displayedColumns: string[] = ['Titulo', 'Descripcion', 'Referencias', 'Conclusiones', 'Modificar'];

  getList: any = [];

  updateEventoEntry() {
    if (this.eventoForm.value['Titulo'] === '' || this.eventoForm.value['Descripcion'] === '' || this.eventoForm.value['Referencias'] === '' || this.eventoForm.value['Conclusiones'] === '') {
      this.openMessage("Falta información", "Cerrar");
    } else {
      this.editService.updateEvento(this.idEvento, this.eventoForm.value).subscribe(
        () => {
          this.openMessage("Evento editado", "Actualizar lista");
        })
    }
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

  message(message: string) {
    let snackBarRef = this._snackBar.open(message);
  }

  openMessage(message: string, action: string) {
    let snackBarRef = this._snackBar.open(message, action);
    if (message !== 'Falta información') {
      snackBarRef.afterDismissed().subscribe(() => {
        window.location.href = "http://localhost:4200/get"
      });
    }
  }

}
