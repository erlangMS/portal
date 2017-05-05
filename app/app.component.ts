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
    this.fileService.startRedirect()
        .subscribe(resultado => {
          console.log('Resultado Funcional !!');
    });
  }

}
