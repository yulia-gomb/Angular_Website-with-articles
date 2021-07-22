import { Component, OnInit } from '@angular/core';
import firebase from "firebase";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  data: any;
  urlImage: any;


  constructor() { }

  ngOnInit(): void {

    // getting data from Firebase

    firebase.database().ref().on('value', (snap) => {
      this.data = Object.entries(snap.val().articles);
      console.log(this.data);
    })

    //getting url images from firebase
    var storageRef = firebase.storage().ref();

    storageRef.child(`${this.data.img}`).getDownloadURL().then(url => {
       this.urlImage = url

    }).catch(e =>
      console.log(e)
    )



  }

}
