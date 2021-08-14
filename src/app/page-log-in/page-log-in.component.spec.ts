import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogInComponent } from './page-log-in.component';
import {AngularFireModule, FirebaseApp} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AppRoutingModule} from "../app-routing.module";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import {Observable, Subject} from "rxjs";

const firebaseUser = {
  uid: '12345',
  providerData: [{ displayName: 'jeffbcrossyface' }]
} as firebase.User;


describe('PageLogInComponent', () => {
  let component: PageLogInComponent;
  let fixture: ComponentFixture<PageLogInComponent>;

  let app: FirebaseApp;
  let afAuth: AngularFireAuth;
  let mockAuthState: Subject<firebase.User>;



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

    mockAuthState = new Subject<firebase.User>();
    // @ts-ignore
    spyOn(afAuth, 'authState').and.returnValue(mockAuthState);
    // @ts-ignore
    spyOn(afAuth, 'idToken').and.returnValue(mockAuthState);
    (afAuth as any).authState = mockAuthState as Observable<firebase.User>;
    (afAuth as any).idToken = mockAuthState as Observable<firebase.User>;

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

  it('should emit auth updates through authState', (done: any) => {
    let count = 0;

    // Check that the first value is null and second is the auth user
    const subs = afAuth.authState.subscribe({
      next: (user => {
        if (count === 0) {
          expect(user).toBe(null);
          count = count + 1;
          mockAuthState.next(firebaseUser);
        } else {
          expect(user).toEqual(firebaseUser);
          subs.unsubscribe();
          done();
        }
      }),
      error: done,
      complete: done.fail
    });
    // @ts-ignore
    mockAuthState.next(null);
  });

  it('should emit auth updates through idToken', (done: any) => {
    let count = 0;

    // Check that the first value is null and second is the auth user
    const subs = afAuth.idToken.subscribe({
      next: user => {
        if (count === 0) {
          expect(user).toBe(null);
          count = count + 1;
          mockAuthState.next(firebaseUser);
        } else {
          expect(user as any).toEqual(firebaseUser);
          subs.unsubscribe();
          done();
        }
      },
      error: done,
      complete: done.fail
    });
    // @ts-ignore
    mockAuthState.next(null);
  });




});
