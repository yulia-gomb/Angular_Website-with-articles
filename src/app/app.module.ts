import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TagsComponent } from './tags/tags.component';

import "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import firebase from "firebase";

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
