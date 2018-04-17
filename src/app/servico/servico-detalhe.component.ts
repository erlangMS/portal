import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Servico }        from './servico';
import { ServicoService } from './servico.service';

@Component({
  selector: 'servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: [ './servico-detalhe.component.css' ]
})
export class ServicoDetalheComponent implements OnInit {

  servico: Servico;

  constructor(
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.servicoService.getServico(+params.get('id')))
      .subscribe(servico => this.servico = servico);
  }

  goBack(): void {
    this.location.back();
  }

}
