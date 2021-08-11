import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {SendingSelectors} from "../Store/sending.selectors";
import {SendingActions} from "../Store/sending.actions";
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-preview-a-post',
  templateUrl: './page-preview-a-post.component.html',
  styleUrls: ['./page-preview-a-post.component.css']
})
export class PagePreviewAPostComponent implements OnInit {

  title$: Observable<string | undefined>;
  img$: Observable<any>;
  author$: Observable<string | undefined | null>;
  date$: Observable<string | undefined>;
  tags$: Observable<string[] | undefined>;
  subtitlesArray: string[] = [];
  textArray: string[] = [];


  constructor(private router: Router,
              private store$: Store) {
    this.title$ = this.store$.select(SendingSelectors.title);
    this.img$ = this.store$.select(SendingSelectors.img);
    this.store$.select(SendingSelectors.subtitles).subscribe(sub =>{
      if(sub!==undefined) {this.subtitlesArray = sub}} );
    this.store$.select(SendingSelectors.text).subscribe(text =>{
      if(text!==undefined) {this.textArray = text}} );
    this.author$ = this.store$.select(SendingSelectors.author);
    this.date$ = this.store$.select(SendingSelectors.date);
    this.tags$ = this.store$.select(SendingSelectors.tags);

  }

  ngOnInit(): void {

  }

  //------------button "Publish" (sending form`s data on server)-----------

  sendArticle(){

    console.log("Publish")


  }

  returnToCreateAPost(){
    this.store$.dispatch(SendingActions.returningToCreateAPost());
    this.router.navigate(['create-a-post']).then();
  }


}
