import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  items: Observable<any>;
  tags: Observable<any>;
  filteredArticles: Observable<any> | undefined;


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

  getArticlesBySearch(res: any) {
    this.filteredArticles = this.db.list('articles', ref =>
      ref.orderByChild('title').startAt(res).endAt(res+ "\uf8ff")).valueChanges()
      return this.filteredArticles;
  }

  /*getArticlesByTags(tags: any) {
    this.filteredArticles = this.db.list('articles', ref =>
      ref.where('tags','array-contains-any', tags))
      .valueChanges();
    return this.filteredArticles;
  }*/


}
