import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesenvolvimentoComponent } from './desenvolvimento.component';

const routes: Routes = [
  { path: 'desenvolvimento', component: DesenvolvimentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesenvolvimentoRoutingModule { }
