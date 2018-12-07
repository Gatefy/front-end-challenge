import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavegadorService } from './navegador.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styles: []
})
export class NavegadorComponent implements OnDestroy {

  subscription: Subscription;

  item: MenuItem;
  label = 'Voltar';
  constructor(private navegadorService: NavegadorService) {
    this.subscription = navegadorService.itemsHandler.subscribe(response => {
      this.item = response;
      const substring = this.item.routerLink ? this.item.routerLink[0].toString() : '';
      this.label = substring.indexOf('new') !== -1 ? 'Novo' : 'Voltar';
      console.log(this.item.routerLink[0].toString().indexOf('new'));
      console.log(substring);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
