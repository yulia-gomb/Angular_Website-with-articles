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
  urlImage: any;

  constructor(private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
    console.log(this.id);
  }

  ngOnInit(): void {

    // getting data from Firebase

    firebase.database().ref().on('value', (snap) => {
      this.data = snap.val().articles[this.id];
      console.log(this.data);
    })

    //getting url images from firebase
    var storageRef = firebase.storage().ref();

    storageRef.child(`${this.data.img}`).getDownloadURL().then(url => {
      this.urlImage = url
      console.log(url)
    }).catch(e =>
      console.log(e)
    )

  }

}
