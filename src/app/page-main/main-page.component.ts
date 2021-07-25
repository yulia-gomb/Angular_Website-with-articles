import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import { FirebaseService} from "../firebase.service";
import {AngularFireDatabase} from "@angular/fire/database";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [FirebaseService]
})
export class MainPageComponent implements OnInit {

  data: any;
  tags: any;

  constructor() {

  }

  ngOnInit(): void {

    // getting data from Firebase

    firebase.database().ref().on('value', (snap) => {
      this.data = Object.entries(snap.val().articles);
      console.log(this.data);
       })

    /*/!*this.data = this.firebaseService.getArticles()*!/
    console.log(this.data)

    this.tags = this.firebaseService.getTags()
    console.log(this.tags)
*/

  }

}
