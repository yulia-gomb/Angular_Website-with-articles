import {CanDeactivate} from "@angular/router";
import {Observable} from "rxjs";

export interface ComponentCanDeactivate{
  canDeactivate: () => boolean | Observable<boolean>;
}

export class ExitGuard implements CanDeactivate<ComponentCanDeactivate>{

  canDeactivate(component: ComponentCanDeactivate) : Observable<boolean> | boolean{

    return confirm("Вы уверены, хотите покинуть страницу?");
  }
}
