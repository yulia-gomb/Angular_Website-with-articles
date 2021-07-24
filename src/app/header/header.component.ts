import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showButtonCreateAPost!: boolean;
  showButtonSignIn!: boolean;
  showButtonLogOut!: boolean;
  showAvatar!: boolean;

  avatarImg: string | undefined;

  constructor(public auth: AngularFireAuth) { }

  logOut() {
    this.auth.signOut().then( () => {
      delete localStorage.authorized;
      delete localStorage.avatar;
      delete localStorage.author;
      this.showButtonCreateAPost = false;
      this.showButtonSignIn = true;
      this.showButtonLogOut = false;
      this.showAvatar = false;

    }).catch(function (err) {
      console.log("error")
      console.log(err)
    });
  }

  ngOnInit(): void {
    this.avatarImg = localStorage.avatar;
    if(localStorage.getItem('authorized')){
      this.showButtonSignIn = false;
      this.showButtonCreateAPost = true;
      this.showButtonLogOut = true;
      this.showAvatar = true;
    }
    else{
      this.showButtonCreateAPost = false;
      this.showButtonSignIn = true;
      this.showButtonLogOut = false;
      this.showAvatar = false;
    }

  }



}
