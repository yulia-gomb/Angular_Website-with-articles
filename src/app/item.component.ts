import { Component} from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'item-info',
  template: `<h3>Модель {{id}}</h3>`
})
export class ItemComponent {

  id: number;
  constructor(private activateRoute: ActivatedRoute){

    this.id = activateRoute.snapshot.params['id'];
  }
}
