import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { EventoComponent } from './components/evento/evento.component';
import { GetComponent } from './components/get/get.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {path : 'evento', component: EventoComponent},
  {path : 'get', component: GetComponent},
  {path : 'edit', component: EditComponent},
  {path : 'index', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
