import { Component } from '@angular/core';
import {NgFor, NgSwitch, NgSwitchDefault} from '@angular/common';
import { FileService } from './_file/file.service';

@Component({
    selector: 'my-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css']
})
export class AppComponent {
	title = 'Erlangms Portal API Management';

  constructor( private fileService: FileService) {
  }

  ngOnInit() {
    var client_id = location.search.split('code=')[1];
    if(client_id == undefined){
        this.fileService.startRedirect()
          .subscribe(resultado => {
            console.log('Resultado');
        });
    } else {
      this.fileService.findTokenUser(client_id);
    }
  }

}
