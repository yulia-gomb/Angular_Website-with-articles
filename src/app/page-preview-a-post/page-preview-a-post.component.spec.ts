import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePreviewAPostComponent } from './page-preview-a-post.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {StoreModule} from "@ngrx/store";
import * as fromReducer from "../Store/sending.reducer";
import {AppRoutingModule} from "../app-routing.module";
import {FirebaseService} from "../Services/firebase.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";



describe('PagePreviewAPostComponent', () => {
  let component: PagePreviewAPostComponent;
  let fixture: ComponentFixture<PagePreviewAPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        StoreModule.forRoot( {sending: fromReducer.reducer}),
        AppRoutingModule
      ],
      declarations: [ PagePreviewAPostComponent ],
      providers: [
        FirebaseService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePreviewAPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
