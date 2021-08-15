import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  tags: Observable<any>;
  filteredArticles!: Observable<any>;


  constructor(private db: AngularFireDatabase) {
    this.tags = db.list('tags').valueChanges();
  }

  getArticles() {
    return this.db.object('articles').valueChanges();
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

  getArticlesByTags(tagsForFilter: string[]) {
    return this.db.list('articles').valueChanges().pipe(
      map((articles: any) => articles
        .filter((article: any) => article.tags
            .filter((tag: string) => tagsForFilter.includes(tag)).length > 0 ))
    )
  }

}
