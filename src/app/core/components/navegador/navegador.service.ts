import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { MenuItem } from 'primeng/primeng';

@Injectable({
  providedIn: 'root'
})
export class NavegadorService {

  private itemsSource = new ReplaySubject<MenuItem>(1);

  itemsHandler = this.itemsSource.asObservable();

  setItems(items: MenuItem) {
    this.itemsSource.next(items);
  }

  cleanItem() {
    this.itemsSource = new ReplaySubject<MenuItem>(1);
  }
}
