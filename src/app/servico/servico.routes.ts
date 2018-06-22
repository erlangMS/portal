import { NgModule }             from '@angular/core';
import { RouterModule }         from '@angular/router';
import { AuthGuard }            from 'ems-oauth2-client';
import { ServicoListaComponent } from './servico-lista.component';
import { ServicoDetalheComponent } from './servico-detalhe.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'servicos',
                component: ServicoListaComponent,
                canActivate: [AuthGuard],
                data: { nome: '/servicos' }
            },
            {
                path: 'servicos/:id',
                component: ServicoDetalheComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class ServicoRoutingModule {

}
