import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, ativo: boolean): any {
    if (ativo === null) {
      return value;
    }
    const resultado = [];
    for(let item of value){
      if (item.ativa === ativo) {
        resultado.push(item);
      }
    }
    return resultado;
  }

}
