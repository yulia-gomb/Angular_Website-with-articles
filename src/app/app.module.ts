import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './page-main/main-page.component';
import { TagsComponent } from './tags/tags.component';
import { RouterModule, Routes } from "@angular/router";

import "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import firebase from "firebase";
import { PageLogInComponent } from './page-log-in/page-log-in.component';
import { PageCreateAPostComponent } from './page-create-a-post/page-create-a-post.component';
import { PageArticleComponent } from './page-article/page-article.component';
import { ItemComponent } from "./item.component";

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

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'log-in', component: PageLogInComponent},
  {path: 'article/:id', component: PageArticleComponent},
  {path: 'create-a-post', component: PageCreateAPostComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    TagsComponent,
    PageLogInComponent,
    PageCreateAPostComponent,
    PageArticleComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
