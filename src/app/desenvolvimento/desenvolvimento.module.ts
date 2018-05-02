import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsService } from '../clients.service';
import { SistemasService } from '../sistemas.service';
import { MaterialComponents } from '../materialComponents/materialComponents.module';
import { DesenvolvimentoComponent } from './desenvolvimento.component';
import { DesenvolvimentoRoutingModule } from './desenvolvimento-routing.module';


@NgModule({
  declarations: [
    DesenvolvimentoComponent
  ],
  imports: [
    CommonModule,
    MaterialComponents,
    DesenvolvimentoRoutingModule,
  ],
  providers: [
    ClientsService, SistemasService
  ],
})
export class DesenvolvimentoModule { }
