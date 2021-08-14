import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageArticleComponent } from './page-article.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AppRoutingModule} from "../app-routing.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {EMPTY} from "rxjs";
import {FirebaseService} from "../Services/firebase.service";
import {MainPageComponent} from "../page-main/main-page.component";



describe('PageArticleComponent', () => {
  let component: PageArticleComponent;
  let fixture: ComponentFixture<PageArticleComponent>;
  let service: FirebaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AppRoutingModule
      ],
      declarations: [ PageArticleComponent ],
      providers: [ FirebaseService ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageArticleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FirebaseService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
