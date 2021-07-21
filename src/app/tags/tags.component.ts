import { Component, OnInit } from '@angular/core';
import firebase from "firebase";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  data!: string[];

  constructor() { }

  ngOnInit(): void {

    // getting data from Firebase

      firebase.database().ref().on('value', (snap) => {
        this.data = snap.val().tags;

      })

  }

}
