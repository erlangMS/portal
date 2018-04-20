import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PagerComponent } from '../paginator/pager.component';
import { NgForm, FormControl } from '@angular/forms'

import { Nivel } from '../nivel/nivel';
import { SignRoles } from '../c3/signRoles';
import { Template } from '../c3/template';

import { NivelService } from '../nivel/nivel.service';
import { SignRolesService } from '../c3/signRoles.service';
import { TemplateService } from '../c3/template.service';

import { MatPaginator, PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MatSnackBar , MAT_DIALOG_DATA } from '@angular/material';
import { ServicoService } from './servico.service';
import { Servico } from './servico';

@Component({
    selector: 'servico-lista',
    templateUrl: './servico-lista.component.html',
})

export class ServicoListaComponent implements OnInit {

    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private idTemplate: number;
    private nameSignatarios: string[];
    private pageEventMostrar: PageEvent;
    private lista: Observable<Servico[]>;
    private filtro: Servico = new Servico();
    private servicoArray: Servico[];

    displayedColumns = ['Nome', 'Dono', 'Url', 'Tipo', 'Serviço', 'Linguagem', 'Visualizar'];
    pageSizeOptions = [5, 10, 25, 100];

    private batchName: string;

    constructor(
        private router: Router,
        private servicoService: ServicoService,
        private snackBar: MatSnackBar
    ) {  }

    ngOnInit() {
        this.carregarServicos();
    }

    carregarServicos(){
        this.lista = this.servicoService.paginar(this.filtro);
        this.isLoading.next(true);
        this.lista.subscribe(
            res => {
                this.servicoArray = res;
                this.servicoService.pagerComponent.setPage(1);
                this.servicoService.pagerComponent.length = res.length;
            },
            error => this.erro(error),
            () => this.isLoading.next(false),
        );
    }

    buscarServicos(){
        this.carregarServicos();
    }

    paginar(pageEvent:PageEvent){
        this.servicoService.pagerComponent.setPage(pageEvent.pageIndex+1, pageEvent.pageSize);
    }

    preVisualizarServico(servico:Servico) {
        let id = servico.rowid;
        this.router.navigate(['/servico', id]);
    }

    erro(erro: string){
        this.snackBar.open(erro, 'Ok', {duration: 5000});
        this.isLoading.next(false);
    }

}
