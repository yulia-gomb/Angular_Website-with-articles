import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";

@Component({
  selector: 'app-page-log-in',
  templateUrl: './page-log-in.component.html',
  styleUrls: ['./page-log-in.component.css']
})
export class PageLogInComponent implements OnInit {

  buttonAble: boolean = true;

  constructor(public auth: AngularFireAuth) {
      }
      //authentication of user
        logIn(){
            this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result : any) {
            localStorage.setItem('authorized', 'true');
            localStorage.setItem('avatar', result.additionalUserInfo.profile.picture);
            localStorage.setItem('author', result.additionalUserInfo.profile.name);
            window.location.href="../../index.html";

          }).catch(function (err) {
            console.log("error")
            console.log(err)
          });
        }

      //checking of "google terms" to activate button "sign In"

      checkStatus() {
          this.buttonAble = !this.buttonAble;
      }


  ngOnInit(): void {
  }

}
