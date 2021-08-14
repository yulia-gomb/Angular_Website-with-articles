import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogInComponent } from './page-log-in.component';
import {AngularFireModule, FirebaseApp} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AppRoutingModule} from "../app-routing.module";
import {AngularFireAuth} from "@angular/fire/auth";

describe('PageLogInComponent', () => {
  let component: PageLogInComponent;
  let fixture: ComponentFixture<PageLogInComponent>;

  let app: FirebaseApp;
  let afAuth: AngularFireAuth;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        ],
      declarations: [ PageLogInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    app = TestBed.inject(FirebaseApp);
    afAuth = TestBed.inject(AngularFireAuth);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be an AngularFireAuth type', () => {
    expect(afAuth instanceof AngularFireAuth).toEqual(true);
  });

  it('should have an initialized Firebase app', () => {
    expect(afAuth.app).toBeDefined();
  });


});
