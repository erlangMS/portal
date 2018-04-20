import { Component } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material';

@Component({
    selector: 'snackbar',
    templateUrl: './snackbar.component.html',
})
export class SnackbarComponent  {
    constructor(public snackBar: MatSnackBar) { }

    addMessage(message: string, action: string){
        let config = new MatSnackBarConfig();
        config.data = {message, action};
        this.snackBar.openFromComponent(SnackbarComponent,config);
    }
}