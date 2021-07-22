import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import firebase from "firebase";

@Component({
  selector: 'app-page-article',
  templateUrl: './page-article.component.html',
  styleUrls: ['./page-article.component.css']
})
export class PageArticleComponent implements OnInit {

  public href: any;
  data: any;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.href = this.router.url.split('/')[2];
    console.log(this.href);

    // getting data from Firebase

    firebase.database().ref().on('value', (snap) => {
      this.data = snap.val().articles[this.href];
      console.log(this.data);


    })



  }

}
