import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { MaterialComponents } from '../materialComponents/materialComponents.module';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsService } from './clients.service';
import { SistemasService } from '../sistemas/sistemas.service';



@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    MaterialComponents,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ClientsService, SistemasService
  ],
})
export class ClientesModule { }
