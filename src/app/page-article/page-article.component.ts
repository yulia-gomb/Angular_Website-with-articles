import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import firebase from "firebase";
import "firebase/database";
import { FirebaseService} from "../Services/firebase.service";

@Component({
  selector: 'app-page-article',
  templateUrl: './page-article.component.html',
  styleUrls: ['./page-article.component.css'],
  providers: [FirebaseService]
})
export class PageArticleComponent implements OnInit {

  id: number;
  data: any;
  textArray: string[] = [];


  constructor(private activateRoute: ActivatedRoute,
              private firebaseService: FirebaseService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {

    // getting data from Firebase

    /*firebase.database().ref().on('value', (snap) => {
      this.data = snap.val().articles[this.id];
      console.log(this.data)
      this.textArray = this.data.text;

    })*/

    this.firebaseService.getArticles().subscribe( data =>
      this.data = data[0],
      /*this.textArray = this.data[0].text*/
    )


  }

}
