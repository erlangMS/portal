import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Client } from './client';
import { Sistema } from '../sistemas/sistema';
import { ClientsService } from './clients.service';
import { SistemasService } from '../sistemas/sistemas.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

    public clients: Array<Client>;
    public sistemas: Array<Sistema>;
    public sistemasFiltrados: Array<Sistema>;

    private buscaCtrl: FormControl;

    // construtor
    constructor(private router: Router, private clientService: ClientsService, private sistemasService: SistemasService) {
        this.buscaCtrl = new FormControl()
        this.buscaCtrl.setValue('')
    }

    ngOnInit() {
        this.loadClients()
        this.filtrarListaSistemas()
    }

    filtrarListaSistemas(){
        this.buscaCtrl.valueChanges.subscribe(
            value =>{
                if(value && !value.Empty){
                    this.sistemasFiltrados = this.sistemas.filter(entry => {
                        return entry.sigla.startsWith(value)
                    })
                }else{
                    this.sistemasFiltrados = this.sistemas
                }
            }
        )
    }

    loadClients() {
        this.clientService.findAllActive().subscribe(
            res => {
                this.clients = res.filter(entry => {
                    return (entry.active == true)
                })
            },
            err => { },
            () => {
                let idClients = this.clients.map(res => res.id);
                if (idClients) {
                    this.sistemasService.findByIdList(idClients).subscribe(
                        res => {
                            this.sistemas = res.filter(
                                sistema => {
                                    return (sistema.url && sistema.url.indexOf("index.html") > -1)
                                }
                            )
                            this.sistemasFiltrados = this.sistemas
                        }
                    )
                }
            }
        )
    }

    redirecionar(sistema: any) {
        console.log(sistema);
        if (sistema.url) {
            window.open(sistema.url)
        }
    }

}
