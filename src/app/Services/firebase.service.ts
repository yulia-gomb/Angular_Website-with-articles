import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  items: Observable<any>;
  tags: Observable<any>;



  constructor(private db: AngularFireDatabase) {
    this.items = db.object('articles').valueChanges();
    this.tags = db.list('tags').valueChanges();
  }

  getArticles() {
    return this.items
  }

  getTags() {
    return this.tags
  }

  sendArticle(article: any) {
    this.db.list('articles').push(article);
  }

}
