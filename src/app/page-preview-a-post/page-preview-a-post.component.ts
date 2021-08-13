import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {SendingSelectors} from "../Store/sending.selectors";
import {SendingActions} from "../Store/sending.actions";
import {Router} from '@angular/router';
import {FirebaseService} from "../Services/firebase.service";


@Component({
  selector: 'app-page-preview-a-post',
  templateUrl: './page-preview-a-post.component.html',
  styleUrls: ['./page-preview-a-post.component.css'],
  providers: [FirebaseService]
})
export class PagePreviewAPostComponent implements OnInit {

  title?: string;
  img?: string;
  author?: string | null;
  date?: string;
  tags?: string[] = [];
  subtitlesArray: string[] = [];
  textArray: string[] = [];

  article: any;


  constructor(private router: Router,
              private store$: Store,
              private firebaseService: FirebaseService) {
    this.store$.select(SendingSelectors.title).subscribe(title =>
      this.title = title);
    this.store$.select(SendingSelectors.img).subscribe(img =>
      this.img = img);
    this.store$.select(SendingSelectors.subtitles).subscribe(sub =>{
      if(sub!==undefined) {this.subtitlesArray = sub}} );
    this.store$.select(SendingSelectors.text).subscribe(text =>{
      if(text!==undefined) {this.textArray = text}} );
    this.store$.select(SendingSelectors.author).subscribe(author =>
      this.author = author);
    this.store$.select(SendingSelectors.date).subscribe(date =>
      this.date = date);
    this.store$.select(SendingSelectors.tags).subscribe(tags=>
      this.tags = tags);

  }

  ngOnInit(): void {

  }

  //------------button "Publish" (sending form`s data on server)-----------

  sendArticle(){

    //data from Form
    this.article = {
      img: this.img,
      title: this.title,
      description: this.subtitlesArray,
      subtitles: this.subtitlesArray,
      text: this.textArray,
      author: this.author,
      date: this.date,
      tags: this.tags
    }
    //save (send) article on server
    this.firebaseService.sendArticle(this.article)
  }

  returnToCreateAPost(){
    this.store$.dispatch(SendingActions.returningToCreateAPost());
    this.router.navigate(['create-a-post']).then();
  }


}
