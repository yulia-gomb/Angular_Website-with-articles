import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {HeaderComponent} from './Common/header/header.component';
import {FooterComponent} from './Common/footer/footer.component';
import {MainPageComponent} from './page-main/main-page.component';
import {PageLogInComponent} from './page-log-in/page-log-in.component';
import {PageCreateAPostComponent} from './page-create-a-post/page-create-a-post.component';
import {PageArticleComponent} from './page-article/page-article.component';
import {PagePreviewAPostComponent} from './page-preview-a-post/page-preview-a-post.component';

import {ExitGuard} from './Guards/exit.guard';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {environment} from "../environments/environment";

import "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import firebase from "firebase";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";

import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';


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
  {
    path: 'create-a-post',
    component: PageCreateAPostComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
    canDeactivate: [ExitGuard]
  },
  {path: 'preview-a-post', component: PagePreviewAPostComponent},
  {path: '**', redirectTo: '/'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    PageLogInComponent,
    PageCreateAPostComponent,
    PageArticleComponent,
    PagePreviewAPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forRoot(reducers, {
      metaReducers
    })
  ],
  providers: [ExitGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
