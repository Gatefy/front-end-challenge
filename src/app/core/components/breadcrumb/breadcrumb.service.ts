import { Injectable } from '@angular/core';
import { Subject  } from 'rxjs';
import { MenuItem } from 'primeng/primeng';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private itemsSource = new Subject<MenuItem[]>();

  itemsHandler = this.itemsSource.asObservable();

  setItems(items: MenuItem[]) {
      this.itemsSource.next(items);
  }
}
