import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { SistemasService } from '../sistemas.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desenvolvimento',
  templateUrl: './desenvolvimento.component.html',
  styleUrls: ['./desenvolvimento.component.css']
})
export class DesenvolvimentoComponent implements OnInit {

  public clients = <any>{};
    public sistemas = <any>{};

    // construtor
    constructor(private router: Router, private clientService: ClientsService, private sistemasService: SistemasService) {
      this.loadClients()

    }

    ngOnInit() {
    
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
                            console.log(this.sistemas);
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
