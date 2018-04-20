import { NgModule }             from '@angular/core';
import { RouterModule }         from '@angular/router';
import { AuthGuard }            from 'seguranca';
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
                path: 'servico/:id',
                component: ServicoDetalheComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class ServicoRoutingModule {

}
