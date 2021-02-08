import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './components/template/template.component';
import { ModelComponent } from './components/model/model.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {path: 'template', component: TemplateComponent},
  {path: 'model', component: ModelComponent},
  {path: 'inicio', component: InicioComponent},
  {path: '', pathMatch: 'full', redirectTo: '/inicio'},
  {path: '**', redirectTo: 'inicio'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
