import { Component, OnInit } from '@angular/core';;
import { DeleteService } from 'src/app/services/delete.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    private deleteService: DeleteService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  displayedColumns: string[] = ['Titulo', 'Descripcion', 'Referencias', 'Conclusiones', 'Eliminar'];
  

  deleteList: any = [];

  obtenerEventos() {
    this.deleteService.getAllEventosData().subscribe((data: {}) => {
      this.deleteList = data;
    })
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
        
        window.location.href = "http://localhost:4200/get"
      });
    }
  }




  deleteEventoEntry(id: any) {
    console.log(id)
    
    this.deleteService.deleteEvento(id).subscribe(
      () => {
       
        this.openMessage("Evento eliminado", "Actualizar lista");
      }
    );
  }


}
