import { Pipe, PipeTransform } from '@angular/core';
/*
 * transforma true e false em sim ou não
*/
@Pipe({name: 'simNaoPipe'})
export class SimNaoPipe implements PipeTransform {
  transform(value: boolean): string {
    if(value){
        return "Sim";
    }else{
        return "Não";
    }

  }
}
