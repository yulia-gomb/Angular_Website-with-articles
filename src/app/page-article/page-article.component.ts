import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import firebase from "firebase";
import "firebase/database";

@Component({
  selector: 'app-page-article',
  templateUrl: './page-article.component.html',
  styleUrls: ['./page-article.component.css']
})
export class PageArticleComponent implements OnInit {

  id: number;
  data: any;
  textArray: string[] = [];


  constructor(private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {

    // getting data from Firebase

    firebase.database().ref().on('value', (snap) => {
      this.data = snap.val().articles[this.id];
      this.textArray = this.data.text;

    })

  }

}
