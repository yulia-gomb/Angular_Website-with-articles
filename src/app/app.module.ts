import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { HeaderComponent } from './Common/header/header.component';
import { FooterComponent } from './Common/footer/footer.component';
import { MainPageComponent } from './page-main/main-page.component';
import { PageLogInComponent } from './page-log-in/page-log-in.component';
import { PageCreateAPostComponent } from './page-create-a-post/page-create-a-post.component';
import { PageArticleComponent } from './page-article/page-article.component';


import { ExitGuard }   from './Guards/exit.guard';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import {environment} from "../environments/environment";

import "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import firebase from "firebase";
import { AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireModule} from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";



export const firebaseConfig = {
  apiKey: "AIzaSyATt36GJHPvqSKNaTIcdXpU47Xdv0_Ofmg",
  authDomain: "leverx-745ad.firebaseapp.com",
  projectId: "leverx-745ad",
  storageBucket: "leverx-745ad.appspot.com",
  messagingSenderId: "33580969644",
  appId: "1:33580969644:web:b12ab304545fb49a5ab909",
  databaseURL: "https://leverx-745ad-default-rtdb.europe-west1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['log-in']);

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'log-in', component: PageLogInComponent},
  {path: 'article/:id', component: PageArticleComponent},
  {path: 'create-a-post', component: PageCreateAPostComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, canDeactivate: [ExitGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    PageLogInComponent,
    PageCreateAPostComponent,
    PageArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [ExitGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
