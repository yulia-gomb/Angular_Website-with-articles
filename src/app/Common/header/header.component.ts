import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationEnd, Router} from "@angular/router";


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
  avatarImg?: string;
  currentURL?: string;

  constructor(public auth: AngularFireAuth,
              private router: Router) {}


  //logOut function
  logOut(): void {
    this.auth.signOut().then( () => {
      delete localStorage.authorized;
      delete localStorage.avatar;
      delete localStorage.author;
      this.showButtonCreateAPost = false;
      this.showButtonSignIn = true;
      this.showButtonLogOut = false;
      this.showAvatar = false;
      this.router.navigate(['/']).then();

    }).catch(function (err) {
       console.log(err)
    });
  }

  ngOnInit(): void {

    //checking status of authorizing to set buttons of header

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.currentURL = ev.url;

        if(localStorage.getItem('authorized')){
          if(this.currentURL==="/create-a-post" || this.currentURL==="/preview-a-post"){
            this.showButtonCreateAPost = false;
          } else {
            this.showButtonCreateAPost = true;
          }
          this.showButtonSignIn = false;
          this.showButtonLogOut = true;
          this.showAvatar = true;
          this.avatarImg = localStorage.avatar;
        }
        else{
          this.showButtonCreateAPost = false;
          this.showButtonSignIn = true;
          this.showButtonLogOut = false;
          this.showAvatar = false;
        }

      }
    });
  }
}
