import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Servico } from './servico';
import { ServicoService } from './servico.service';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthInterceptor } from 'ems-oauth2-client';

@Component({
  selector: 'servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: ['./servico-detalhe.component.css']
})
export class ServicoDetalheComponent implements OnInit {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public servico: Servico = new Servico();
  public parametrosServico = [];

  public urlExecutada = '';
  response: any = '';
  status:any = '';
  contentLength:any = '';


  public erro = false;

  public urlPath: any = '';;
  public mimeType: any = '';
  public isPdf: boolean = false;

  constructor(
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private location: Location,
    public mensagem: MatSnackBar,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.carregarServico();
  }


  carregarServico() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.servicoService.getServico(+params.get('id')))
      .subscribe(
        servico => {
          this.servico = servico
          //extrair os parametros
          let regex = /:\w*/gm;
          let parametrosRegex = regex.exec(servico.url)
          if (parametrosRegex) {
            parametrosRegex.forEach(parametro => {
              this.parametrosServico.push({ 'nome': parametro, 'valor': '' })
            });
          }

        }
      );
  }

  voltar(): void {
    this.location.back();
  }

  executar(url: string, service: Servico) {
    this.erro = false;
    if (this.parametrosServico && this.parametrosServico.length > 0) {
      // para os casos tipo ":id, :id2, :id3"
      // reverter garante que o valor de :id não seja colocado prematuramente em :id2 e :id3
      this.parametrosServico.reverse;
      this.parametrosServico.forEach(param => {
        if (param.valor != '') {
          url = url.replace(param.nome, param.valor)
        }
      });
    }
    this.response = new Response();
    this.isLoading.next(true);
    this.servicoService.executar(url, service).subscribe(
      response => {
        this.response = response.body;
        this.status = response.status+' '+response.statusText;
        this.contentLength = response.headers.get('content-length');
        if (AuthInterceptor.valueHeader == 'application/pdf') {
          this.urlPath = this.downloadArquivoAnexo(response);
          this.mimeType = AuthInterceptor.valueHeader;
          AuthInterceptor.keyHeader = '';
          AuthInterceptor.valueHeader = '';
        }    
      },
      err => {
        this.erro = true
        this.isLoading.next(false);
        this.response = err;
      },

      () => {
        this.isLoading.next(false);
      }
    );
  }

  downloadArquivoAnexo(documento: any): any {
    if (!documento) {
      this.mensagem.open("Nenhum arquivo encontrado.", 'X', { duration: 5000 });
    } else {
      var byteCharacters = atob(documento);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], { type: AuthInterceptor.valueHeader });
      var url = window.URL.createObjectURL(blob);
      this.isPdf = true;
      return url;
    }
  }

  public innerHtml(): SafeHtml {
    return "<object data='" + this.urlPath + "' type='" + this.mimeType + "' class='embed-responsive-item' width='100%' height='600px'>" +
      "<embed src='" + this.urlPath + "' type='" + this.mimeType + "' />" +
      "</object>";


  }

}
