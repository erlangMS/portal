import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  
}

@Component({
  selector: 'modal-content',
  templateUrl: 'app/catalogo/exemplos_url.html',
})
export class CustomModal implements CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;

  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return false;
  }
  
  close(){
	this.dialog.close();
  }
}
