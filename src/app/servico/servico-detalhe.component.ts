import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Servico } from './servico';
import { ServicoService } from './servico.service';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: [ './servico-detalhe.component.css' ]
})
export class ServicoDetalheComponent implements OnInit {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  servico: Servico;
  response: Response;

  public urlPath:any = '';;
  public mimeType:any = '';
  public isPdf:boolean = false;

  constructor(
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private location: Location,
    public mensagem: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.carregarServico();
  }


  carregarServico() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.servicoService.getServico(+params.get('id')))
      .subscribe(
        servico => this.servico = servico
      );
  }

  voltar(): void {
    this.location.back();
  }

  executar(url : string, service: Servico) {
    this.servicoService.executar(url, service).subscribe(
      response => {
        this.response = response;
        if(response.tipo == 'application/pdf'){
          this.urlPath = this.downloadArquivoAnexo(response);
          this.mimeType = response.tipo;
        }
        
      }
    );
  }

  downloadArquivoAnexo(documento: any):any{
    if(!documento){
      this.mensagem.open("Nenhum arquivo encontrado.", 'X', {duration: 5000});
    }else{    
        var byteCharacters = atob(documento.arquivo);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], {type: documento.tipo});
        var url= window.URL.createObjectURL(blob);
        this.isPdf = true;
        return url;
      }
    }

    public innerHtml(): SafeHtml{
      return "<object data='" + this.urlPath + "' type='" + this.mimeType + "' class='embed-responsive-item' width='100%' height='600px'>" +
          "<embed src='" + this.urlPath + "' type='" + this.mimeType + "' />" +
          "</object>";
      
      
    }

}
