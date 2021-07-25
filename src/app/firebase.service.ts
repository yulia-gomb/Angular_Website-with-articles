import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  items: Observable<any>;
  tags: Observable<any>;


  constructor(db: AngularFireDatabase) {
    this.items = db.list('articles').valueChanges();

    this.tags = db.list('tags').valueChanges();
  }

  getArticles() {
    return this.items
  }

  getTags() {
    return this.tags
  }

}
